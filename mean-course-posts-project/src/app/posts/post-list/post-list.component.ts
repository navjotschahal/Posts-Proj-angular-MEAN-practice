import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FetchPostsService } from '../services/fetch-posts.service';
import { Post } from '../interfaces/post.interface';
import { StaticData } from 'src/assets/static-data/static.data';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  panelOpenState: boolean;
  togglePostList = true;
  postsList: Post[] = [];
  updatedPostsSub: Subscription;

  constructor(private postsService: FetchPostsService) { }
  ngOnDestroy(): void {
    this.updatedPostsSub.unsubscribe();
  }

  ngOnInit(): void {
    this.postsService.fetchPosts();

    this.updatedPostsSub = this.postsService.getPostUpdateObservable().subscribe( (posts): void => {
      const newPosts = posts;
      this.postsList.push(...newPosts);
    });
  }

  togglePostListFlag(): boolean {
    return this.togglePostList = !this.togglePostList;
  }

}
