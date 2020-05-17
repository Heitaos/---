import { Component, OnInit , } from '@angular/core';
import {NavController, AlertController, LoadingController} from '@ionic/angular';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-submitcontext',
  templateUrl: './submitcontext.page.html',
  styleUrls: ['./submitcontext.page.scss'],
})
export class SubmitcontextPage implements OnInit {

  detail: any = {
    title: '',
    uId: '',
    tId: '',
    uName: '',
    context: '',
    shotcut: '',
    redpack: '',
  };
  // 内容三种状态
  verification = false;
  no = false;
  yes = false;
  // 获取该内容id
  id: string = this.activate.snapshot.params.id;
  constructor(
    public nav: NavController,
    public alert: AlertController,
    public loading: LoadingController,
    public activate: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    ) {
  }

  ngOnInit() {
    this.getsubmitdetail(this.id);
  }

  goback() {
    this.nav.navigateBack('/submitlist/' + this.detail.tId);
  }
  async pass() {
    const alert = await this.alert.create({
        header: '提醒信息',
        message: '按下通过，红包便发放到用户，请仔细审核！！！若没有问题再点击确认',
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
              handler: () => {
                  // console.log('确认');
                  this.getpass(this.id);
              }
          }
      ]
   });
    await alert.present();
  }

  async not() {
    // console.log('拒绝');
    await this.getnot(this.id);
  }

      // 服务器获取该任务id标题，已提交任务内容
      async getsubmitdetail(id) {
        await  this.http.get('http://localhost:3000/submit/submitcontext/' + id)
          .toPromise()
          .then(async (data: any) => {
            // console.log(data);
            this.detail.title = data.task.title;
            this.detail.uId = data.uId;
            this.detail.tId = data.tId;
            this.detail.uName = data.user.uName;
            if (data.context) {
              this.detail.context = data.context;
            } else {
              this.detail.context = '无';
            }
            if (data.shotcut) {
              this.detail.shorcut = data.shotcut;
            } else {
              this.detail.shorcut = 'assets/img/null.png';
            }
            this.detail.redpack = data.redpack;
            if (data.state === '未审核') {
              this.verification = true;
              return;
            }
            if (data.state === '通过') {
              this.yes = true;
              return;
            }
            if (data.state === '拒绝') {
              this.no = true;
              return;
            }
          });
      }

      async load(message1: string) {
        const loading = await this.loading.create({
            message: message1,
            duration: 500
        });
        await loading.present();
        const {role, data} = await loading.onDidDismiss();
    }

      async getpass(id) {
        await  this.http.get('http://localhost:3000/redpack/pass/' + id)
        .toPromise()
          .then(async (data: any) => {
            // console.log(data);
            await location.reload();
            this.load(data.message);
      });
    }

      async getnot(id) {
        await  this.http.get('http://localhost:3000/redpack/not/' + id)
          .toPromise()
          .then(async (data: any) => {
            // console.log(data);
            await location.reload();
            this.load(data.message);
      });
    }
}
