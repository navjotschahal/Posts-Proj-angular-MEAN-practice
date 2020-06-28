import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FetchPostsService } from '../services/fetch-posts.service';
import { Post } from '../interfaces/post.interface';
import { StaticData } from 'src/assets/static-data/static.data';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from 'src/app/common/components/warning/warning.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  /**
   * Toggles content in mat-panel-description
   * It itself gets toggled on mat-panel (closed)
   * &
   * (Opened) events
   */
  panelOpenState: boolean;
  /**
   * Toggles mat-accodian
   * bind to Toggle button
   */
  togglePostList = true;
  /**
   * Post List iterated over mat-panel
   * contains Post objects.
   */
  postsList: Post[] = [];
  /**
   * Subscription property assigned with updatedPost Subject
   * from fetch-post.service
   * Act's as a event listner as updates postList when ever new post is added.
   */
  updatedPostsSub: Subscription;

  constructor(
    private postsService: FetchPostsService,
    private matDialog: MatDialog
  ) { }

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

  /**
   * Toggles the visibility of the Post List mat-accordian
   * *ngIf bind to component property 'togglePostList'
   */
  togglePostListFlag(): void {
    this.togglePostList = !this.togglePostList;
  }

  onDelete(postId: string) {
    const initialState = {
      disableClose: false ,
      data: {message: 'Do yo want to delete this post?'}
    };
    const warnDialogRef = this.matDialog.open(WarningComponent, initialState);
    warnDialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.postsService.deletePost(postId);
      }
    });
  }

}
