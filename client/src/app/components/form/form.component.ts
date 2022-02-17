import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ALERTS, LABELS, ROUTES } from '@app/constants';
import { Form } from '@models/form.model';
import { FormService } from '@services/form.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
    id = '';
    userForm!: Form;
    isLoading = true;
    formsSubcription!: Subscription;

    form = this.formBuilder.group({
        answers: new FormArray([]),
    });

    constructor(
        private formService: FormService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.formsSubcription = this.formService.getForm(this.id).subscribe(
            (res) => {
                this.isLoading = false;
                this.userForm = res.form;
                if (this.userForm.status === 'draft') {
                    this.snackBar.open(ALERTS.UNPUBLISHED_FORM, LABELS.DISMISS_SNACKBAR_TEXT);
                    this.router.navigateByUrl(ROUTES.LANDING_PAGE);
                }
                this.userForm.questions.forEach((formQuestion) => {
                    const validations =
                        formQuestion.isRequired === true ? [Validators.required] : [];
                    const answer = this.formBuilder.group({
                        answer: new FormControl(null, validations),
                    });
                    (<FormArray>this.form.get('answers')).push(answer);
                });
            },
            (err) => {
                this.isLoading = false;
                this.snackBar.open(err.error.message, LABELS.DISMISS_SNACKBAR_TEXT);
                this.router.navigateByUrl(ROUTES.LANDING_PAGE);
            }
        );
    }

    ngOnDestroy() {
        this.formsSubcription.unsubscribe();
    }
}
