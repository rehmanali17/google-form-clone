// Importing Environment
import { environment } from '@environments/environment.prod';

// Importing Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from '@modules/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

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

// Create Form Component
import { CreateFormComponent } from '@components/create-form/create-form.component';
import { CreateFormNavbarComponent } from '@components/create-form/create-form-navbar/create-form-navbar.component';
import { CreateFormTitleComponent } from '@components/create-form/create-form-title/create-form-title.component';
import { CreateFormQuestionsComponent } from '@components/create-form/create-form-questions/create-form-questions.component';
import { QuestionContainerComponent } from '@components/create-form/create-form-questions/question-container/question-container.component';
import { AnswerContainerComponent } from '@components/create-form/create-form-questions/answer-container/answer-container.component';
import { ActionsContainerComponent } from '@components/create-form/create-form-questions/actions-container/actions-container.component';

// Importing Root Reducer
import { appReducer } from '@store/app.reducer';

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

        CreateFormComponent,
        CreateFormNavbarComponent,
        CreateFormTitleComponent,
        CreateFormQuestionsComponent,
        QuestionContainerComponent,
        AnswerContainerComponent,
        ActionsContainerComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        CookieModule.forRoot(),
        AppRoutingModule,
        StoreModule.forRoot(appReducer),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
        StoreRouterConnectingModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
