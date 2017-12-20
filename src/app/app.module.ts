import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from './../pages/login-page/login-page.module';
import { SingupPageModule } from '../pages/singup-page/singup-page.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { AuthService } from '../core/auth.service';
import { ExtendedHttpService } from './../core/http.service';
import { TestPageOneModule } from '../pages/test-page-one/test-page-one.module';
import { TestPageTwoModule } from '../pages/test-page-two/test-page-two.module';

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        LoginPageModule,
        SingupPageModule,
        ProfilePageModule,
        TestPageOneModule,
        TestPageTwoModule,
        HttpModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        AuthService,
        ExtendedHttpService,
        Facebook

    ]
})
export class AppModule {}
