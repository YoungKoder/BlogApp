import {NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthService} from './shared/services/auth.service';

/*Forms*/
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/*components*/
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

/*Flex layout*/
import { FlexLayoutModule } from '@angular/flex-layout';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule} from '../shared/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


@NgModule({
  declarations: [AdminLayoutComponent, LoginPageComponent, DashboardPageComponent, CreatePageComponent, EditPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login' , component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
          {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
    AngularMaterialModule,
    FlexLayoutModule,
    SharedModule
  ],
  exports: [ RouterModule],
  providers: [AuthGuard]
})

export class AdminModule {

}
