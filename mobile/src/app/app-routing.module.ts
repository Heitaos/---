import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../app/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'regist',
        loadChildren: () => import('./regist/regist.module').then(m => m.RegistPageModule)
    },
    {
        path: 'money',
        canActivate: [AuthGuard],
        loadChildren: () => import('./money/money.module').then(m => m.MoneyPageModule)
    },
    {
        path: 'tasklist',
        canActivate: [AuthGuard],
        loadChildren: () => import('./tasklist/tasklist.module').then(m => m.TasklistPageModule)
    },
    {
        path: 'done',
        canActivate: [AuthGuard],
        loadChildren: () => import('./done/done.module').then(m => m.DonePageModule)
    },
    {
        path: 'submit/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./submit/submit.module').then(m => m.SubmitPageModule)
    },
    {
        path: 'submitlist/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./submitlist/submitlist.module').then(m => m.SubmitlistPageModule)
    },
    {
        path: 'submitlist/no/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./submitlist/submitlist.module').then(m => m.SubmitlistPageModule)
    },
  {
    path: 'submitcontext/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./submitcontext/submitcontext.module').then( m => m.SubmitcontextPageModule)
  },
  {
    path: 'draft/:id',
    loadChildren: () => import('./draft/draft.module').then( m => m.DraftPageModule)
  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
