import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TasklistPage} from './tasklist.page';

const routes: Routes = [
    {
        path: '',
        component: TasklistPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasklistPageRoutingModule {
}
