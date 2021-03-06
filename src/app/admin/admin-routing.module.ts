import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminComponent } from './admin.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { UserType } from 'backend/src/Utilities';

const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'productos', loadChildren: () => import('./product-module/product-module.module').then(m => m.ProductModuleModule), canActivate: [AuthGuard] },
  { path: 'ordenes-de-compra', loadChildren: () => import('./order-module/order-module.module').then(m => m.OrderModuleModule), canActivate: [AuthGuard] },
  { path: 'inventario', loadChildren: () => import('./inventory-module/inventory-module.module').then(m => m.InventoryModuleModule), canActivate: [AuthGuard]},
  { path: 'ventas', loadChildren: () => import('./sale-module/sale-module.module').then(m => m.SaleModuleModule), canActivate: [AuthGuard] },
  { path: 'usuarios', loadChildren: () => import('./user-module/user-module.module').then(m => m.UserModuleModule), canActivate: [AuthGuard] },
  { path: 'clientes', loadChildren: () => import('./customer-module/customer-module.module').then(m => m.CustomerModuleModule), canActivate: [AuthGuard]},
  { path: 'proveedores', loadChildren: () => import('./provider-module/provider-module.module').then(m => m.ProviderModuleModule), canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
