;
import { MatIconModule , MatListModule} from '@angular/material';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material.module';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule , MatButtonModule, MatSidenavModule } from '@angular/material'
;
import { LayoutComponent } from './layout/layout.component'
import { AceEditorModule } from 'ng2-ace-editor';
import { CodeEditorComponent } from './code-editor/code-editor.component'
import { ChartsModule } from 'ng2-charts';
;
import { ProfileEditorComponent } from './profile-editor/profile-editor.component'
;
import { ChartComponent } from './chart/chart.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule
,
        LayoutModule ,
        MatToolbarModule ,
        MatButtonModule ,
        MatSidenavModule ,
        MatIconModule,
        MatListModule,
        DemoMaterialModule,
        ChartsModule,
        AceEditorModule,
    ],
        
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
,
        LayoutComponent
,
        CodeEditorComponent
,
        ProfileEditorComponent,
        ChartComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
       // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }