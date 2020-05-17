import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitcontextPageRoutingModule } from './submitcontext-routing.module';

import { SubmitcontextPage } from './submitcontext.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitcontextPageRoutingModule
  ],
  declarations: [SubmitcontextPage]
})
export class SubmitcontextPageModule {}
