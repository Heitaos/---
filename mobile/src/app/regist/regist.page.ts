import {Component, OnInit, } from '@angular/core';
import {ModalController, ToastController, NavController, } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {LoginPage} from '../login/login.page';

@Component({
    selector: 'app-regist',
    templateUrl: './regist.page.html',
    styleUrls: ['./regist.page.scss'],
})
export class RegistPage implements OnInit {
    public user: any = {
        uName: '',
        password: ''
    };
    password1: any;
    password2: any;

    constructor(
        public toastController: ToastController,
        public modalController: ModalController,
        public nav: NavController,
        public http: HttpClient,
    ) {
    }

    registpro() {
        // this.findone();
        if (!(this.user.uName.toString().length >= 2 && this.user.uName.toString().length <= 6 )) {
            this.Toast('用户名不合法，请检查');
        } else if (!(this.password1 === this.password2)) {
            this.Toast('密码不一致，请检查');
        } else if (!(this.password1.length >= 6 && this.password1.length <= 16 )) {
            this.Toast('密码不合法，请检查');
        } else {
            this.user.password = this.password1;
            // console.log(this.user);
            this.newUser(this.user);
            // this.Toast('注册成功,去登陆吧');
            // this.goback();
        }
    }

    goback() {
        this.nav.back();
        this.showLogin();
    }

    ngOnInit() {
    }

    async Toast(message2: string) {
        const toast = await this.toastController.create({
            message: message2,
            duration: 1000,
        });
        toast.present();
    }


    async showLogin() {
        const modal = await this.modalController.create({
            component: LoginPage
        });
        return await modal.present();
    }

    async newUser(formData) {
      await  this.http.post('http://localhost:3000/users/register', formData)
        .toPromise()
        .then(async (data: any) => {
            // await console.log(JSON.stringify(data));
            this.Toast(data.message);
            if (data.code === 2) {this.goback(); }
        });
    }

    // findone() {
    //     this.http.get('http://localhost:3000/users').subscribe(
    //         data => {
    //             console.log(JSON.stringify(data));
    //         }
    //         );
    // }

}
