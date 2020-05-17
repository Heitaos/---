import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-done',
    templateUrl: './done.page.html',
    styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {
    state = 'pass';
    pass: any[] ;
    not: any[] ;
    veri: any[] ;
    // 获取当前已登陆用户信息
    user = JSON.parse(window.localStorage.getItem('userInfo') || '{}');

    constructor(
        public nav: NavController,
        public http: HttpClient,
    ) {
    }

    ngOnInit() {
        this.getpass(this.user.id);
        this.getveri(this.user.id);
        this.getnot(this.user.id);
    }

    goback() {
        this.nav.back();
    }
    // 服务器获取通过列表
    async getpass(id) {
        await  this.http.get('http://localhost:3000/submit/getpasslist/' + id)
          .toPromise()
          .then(async (data: any) => {
            this.pass = data;
            // await console.log(this.pass);
          });
      }

    // 服务器获取审核ing列表
    async getveri(id) {
        await  this.http.get('http://localhost:3000/submit/getlist/' + id)
          .toPromise()
          .then(async (data: any) => {
            this.veri = data;
            // await console.log(this.pass);
          });
      }

    // 服务器获取拒绝列表
    async getnot(id) {
        await  this.http.get('http://localhost:3000/submit/getnotlist/' + id)
          .toPromise()
          .then(async (data: any) => {
            this.not = data;
            // await console.log(this.pass);
          });
      }
}
