import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FetchPostsService } from '../services/fetch-posts.service';
import { Post } from '../interfaces/post.interface';
import { StaticData } from 'src/assets/static-data/static.data';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from 'src/app/common/components/warning/warning.component';
import { PageEvent } from '@angular/material/paginator';
import { PRIMITIVE_VALUE } from 'src/assets/constants/common-constants';
import { AuthService } from 'src/app/auth/services/auth.service';

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

  totalPosts = 0;
  postsPerPage = 2;
  pageSizeOptions = [2, 4, 8, 16, 32, 64];
  pageIndex = 1;

  private $authStateListenerSub: Subscription;
  public isUserAuthenticated: boolean;

  constructor(
    private postsService: FetchPostsService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.isUserAuthenticated = PRIMITIVE_VALUE.false;
  }

  ngOnDestroy(): void {
    this.updatedPostsSub.unsubscribe();
    this.$authStateListenerSub.unsubscribe();
  }

  ngOnInit(): void {
    this.postsService.fetchPosts(this.postsPerPage, this.pageIndex);

    this.updatedPostsSub = this.postsService.getPostUpdateObservable().subscribe( (postData): void => {
      const newPostData = postData;
      this.postsList = [...newPostData.posts];
      this.totalPosts = newPostData.totalPosts;
    });

    this.$authStateListenerSub = this.authService.getAuthStateListener()
    .subscribe((authState: boolean): void => {
      this.isUserAuthenticated = authState ? authState : PRIMITIVE_VALUE.false;
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
    warnDialogRef.afterClosed().subscribe((confirm: boolean) => {
      console.log(confirm);
      if (confirm) {
        this.postsService.deletePost(postId).subscribe(res => {
          if (
                res && res.data && res.data.deletedCount === 1
                && res.data.n === 1 && res.data.ok === 1
              ) {
                this.postsService.fetchPosts(this.postsPerPage, this.pageIndex);
              }
        });
      }
    });
  }

  onChangedPage(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex + 1;
    this.postsPerPage = pageEvent.pageSize;
    console.log(pageEvent);
    this.postsService.fetchPosts(this.postsPerPage, this.pageIndex);
  }

}
