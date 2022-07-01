import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'business',
    loadChildren: () => import('./pages/business/business.module').then( m => m.BusinessPageModule)
  },
  {
    path: 'business/:id',
    loadChildren: () => import('./pages/business/business.module').then( m => m.BusinessPageModule)
  },
  {
    path: 'form-profile',
    loadChildren: () => import('./pages/form-profile/form-profile.module').then( m => m.FormProfilePageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  
  {
    path: 'form-forgotpassword',
    loadChildren: () => import('./pages/form-forgotpassword/form-forgotpassword.module').then( m => m.FormForgotpasswordPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/form-product/form-product.module').then( m => m.FormProductPageModule)
  },
  {
    path: 'list-business',
    loadChildren: () => import('./pages/business-list/business-list.module').then( m => m.BusinessListPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/list-product/list-product.module').then( m => m.ListProductPageModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./pages/form-product/form-product.module').then( m => m.FormProductPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/form-client/form-client.module').then( m => m.FormClientPageModule)
  },
  {
    path: 'client/:id',
    loadChildren: () => import('./pages/form-client/form-client.module').then( m => m.FormClientPageModule)
  },
  {
    path: 'list-client',
    loadChildren: () => import('./pages/list-client/list-client.module').then( m => m.ListClientPageModule)
  },  {
    path: 'select-user-business',
    loadChildren: () => import('./pages/select-user-business/select-user-business.module').then( m => m.SelectUserBusinessPageModule)
  },
  {
    path: 'dashboard-business',
    loadChildren: () => import('./pages/dashboard-business/dashboard-business.module').then( m => m.DashboardBusinessPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
