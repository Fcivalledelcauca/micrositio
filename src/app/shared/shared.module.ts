import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { BroadcrumbsComponent } from './broadcrumbs/broadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  declarations: [
    HeaderComponent,
    BroadcrumbsComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    BroadcrumbsComponent,
    SidebarComponent,
  ]

})
export class SharedModule { }
