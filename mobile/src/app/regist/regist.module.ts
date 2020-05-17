import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RegistPageRoutingModule} from './regist-routing.module';

import {RegistPage} from './regist.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegistPageRoutingModule
    ],
    declarations: [RegistPage]
})
export class RegistPageModule {
}
