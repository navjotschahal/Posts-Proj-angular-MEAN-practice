import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { AuthGuard } from '../auth/route-authguard/auth.guard';

const routes: Routes = [
  {
    path: '', // child route path
    component: PostListComponent // child route component that the router renders
  },
  {
    path: 'combined-view', // child route path
    component: PostsComponent, // child route component that the router renders
    canActivate: [ AuthGuard ]
  },
  {
    path: 'create',
    component: PostCreateComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'edit/:postId',
    component: PostCreateComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PostsRoutingModule { }
