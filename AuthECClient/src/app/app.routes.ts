import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './shared/auth.guard';
import { AdminOnlyComponent } from './authorize/admin-only/admin-only.component';
import { AdminOrTeacherComponent } from './authorize/admin-or-teacher/admin-or-teacher.component';
import { ApplyForMaternityLeaveComponent } from './authorize/apply-for-maternity-leave/apply-for-maternity-leave.component';
import { LibraryMembersOnlyComponent } from './authorize/library-members-only/library-members-only.component';
import { FemaleAndUnderAgeOfTenComponent } from './authorize/female-and-under-age-of-ten/female-and-under-age-of-ten.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { claimReq } from './shared/utils/claimReq-utils';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'signup', component: RegistrationComponent },
      { path: 'signin', component: LoginComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'admin-only',
        component: AdminOnlyComponent,
        data: { claimReq: claimReq.adminOnly },
      },
      {
        path: 'admin-or-teacher',
        component: AdminOrTeacherComponent,
        data: {
          claimReq: claimReq.adminOrTeacher,
        },
      },
      {
        path: 'apply-for-maternity-leave',
        component: ApplyForMaternityLeaveComponent,
        data: {
          claimReq: claimReq.isFemaleAndTeacher,
        },
      },
      {
        path: 'library-members-only',
        component: LibraryMembersOnlyComponent,
        data: {
          claimReq: claimReq.hasLibraryId,
        },
      },
      {
        path: 'female-and-under-age-of-ten',
        component: FemaleAndUnderAgeOfTenComponent,
        data: {
          claimReq: claimReq.isFemaleAndBelow10,
        },
      },
      { path: 'forbidden', component: ForbiddenComponent },
    ],
  },
];
