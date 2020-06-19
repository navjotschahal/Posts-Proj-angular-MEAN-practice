import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { SharedModule } from 'src/shared/shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';


@NgModule({
  declarations: [PostsComponent, PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule
  ],
  exports: [SharedModule]
})
export class PostsModule { }
