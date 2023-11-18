import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AppState } from '@models/app-state.model';
import { Store } from '@ngrx/store';
import * as AuthActions from '@store/auth/auth.actions';
import * as FormActions from '@store/form/form.actions';
import * as DialogBoxActions from '@store/dialog-box/dialog-box.actions';
import { FormService } from '@services/form.service';
import { NgxCaptureService } from 'ngx-capture';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SavedFormDialogComponent } from '@components/create-form/saved-form-dialog/saved-form-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DarkModeService } from '@services/dark-mode.service';
import { ALERTS, LABELS } from '@app/constants';

@Component({
    selector: 'app-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit, OnDestroy {
    @ViewChild('capture_screen', { static: true }) captureScreen: any;
    formStatus = '';
    imageString = '';
    darkModeEnabled = false;

    formOverview = this.formBuilder.group({
        title: ['Form Title', [Validators.required, Validators.pattern(/^[a-zA-Z _-]+$/)]],
        description: [
            'Form Description',
            [Validators.required, Validators.pattern(/^[a-zA-Z ._-]+$/)],
        ],
    });

    dialogBoxSubscription!: Subscription;
    darkModeSubscription!: Subscription;

    form = this.formBuilder.group({
        'form-overview': this.formOverview,
        questions: new FormArray([
            this.formBuilder.group({
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
            }),
        ]),
    });

    constructor(
        private formBuilder: FormBuilder,
        private formService: FormService,
        private captureService: NgxCaptureService,
        private store: Store<AppState>,
        private dialog: MatDialog,
        private darkModeService: DarkModeService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.dialogBoxHandler();
        this.toggleDarkMode();
    }

    toggleDarkMode() {
        this.darkModeSubscription = this.darkModeService.darkMode.subscribe((mode) => {
            if (mode) {
                this.darkModeEnabled = true;
            } else {
                this.darkModeEnabled = false;
            }
        });
    }

    dialogBoxHandler() {
        this.dialogBoxSubscription = this.store.select('dialogBox').subscribe((dialogBoxState) => {
            if (dialogBoxState.formDialogBox.status) {
                this.dialog.open(SavedFormDialogComponent, {
                    autoFocus: true,
                    data: this.darkModeEnabled,
                });
            } else {
                this.dialog.closeAll();
            }
        });
    }

    saveForm(status: string) {
        this.formStatus = status;
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

    sortQuestions(event: any) {
        const currentIndex = event.currentIndex;
        const previousIndex = event.previousIndex;
        const formArray = this.getFormArray();
        const direction = currentIndex > previousIndex ? 1 : -1;

        const control = formArray.at(previousIndex);
        for (let i = previousIndex; i * direction < currentIndex * direction; i = i + direction) {
            const currentControl = formArray.at(i + direction);
            formArray.setControl(i, currentControl);
        }
        formArray.setControl(currentIndex, control);
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
                        status: this.formStatus,
                        imageString: this.imageString,
                        questions,
                    };
                    this.formService.createForm(form).subscribe(
                        (res) => {
                            this.store.dispatch(
                                new FormActions.ToggleFormSavingStatus({ status: false })
                            );
                            this.store.dispatch(
                                new DialogBoxActions.OpenFormDialogBox({
                                    isError: false,
                                    title: res.form.title,
                                    message: res.message,
                                })
                            );
                        },
                        (err) => {
                            this.store.dispatch(
                                new FormActions.ToggleFormSavingStatus({ status: false })
                            );
                            if (err.status === 401) {
                                this.snackBar.open(err.error.message, LABELS.DISMISS_SNACKBAR_TEXT);
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
            this.snackBar.open(ALERTS.INVALID_FORM, LABELS.DISMISS_SNACKBAR_TEXT);
        }
    }

    ngOnDestroy() {
        this.dialogBoxSubscription.unsubscribe();
        this.darkModeSubscription.unsubscribe();
    }
}
