import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SubmitlistPageRoutingModule} from './submitlist-routing.module';

import {SubmitlistPage} from './submitlist.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SubmitlistPageRoutingModule
    ],
    declarations: [SubmitlistPage]
})
export class SubmitlistPageModule {
}
