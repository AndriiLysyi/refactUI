import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { CodeEditorComponent } from './code-editor'; 
import { ProfileEditorComponent } from './profile-editor';
import { ChartComponent } from './chart';

const appRoutes: Routes = [
    { path: '', component: ProfileEditorComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'editor', component: CodeEditorComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileEditorComponent, canActivate: [AuthGuard]},
    { path: 'stat', component: ChartComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: 'stat' }
];

export const routing = RouterModule.forRoot(appRoutes);