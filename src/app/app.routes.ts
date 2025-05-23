import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';

export const appRoutes: Routes = [
   {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},

    {
      path: 'login',
      loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
    },
    {
      path: 'home',
      loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
      canActivate: [() => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (!auth.isAuthenticated()) {
          router.navigate(['/login']);
          return false;
        }
        return true;
      }]
    },
    {
      path: 'detail/:id',
      loadComponent: () => import('./detail/detail.component').then(m => m.DetailComponent),
    canActivate: [() => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    setTimeout(() => router.navigate(['/login']), 0);
    return false;
  }
  return true;
}]


    },
  ];
  