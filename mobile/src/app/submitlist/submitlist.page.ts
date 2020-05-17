import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-submitlist',
    templateUrl: './submitlist.page.html',
    styleUrls: ['./submitlist.page.scss'],
})
export class SubmitlistPage implements OnInit {
    userlist: any [];

   constructor(
        public nav: NavController,
        public activate: ActivatedRoute,
        public http: HttpClient,
    ) {
    }

    ngOnInit() {
        // 获取任务id
        const tId: string = this.activate.snapshot.params.id;
        this.getusers(tId);
    }

    goback() {
        this.nav.navigateBack('/tasklist');
    }
    // 服务器获取已提交任务内容的用户表
    async getusers(id) {
        await  this.http.get('http://localhost:3000/submit/submitlist/' + id)
          .toPromise()
          .then(async (data: any) => {
              this.userlist = data;
            //   console.log(this.userlist);
          });
      }
}
