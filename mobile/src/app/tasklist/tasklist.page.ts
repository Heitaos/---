import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-tasklist',
    templateUrl: './tasklist.page.html',
    styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
    // 获取当前已登陆用户信息
    user = JSON.parse(window.localStorage.getItem('userInfo') || '{}');
    tasklist: any = 'released';
    released: any[] = [];
    draft: any[] = [];

    constructor(
        public nav: NavController,
        public http: HttpClient,
    ) {
    }

    ngOnInit() {
        this.getreleased(this.user.id);
        this.getdraft(this.user.id);
    }

    goback() {
        this.nav.navigateBack('/tabs/tab3');
    }

    // 服务器获取已发布列表
    async getreleased(id) {
        await  this.http.get('http://localhost:3000/tasks/released/' + id)
          .toPromise()
          .then(async (data: any) => {
            //   await console.log(JSON.stringify(data));
            this.released = data;
            // await console.log(this.timelist);
          });
      }
      // 服务器获取草稿列表
      async getdraft(id) {
        await  this.http.get('http://localhost:3000/tasks/draft/' + id)
          .toPromise()
          .then(async (data: any) => {
            this.draft = data;
          });
      }
}
