import {Component, OnInit} from '@angular/core';
import {ModalController, AlertController, ToastController, NavController} from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    // 获取当前已登陆用户信息
    user = JSON.parse(window.localStorage.getItem('userInfo') || '{}');
    // 定义任务格式
    public task: any = {
        uId: this.user.id,
        title: '',
        cover: 'assets/img/yl.png',
        money: '',
        people: '',
        model: 1,
        context: '',
        state: '',
    };

    balance = '';

    constructor(
        public modalController: ModalController,
        public alert: AlertController,
        public toastController: ToastController,
        public nav: NavController,
        public sanitizer: DomSanitizer,
        public http: HttpClient,
    ) {
    }

    ngOnInit() {
        // 验证账户余额
        this.getbalance(this.user.id);
    }

    // 图片预览,图片转成base64格式发送
    getPicture(event) {
        const file = new FileReader();
        file.readAsDataURL(event.target.files[0]);
        file.onload = () => {
            this.task.cover = file.result;
            // console.log('base64:', this.task.img);
        };
   }
    // 发布
  async  release() {
        if (this.test()) {
            const alert = await this.alert.create({
                header: '提醒信息',
                message: '按下确认，扣除设置金额作为押金，任务发布成功不可撤回！！！',
                buttons: [
                   {
                        text: '取消',
                       role: 'cancel',
                        cssClass: 'secondary',
                    }, {
                      text: '确认',
                      handler: async () => {
                        this.task.state = '发布';
                        this.newtask(this.task);
                        this.init();
                      }
                  }
              ]
           });
            await alert.present();
        }
    }
    // 保存草稿
   async save() {
        if (this.test()) {
            this.task.state = '草稿';
            this.newtask(this.task);
            this.init();
        }
    }
    //  任务表单格式认证
    test() {
        if (!(this.task.title.toString().length >= 1 )) {
            this.Toast('请输入标题');
        } else if (!(this.task.title.toString().length <= 15 )) {
            this.Toast('标题太长了');
        } else if (this.task.cover === 'assets/img/yl.png') {
            this.Toast('请给您的任务添加封面！！！');
        } else if (!( /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.task.money) )) {
            this.Toast('金额格式不对');
            this.task.money = this.task.money.toFixed(2); // 钱格式化
        } else if (this.task.money > this.balance) {
            this.Toast('您的红包余额仅剩' + this.balance + ', 请充值或者改小红包金额！！！');
        } else if (!(this.task.people.toString().length >= 1 )) {
            this.Toast('请设置人数');
        } else if (!(/^\d+$/g.test(this.task.people))) {
            this.task.people = this.task.people.toFixed(0); // 人数变为整数
            this.Toast('请把人数设置为整数');
        } else if ((this.task.money / this.task.people) < 0.01) {
            this.Toast('每人分得的红包必须大于或等于1分钱');
        } else if (!(/^[0-9]+\.[0-9]{2}$/.test(this.task.money))) {
            this.task.money = this.task.money.toFixed(2); // 钱格式化保留两位小数
        } else {
            return true;
        }
    }

    dismiss() {
        this.modalController.dismiss();
    }

    async Toast(message1: string) {
        const toast = await this.toastController.create({
            message: message1,
            duration: 1000,
        });
        toast.present();
    }

    async newtask(formData) {
        await  this.http.post('http://localhost:3000/tasks/save', formData)
        .toPromise()
        .then(async (data: any) => {
            // await console.log(JSON.stringify(data));
           this.Toast(data.message);
        });
    }

    async getbalance(id) {
        await  this.http.get('http://localhost:3000/users/balance?id=' + id)
          .toPromise()
          .then(async (data: any) => {
            //   await console.log(JSON.stringify(data));
            this.balance = data;
          });
      }
      // 任务表单初始化
      init() {
          this.task.title = '';
          this.task.cover = 'assets/img/yl.png';
          this.task.money = '';
          this.task.people = '';
          this.task.model = 1;
          this.task.context = '';
          this.task.state = '';
      }
}
