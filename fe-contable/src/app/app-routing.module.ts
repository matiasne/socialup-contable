import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { isAuthRedirectGuard } from './auth/guards/is-auth.guard';
import { unselectedBusinessRedirectGuard } from './auth/guards/unselectedBusiness.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate:[isAuthRedirectGuard]
  },
  {
    path: 'business',
    loadChildren: () => import('./pages/business/business.module').then( m => m.BusinessPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'business/:id',
    loadChildren: () => import('./pages/business/business.module').then( m => m.BusinessPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'form-profile',
    loadChildren: () => import('./pages/form-profile/form-profile.module').then( m => m.FormProfilePageModule), canActivate:[AuthGuard]
  },

  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule), canActivate:[isAuthRedirectGuard]
  },
  
  {
    path: 'form-forgotpassword',
    loadChildren: () => import('./pages/form-forgotpassword/form-forgotpassword.module').then( m => m.FormForgotpasswordPageModule),  canActivate:[isAuthRedirectGuard]
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/form-product/form-product.module').then( m => m.FormProductPageModule), canActivate:[unselectedBusinessRedirectGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/list-product/list-product.module').then( m => m.ListProductPageModule), canActivate:[unselectedBusinessRedirectGuard]
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./pages/form-product/form-product.module').then( m => m.FormProductPageModule), canActivate:[unselectedBusinessRedirectGuard]
  },
  {
    path: 'list-client',
    loadChildren: () => import('./pages/list-client/list-client.module').then( m => m.ListClientPageModule), canActivate:[unselectedBusinessRedirectGuard]
  },
  {
    path: 'select-user-business',
    loadChildren: () => import('./pages/select-user-business/select-user-business.module').then( m => m.SelectUserBusinessPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'dashboard-business',
    loadChildren: () => import('./pages/dashboard-business/dashboard-business.module').then( m => m.DashboardBusinessPageModule), canActivate:[unselectedBusinessRedirectGuard]
  },
  {
    path: 'form-sale',
    loadChildren: () => import('./pages/form-sale/form-sale.module').then( m => m.FormSalePageModule), canActivate:[unselectedBusinessRedirectGuard]
  },
  {
    path: 'edit-client',
    loadChildren: () => import('./pages/edit-client/edit-client.module').then( m => m.EditClientPageModule), canActivate:[unselectedBusinessRedirectGuard]
  },
  {
    path: 'create-client',
    loadChildren: () => import('./pages/create-client/create-client.module').then( m => m.CreateClientPageModule), canActivate:[unselectedBusinessRedirectGuard]
  },
  {
    path: 'list-sale',
    loadChildren: () => import('./pages/list-sale/list-sale.module').then( m => m.ListSalePageModule), canActivate:[unselectedBusinessRedirectGuard]
  }







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
