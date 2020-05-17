import {Component, OnInit} from '@angular/core';
import {ModalController, LoadingController, ToastController, NavController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public user: any = {
        uName: '',
        password: '',
    };
    remember = true;


    constructor(
        public modalController: ModalController,
        public loadingController: LoadingController,
        public toastController: ToastController,
        public nav: NavController,
        public http: HttpClient,
        private router: Router,
    ) {
        console.log();
    }

// 登陆
   async login() {
        if (!(this.user.uName.toString().length >= 2 && this.user.uName.toString().length <= 6 )) {
            this.Toast('用户名不合法，请检查');
        } else if (!(this.user.password.toString().length >= 6 && this.user.password.toString().length <= 16 )) {
            this.Toast('密码不合法，请检查');
        } else {
           await this.loading('验证中。。。');
           this.testUser(this.user);
        }
    }

    // 关闭登陆
    dismiss() {
        this.modalController.dismiss();
        this.router.navigate(['/']);
    }

    ngOnInit() {
    }

    async loading(message1: string) {
        const loading = await this.loadingController.create({
            message: message1,
            duration: 500
        });
        await loading.present();
        const {role, data} = await loading.onDidDismiss();
    }

    async Toast(message1: string) {
        const toast = await this.toastController.create({
            message: message1,
            duration: 1000,
        });
        toast.present();
    }

    async showRegist() {
        this.nav.navigateForward('/regist');
        this.modalController.dismiss();
    }

    async testUser(formData) {
        await  this.http.post('http://localhost:3000/users/login', formData)
        .toPromise()
        .then(async (data: any) => {
            // await console.log(JSON.stringify(data));
           if (data.responseData.code === 3) {
               window.localStorage.setItem('auth_token', data.token);
               window.localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
               window.localStorage.setItem('remember', JSON.stringify(this.remember));
               this.modalController.dismiss();
            }
           this.Toast(data.responseData.message);
        });
    }
}
