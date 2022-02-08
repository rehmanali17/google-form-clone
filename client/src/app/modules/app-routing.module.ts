import { CreateFormComponent } from '@components/create-form/create-form.component';
import { EditFormComponent } from '@components/edit-form/edit-form.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { LandingPageComponent } from '@components/landing-page/landing-page.component';
import { FormComponent } from '@components/form/form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@services/auth-guard.service';

const routes: Routes = [
    { path: '', component: LandingPageComponent },
    {
        path: 'user',
        canActivateChild: [AuthGuardService],
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
            { path: 'create-form', component: CreateFormComponent },
            { path: 'edit-form/:id', component: EditFormComponent },
        ],
    },
    { path: 'fill-form/:id', component: FormComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
