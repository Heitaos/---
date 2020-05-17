import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPage} from '../app/login/login.page';


@NgModule({
    declarations: [
        AppComponent,
        LoginPage,
    ],
    entryComponents: [
        LoginPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot({
            mode: 'ios',  // 配置android ios 都使用一个样式
          }),
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
    ],

    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],

    bootstrap: [
        AppComponent,
    ]
})

export class AppModule {}
