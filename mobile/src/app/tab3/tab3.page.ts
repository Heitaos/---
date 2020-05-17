import {Component } from '@angular/core';
import {ToastController, AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    user = JSON.parse(window.localStorage.getItem('userInfo') || '{}');
    public newUser: any = {
        photo: 'assets/img/1.png',
        id: '',
        uName: '',
        password: '',
    };
    password1: any;
    password2: any;

    async signout() {
       await window.localStorage.removeItem('auth_token');
       await window.localStorage.removeItem('userInfo');
       this.route.navigate(['/']);
       this.Toast('注销当前账户成功！');
    }

    changeinfo() {
        this.presentAlertPrompt();
    }

    constructor(
        public toast: ToastController,
        public alert: AlertController,
        public loading: LoadingController,
        public route: Router,
        public http: HttpClient,
        public sanitizer: DomSanitizer,
    ) {
    }

    async Toast(message2: string) {
        const toast = await this.toast.create({
            message: message2,
            duration: 1500,
        });
        toast.present();
    }

    async presentAlertPrompt() {
        const alert = await this.alert.create({
            header: '修改当前用户信息!',
            inputs: [
                {
                    name: 'uName',
                    type: 'text',
                    placeholder: '新用户名'
                },
                {
                    name: 'password1',
                    type: 'password',
                    id: 'password1',
                    placeholder: '新密码'
                },
                {
                    name: 'password2',
                    type: 'password',
                    id: 'password2',
                    placeholder: '重复确认新密码'
                },
            ],
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('取消');
                    }
                }, {
                    text: '确认',
                    handler: (newUser) => {
                        if (!(newUser.uName.toString().length >= 2 && newUser.uName.toString().length <= 6 )) {
                            this.Toast('修改失败！用户名不合法，请检查');
                        } else if (!(newUser.password1 === newUser.password2)) {
                            this.Toast('修改失败！密码不一致，请检查');
                        } else if (!(newUser.password1.length >= 6 && newUser.password1.length <= 16 )) {
                            this.Toast('修改失败！密码长度不合法，请检查');
                        } else {
                            this.newUser.id = this.user.id;
                            this.newUser.uName = newUser.uName;
                            this.newUser.password = newUser.password1;
                            // console.log(this.newUser);
                            this.updateUser(this.newUser);
                        }
                        // this.Toast('修改当前账户信息成功！');
                    }
                }
            ]
        });

        await alert.present();
    }

    async updateUser(formData) {
        await  this.http.post('http://localhost:3000/users/update', formData)
          .toPromise()
          .then(async (data: any) => {
            if (data.responseData.code === 3) {
                this.load(data.responseData.message);
                await window.localStorage.removeItem('auth_token');
                await window.localStorage.removeItem('userInfo');
                await window.localStorage.setItem('auth_token', data.token);
                await window.localStorage.setItem('userInfo', JSON.stringify(data.newuserInfo));
                await location.reload();
             } else {this.Toast(data.responseData.message); }
          });
      }

      // 头像预览
      getPicture(event) {
        this.newUser.photo = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(event.target.files[0]));
   }

   async load(message1: string) {
    const loading = await this.loading.create({
        message: message1,
        duration: 500
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
}
}
