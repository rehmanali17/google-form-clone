import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import * as FormActions from '@store/form/form.actions';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';
import { FormService } from '@services/form.service';
import { NgxCaptureService } from 'ngx-capture';
import { MatDialog } from '@angular/material/dialog';
import { first, Subscription } from 'rxjs';
import { SavedFormDialogComponent } from '@components/create-form/saved-form-dialog/saved-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from '@models/form.model';

@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit, OnDestroy {
    @ViewChild('capture_screen', { static: true }) captureScreen: any;
    formStatus = '';
    editFormStatus = '';
    imageString = '';
    userForm!: Form;

    formOverview = this.formBuilder.group({
        title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z _-]+$/)]],
        description: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ._-]+$/)]],
    });

    dialogBoxSubscription!: Subscription;
    formsSubscription!: Subscription;

    form = this.formBuilder.group({
        'form-overview': this.formOverview,
        questions: new FormArray([]),
    });

    constructor(
        private formBuilder: FormBuilder,
        private formService: FormService,
        private captureService: NgxCaptureService,
        private store: Store<AppState>,
        private dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.dialogBoxHandler();
        const formId = this.route.snapshot.params['id'];
        this.loadForm(formId);
    }

    dialogBoxHandler() {
        this.dialogBoxSubscription = this.store.select('dialogBox').subscribe((dialogBoxState) => {
            if (dialogBoxState.formDialogBox.status === true) {
                this.dialog.open(SavedFormDialogComponent);
            } else {
                this.dialog.closeAll();
            }
        });
    }

    loadForm(formId: string) {
        this.formsSubscription = this.store
            .select('form')
            .pipe(first())
            .subscribe((formState) => {
                const formIndex = formState.forms.findIndex((form) => form._id === formId);

                this.userForm = formState.forms[formIndex];
                if (formId === undefined || this.userForm === undefined) {
                    this.router.navigateByUrl('/user');
                } else {
                    this.formStatus = this.userForm.status;
                    (<FormGroup>this.form.get('form-overview')).controls['title'].setValue(
                        this.userForm.title
                    );
                    (<FormGroup>this.form.get('form-overview')).controls['description'].setValue(
                        this.userForm.description
                    );
                    this.userForm.questions.forEach((formQuestion) => {
                        const question = this.formBuilder.group({
                            'question-overview': this.formBuilder.group({
                                question: [formQuestion.question, [Validators.required]],
                                type: formQuestion.type,
                            }),
                            options: this.formBuilder.group({
                                options: this.formBuilder.array(
                                    formQuestion.options.map(
                                        (option: string) =>
                                            new FormControl(option, Validators.required)
                                    )
                                ),
                            }),
                            validations: this.formBuilder.group({
                                isRequired: formQuestion.isRequired,
                            }),
                        });
                        (<FormArray>this.form.get('questions')).push(question);
                    });
                }
            });
    }

    saveForm(status: string) {
        this.editFormStatus = status;
    }

    handleAddQuestion(index: number) {
        const question = this.formBuilder.group({
            'question-overview': this.formBuilder.group({
                question: ['Untitled Question', [Validators.required]],
                type: 'short',
            }),
            options: this.formBuilder.group({
                options: this.formBuilder.array([]),
            }),
            validations: this.formBuilder.group({
                isRequired: false,
            }),
        });
        (<FormArray>this.form.get('questions')).insert(index + 1, question);
    }

    handleDeleteQuestion(index: number) {
        if ((<FormArray>this.form.get('questions')).controls.length === 1) {
            return;
        }
        (<FormArray>this.form.get('questions')).removeAt(index);
    }

    handleDuplicateQuestion(index: number) {
        const control = (<FormArray>this.form.get('questions')).controls[index];
        const { question, type } = control.value['question-overview'];
        const options = (<FormArray>(
            (<FormGroup>(<FormGroup>control).controls['options']).controls['options']
        )).value;
        const isRequired = <FormGroup>(
            (<FormGroup>control).controls['validations'].value['isRequired']
        );
        const duplicatedQuestion = this.formBuilder.group({
            'question-overview': this.formBuilder.group({
                question: [question, [Validators.required]],
                type,
            }),
            options: this.formBuilder.group({
                options: this.formBuilder.array(
                    options.map((option: string) => new FormControl(option, Validators.required))
                ),
            }),
            validations: this.formBuilder.group({
                isRequired,
            }),
        });
        (<FormArray>this.form.get('questions')).insert(index + 1, duplicatedQuestion);
    }

    getFormArray(): FormArray {
        return <FormArray>this.form.get('questions');
    }

    getQuestionOverview(index: number): FormGroup {
        return <FormGroup>(
            (<FormGroup>(<FormArray>this.form.get('questions')).controls[index]).controls[
                'question-overview'
            ]
        );
    }

    getOptions(index: number): FormGroup {
        return <FormGroup>(
            (<FormGroup>(<FormArray>this.form.get('questions')).controls[index]).controls['options']
        );
    }

    getValidations(index: number): FormGroup {
        return <FormGroup>(
            (<FormGroup>(<FormArray>this.form.get('questions')).controls[index]).controls[
                'validations'
            ]
        );
    }

    handleSubmit() {
        if (this.form.valid) {
            this.store.dispatch(new FormActions.ToggleFormSavingStatus({ status: true }));
            const { title, description } = this.form.value['form-overview'];
            const formQuestions = this.form.value['questions'];
            const questions = formQuestions.map((formQuestion: any) => {
                return {
                    question: formQuestion['question-overview']['question'],
                    type: formQuestion['question-overview']['type'],
                    options: formQuestion['options']['options'],
                    isRequired: formQuestion['validations']['isRequired'],
                };
            });

            this.captureService
                .getImage(this.captureScreen.nativeElement, true)
                .subscribe((imageString) => {
                    this.imageString = imageString;
                    const form = {
                        title,
                        description,
                        status: this.editFormStatus,
                        imageString: this.imageString,
                        questions,
                    };
                    this.formService.editForm(form, this.userForm._id!).subscribe(
                        (res) => {
                            this.store.dispatch(
                                new FormActions.ToggleFormSavingStatus({ status: false })
                            );
                            this.store.dispatch(
                                new DialogBoxActions.OpenFormDialogBox({
                                    isError: false,
                                    title: title,
                                    message: res.message,
                                })
                            );
                        },
                        (err) => {
                            this.store.dispatch(
                                new FormActions.ToggleFormSavingStatus({ status: false })
                            );
                            if (err.status === 401) {
                                this.snackBar.open(err.error.message, 'Close');
                                this.store.dispatch(new AuthActions.Logout());
                            } else {
                                this.store.dispatch(
                                    new DialogBoxActions.OpenFormDialogBox({
                                        isError: true,
                                        title,
                                        message: err.error.message,
                                    })
                                );
                            }
                        }
                    );
                });
        } else {
            this.snackBar.open('Please fill all the fields correctly', 'Close');
        }
    }

    ngOnDestroy() {
        this.dialogBoxSubscription.unsubscribe();
        this.formsSubscription.unsubscribe();
    }
}
