import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SubmitlistPage} from './submitlist.page';

const routes: Routes = [
    {
        path: '',
        component: SubmitlistPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubmitlistPageRoutingModule {
}
