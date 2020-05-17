import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from '../auth-guard.service'

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab1/tab1.module').then(m => m.Tab1PageModule)
                    }
                ]
            },
            {
                path: 'tab2',
                canActivate: [AuthGuard], // 在导航 contacts 之前会先进入路由守卫
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab2/tab2.module').then(m => m.Tab2PageModule)
                    }
                ]
            },
            {
                path: 'tab3',
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab3/tab3.module').then(m => m.Tab3PageModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class TabsPageRoutingModule {
}
