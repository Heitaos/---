import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, ToastController, } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-money',
    templateUrl: './money.page.html',
    styleUrls: ['./money.page.scss'],
})
export class MoneyPage implements OnInit {
    user = JSON.parse(window.localStorage.getItem('userInfo') || '{}');
    balance = '';
    verification = {
        id: this.user.id,
        money: ''
    };
    record: any;

    constructor(
        public nav: NavController,
        public toast: ToastController,
        public alert: AlertController,
        public http: HttpClient,
    ) {
        // console.log(this.balance);
    }

    ngOnInit() {
        this.getbalance(this.user.id);
        this.getrecord(this.user.id);
    }

    goback() {
        this.nav.back();
    }

    async in() {
        const alert = await this.alert.create({
            header: '填写充值信息',
            inputs: [
                {
                    name: 'in',
                    type: 'text',
                    placeholder: '金额（RMB）'
                },
            ],
            message: '支付宝扫描二维码充值',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        // console.log('取消');
                    }
                }, {
                    text: '确认',
                    handler: (data) => {
                        this.test(data.in);
                        this.verification.money = data.in;
                        this.postin(this.verification);
                    }
                }
            ]
        });

        await alert.present();
    }
    async out() {
        const alert = await this.alert.create({
            header: '填写提现信息',
            inputs: [
                {
                    name: 'out',
                    type: 'text',
                    placeholder: '金额（RMB）'
                },
            ],
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        // console.log('取消');
                    }
                }, {
                    text: '确认',
                    handler: (data) => {
                        this.test(data.out);
                        this.verification.money = data.out;
                        this.postout(this.verification);
                    }
                }
            ]
        });

        await alert.present();
    }
    async Toast(message2: string) {
        const toast = await this.toast.create({
            message: message2,
            duration: 2000,
        });
        toast.present();
    }
    // 获取该用户的余额
    async getbalance(id) {
        await  this.http.get('http://localhost:3000/users/balance?id=' + id)
          .toPromise()
          .then(async (data: any) => {
            //   await console.log(JSON.stringify(data));
            this.balance = data;
          });
      }

      // 提交充值申请给服务端
      async postin(formData) {
        await  this.http.post('http://localhost:3000/verify/newin', formData)
        .toPromise()
        .then(async (data: any) => {
            // await console.log(JSON.stringify(data));
            await this.Toast(data.message);
            location.reload();
        });
    }

    // 提交提现申请给服务端
    async postout(formData) {
        await  this.http.post('http://localhost:3000/verify/newout', formData)
        .toPromise()
        .then(async (data: any) => {
            // await console.log(JSON.stringify(data));
            await this.Toast(data.message);
            location.reload();
        });
    }

    // 服务端获取余额记录
    async getrecord(id) {
        await  this.http.get('http://localhost:3000/verify/' + id)
          .toPromise()
          .then(async (data: any) => {
            this.record = data;
          });
      }

    //   金额表单格式验证
    test(money){
        if (!( /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(money) )) {
            this.Toast('表单提交失败，金额格式不对！！！');
        }
    }
}
