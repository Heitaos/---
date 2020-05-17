import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})

export class AppComponent {
    remember = JSON.parse(window.localStorage.getItem('remember') || '{}');

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
        // 浏览器关闭监听
        window.onbeforeunload = async () => {
            if (!this.remember) {
                await window.localStorage.removeItem('auth_token');
                await window.localStorage.removeItem('userInfo');
            }
        };
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
