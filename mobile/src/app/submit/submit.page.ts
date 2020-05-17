import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})

export class SubmitPage implements OnInit {
  constructor(
    public nav: NavController,
    public toast: ToastController,
    public activate: ActivatedRoute,
    public http: HttpClient,
   ) {
  }
  // 获取当前已登陆用户信息
  user = JSON.parse(window.localStorage.getItem('userInfo') || '{}');


  public task: any = {
    uId: '',
    uName: '',
    title: '',
    time: '',
    cover: '',
    money: '',
    people: '',
    doneNum : '',
    model: 1,
    context: '',
  };

  public submitcontext: any = {
    tId : '',
    uId : this.user.id,
    context : '',
    shotcut : 'assets/img/yl.png',
  };
  id: string = this.activate.snapshot.params.id;

  async ngOnInit() {
    // 获取任务id
    // console.log(id);
    this.submitcontext.tId = this.id;
    await this.getdetail(this.id);
  }

  goback() {
    this.nav.back();
  }
  async submit() {
    if (this.submitcontext.shotcut === 'assets/img/yl.png') {
      this.submitcontext.shotcut = '';
    }
    if (this.task.doneNum < this.task.people) {
      await this.newsubmit(this.submitcontext);
      // console.log(this.submitcontext);
      this.init();
      return;
    } else {
      await this.Toast('提交失败，抱歉该任务已达人数上限！！！');
      this.init();
      return;
    }
  }

  async Toast(message2: string) {
    const toast = await this.toast.create({
        message: message2,
        duration: 1000,
    });
    toast.present();
  }
  // 服务器获取任务详情
  async getdetail(id) {
    await  this.http.get('http://localhost:3000/tasks/getDetail/' + id)
      .toPromise()
      .then(async (data: any) => {
          // console.log(data);
          this.task.uId = data.t.uId;
          this.task.uName = data.uName;
          this.task.title = data.t.title;
          this.task.time = data.t.time;
          this.task.cover = data.t.cover;
          this.task.money = data.t.money;
          this.task.people = data.t.people;
          this.task.doneNum = data.doneNum;
          if (data.t.model) {
            this.task.model = '红包模式';
          } else {
            this.task.model = '平均模式';
          }
          this.task.context = data.t.context;
          this.task.hot = data.t.hot;
      });
  }
  // 提交任务要求内容
  async newsubmit(formData) {
    await  this.http.post('http://localhost:3000/submit/save', formData)
    .toPromise()
    .then(async (data: any) => {
        // await console.log(JSON.stringify(data));
       this.Toast(data.message);
    });
  }
  // 初始化
  init() {
    this.submitcontext.context = '';
    this.submitcontext.shotcut = 'assets/img/yl.png';
  }



  getPicture(event) {
    const file = new FileReader();
    file.readAsDataURL(event.target.files[0]);
    file.onload = () => {
        this.submitcontext.shotcut = file.result;
        // console.log('base64:', this.submitcontext.shotcut);
    };
  }

}
