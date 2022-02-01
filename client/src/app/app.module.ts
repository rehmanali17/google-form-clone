// Importing Environment
import { environment } from '@environments/environment.prod';

// Importing Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from '@modules/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgxCaptureModule } from 'ngx-capture';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

// Importing Services
import { HttpInterceptorService } from '@services/http-interceptor.service';

// Importing Components
import { AppComponent } from '@app/app.component';

// Landing Page Component
import { LandingPageComponent } from '@components/landing-page/landing-page.component';
import { LandingPageNavbarComponent } from '@components/landing-page/landing-page-navbar/landing-page-navbar.component';
import { LandingPageHeroComponent } from '@components/landing-page/landing-page-hero/landing-page-hero.component';

// Dashboard Component
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { DashboardNavbarComponent } from '@components/dashboard/dashboard-navbar/dashboard-navbar.component';
import { RecentFormsComponent } from '@components/dashboard/recent-forms/recent-forms.component';
import { RecentFormsCardComponent } from '@components/dashboard/recent-forms/recent-forms-card/recent-forms-card.component';
import { FormsListComponent } from '@components/dashboard/forms-list/forms-list.component';
import { FormHeaderComponent } from '@components/dashboard/forms-list/form-header/form-header.component';
import { FormItemComponent } from '@components/dashboard/forms-list/form-item/form-item.component';
import { FormDialogComponent } from '@components/dashboard/form-dialog/form-dialog.component';
import { RenameFormDialogComponent } from './components/dashboard/rename-form-dialog/rename-form-dialog.component';

// Create Form Component
import { CreateFormComponent } from '@components/create-form/create-form.component';
import { CreateFormNavbarComponent } from '@components/create-form/create-form-navbar/create-form-navbar.component';
import { CreateFormTitleComponent } from '@components/create-form/create-form-title/create-form-title.component';
import { CreateFormQuestionsComponent } from '@components/create-form/create-form-questions/create-form-questions.component';
import { QuestionContainerComponent } from '@components/create-form/create-form-questions/question-container/question-container.component';
import { AnswerContainerComponent } from '@components/create-form/create-form-questions/answer-container/answer-container.component';
import { ActionsContainerComponent } from '@components/create-form/create-form-questions/actions-container/actions-container.component';
import { SavedFormDialogComponent } from './components/create-form/saved-form-dialog/saved-form-dialog.component';

// Edit Form Component
import { EditFormComponent } from '@components/edit-form/edit-form.component';
// import { EditFormNavbarComponent } from '@components/edit-form/edit-form-navbar/edit-form-navbar.component';
// import { EditFormTitleComponent } from '@components/edit-form/edit-form-title/edit-form-title.component';
// import { EditFormQuestionsComponent } from '@components/edit-form/edit-form-questions/edit-form-questions.component';
// import { EditQuestionContainerComponent } from '@components/edit-form/edit-form-questions/edit-question-container/edit-question-container.component';
// import { EditFormAnswerContainerComponent } from '@components/edit-form/edit-form-questions/edit-form-answer-container/edit-form-answer-container.component';
// import { EditFormActionsContainerComponent } from '@components/edit-form/edit-form-questions/edit-form-actions-container/edit-form-actions-container.component';
// import { SavedFormDialogComponent } from './components/create-form/saved-form-dialog/saved-form-dialog.component';

// Importing Root Reducer
import { appReducer } from '@store/app.reducer';
import { AuthEffects } from '@store/auth/auth.effects';

// Importing Pipes
import { FilterPipe } from './pipes/filter.pipe';
@NgModule({
    declarations: [
        AppComponent,

        LandingPageComponent,
        LandingPageNavbarComponent,
        LandingPageHeroComponent,

        DashboardComponent,
        DashboardNavbarComponent,
        RecentFormsCardComponent,
        RecentFormsComponent,
        FormsListComponent,
        FormHeaderComponent,
        FormItemComponent,
        FormDialogComponent,
        RenameFormDialogComponent,

        CreateFormComponent,
        CreateFormNavbarComponent,
        CreateFormTitleComponent,
        CreateFormQuestionsComponent,
        QuestionContainerComponent,
        AnswerContainerComponent,
        ActionsContainerComponent,
        SavedFormDialogComponent,

        EditFormComponent,
        // EditFormNavbarComponent,
        // EditFormTitleComponent,
        // EditFormQuestionsComponent,
        // EditQuestionContainerComponent,
        // EditFormAnswerContainerComponent,
        // EditFormActionsContainerComponent,
        // SavedFormDialogComponent,

        FilterPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        CookieModule.forRoot(),
        AppRoutingModule,
        StoreModule.forRoot(appReducer),
        EffectsModule.forRoot([AuthEffects]),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
        StoreRouterConnectingModule.forRoot(),
        NgxCaptureModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
