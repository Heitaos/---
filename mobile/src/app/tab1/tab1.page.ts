import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController, IonContent} from '@ionic/angular';
import {LoginPage} from '../login/login.page';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    constructor(
        public modalController: ModalController,
        private router: Router,
        public http: HttpClient,
        ) {
            this.gethotlist();
            this.gettimelist();
    }
    hotlist: any[] = [];
    timelist: any[] = [];
    hot: any; // 热度
    searchContext = ''; // 搜索内容
    searchResult: any[] = [];

    // 轮播图
    @ViewChild('slide', {static: true}) slide: any;
    slideOpts = {
        effect: 'fade',
        autoplay: {
            delay: 2000,
        },
        loop: true
    };
    public taskModel = 'hot';

    // 获取内容节点
    @ViewChild('content', {static: true}) content: IonContent;

    // 点击后继续轮播
    continue() {
        this.slide.startAutoplay();
    }

    // 返回顶部
    top() {
        this.content.scrollToPoint(0, 0, 500);
        // console.log('顶部');
    }

    ngOnInit() {
    }

    test() {
        const token = window.localStorage.getItem('auth_token');
        if (token) {
            this.router.navigate(['/tabs/tab3']);
        } else {
            this.showLogin();
        }
    }

    async showLogin() {
        const modal = await this.modalController.create({
            component: LoginPage
        });
        return await modal.present();
    }


    async gethotlist() {
        await  this.http.get('http://localhost:3000/tasks/getlist/hot')
          .toPromise()
          .then(async (data: any) => {
            //   await console.log(JSON.stringify(data));
            this.hotlist = data;
            // await console.log(this.hotlist);
          });
      }
      async gettimelist() {
        await  this.http.get('http://localhost:3000/tasks/getlist/time')
          .toPromise()
          .then(async (data: any) => {
            //   await console.log(JSON.stringify(data));
            this.timelist = data;
            // await console.log(this.timelist);
          });
      }

    // 服务器更新任务热度
    async rehot(id,hot) {
        hot = hot + 1;
        // console.log(id,hot);
        await  this.http.get('http://localhost:3000/tasks/rehot/' + id + '&' + hot)
          .toPromise()
          .then(async (data: any) => {
              // console.log(data);
          });
      }

     async search(s) {
        // console.log(s);
        if ( !(s === '')) {
            await  this.http.get('http://localhost:3000/tasks/search?con=' + s)
            .toPromise()
            .then(async (data: any) => {
            //   console.log(data);
              this.searchResult = data;
          });
        }
      }

}
