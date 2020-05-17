import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {ModalController} from '@ionic/angular';
import {LoginPage} from '../app/login/login.page';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private modalControl: ModalController,
    private router: Router,
    ) {}
  canActivate() {
    // console.log('弹窗');
    const token = window.localStorage.getItem('auth_token');
    if (!token) {
      this.showLogin();
      return false; // 不能继续导航
    }

    // // 如果验证通过，则放行，继续完成导航
    return true;
  }

  async showLogin() {
    const modal = await this.modalControl.create({
        component: LoginPage
    });
    return await modal.present();
}
}
