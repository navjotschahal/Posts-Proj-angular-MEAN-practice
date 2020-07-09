import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';

const routes: Routes = [
  {
    path: '', // child route path
    component: PostListComponent // child route component that the router renders
  },
  {
    path: 'combined-view', // child route path
    component: PostsComponent // child route component that the router renders
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'edit/:postId',
    component: PostCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
