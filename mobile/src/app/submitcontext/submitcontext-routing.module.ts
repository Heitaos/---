import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitcontextPage } from './submitcontext.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitcontextPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitcontextPageRoutingModule {}
