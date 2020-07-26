import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/common/services/web-service/webservice.service';
import { StaticData } from 'src/assets/static-data/static.data';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, PostRes, PostData } from '../interfaces/post.interface';
import { JSONData, DeleteOne, ModifiedOne } from 'src/app/common/interfaces/api-responses.interface';
import { Router } from '@angular/router';
import { CommonDialogUtil } from 'src/app/common/utilities/common-dialog.util';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/common/components/confirmation/confirmation.component';
import { PRIMITIVE_VALUE } from 'src/assets/constants/common-constants';

@Injectable({
  providedIn: 'root'
})
export class FetchPostsService {

  private commonDialogs = CommonDialogUtil;

  constructor(
    private webService: WebserviceService,
    private $router: Router,
    private matDialog: MatDialog
  ) { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], totalPosts: number }>();

  fetchPosts(postsPerPage: number, pageIndex: number): void {
    const queryPayload = { postsPerPage, pageIndex };
    this.webService.getRequestWithParams(StaticData.fetchPostsUrl, queryPayload, false)
    .pipe(map((postData: JSONData<PostData>): { posts: Post[], maxPosts: number } => {
        return {
          posts: postData.data.posts.map( (post: PostRes): Post => {
            console.log(post);
            return {
              id: post._id,
              title: post.title,
              content: post.content,
              photoPath: post.photoPath,
              creator: post.creator
            };
          }),
          maxPosts: postData.data.totalPosts
        };
      })
    )
    .subscribe( (postData): void => {
      const fetchedPosts: Post[] = postData && postData.posts && postData.posts.length ? postData.posts : [];
      this.posts = fetchedPosts;
      this.postsUpdated.next({ posts: [...this.posts], totalPosts: postData.maxPosts });
    });
  }

  getPostUpdateObservable(): Observable<{ posts: Post[], totalPosts: number }> {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, photo: File): void {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('photo', photo, title);
    this.webService.postRequest(StaticData.fetchPostsUrl, postData).subscribe( (res: JSONData<Post>) => {
      // if (res && res.data) {
      //   const post: Post = { title, content, id: res.data.id, photoPath: res.data.photoPath };
      //   console.log(res);
      //   this.posts.push(post);
      //   this.postsUpdated.next([...this.posts]);
      // }
      this.$router.navigate(['/']);
    });
  }

  deletePost(id: string): Observable<JSONData<DeleteOne>> {
    return this.webService.deleteRequest(StaticData.fetchPostsUrl + id);
    // .subscribe( (res: JSONData<DeleteOne>) => {
    //   if (
    //     res && res.data && res.data.deletedCount === 1
    //     && res.data.n === 1 && res.data.ok === 1
    //   ) {
    //     console.log(res.message, res.data);
    //     const updatedPosts = this.posts.filter(post => {
    //       return post.id !== id;
    //     });
    //     this.posts = updatedPosts;
    //     this.postsUpdated.next([...this.posts]);
    //   }
    // });
  }

  updatepost(id: string, content: string, title: string, photo: File | string) {
    let postData: FormData | Post;
    if (typeof(photo) === 'object') {
      postData = new FormData();
      // postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('photo', photo);
    } else {
      postData = {
        id, title, content, photoPath: photo, creator: PRIMITIVE_VALUE.null
      };
    }
    this.webService.putRequestWithParamAndBody(StaticData.fetchPostsUrl, postData, { id } )
    .subscribe( (res: JSONData<ModifiedOne>) => {
      if (
        res && res.data && res.data.nModified === 1
        && res.data.n === 1 && res.data.ok === 1
      ) {
        console.log(res.message, res.data);
        // const oldPostIndex = this.posts.findIndex(postEle => {
        //   return postEle.id === id;
        // });
        // const updatedPosts = [...this.posts];
        // const post: Post = {
        //   id, title, content, photoPath: ''
        // };
        // updatedPosts[oldPostIndex] = post;
        // this.posts = updatedPosts;
        // this.postsUpdated.next([...this.posts]);
        this.$router.navigate(['/']);
      } else {
        this.commonDialogs.confirmDialog(res.message, this.matDialog, ConfirmationComponent);
      }
    }, error => {
      this.commonDialogs.confirmDialog(error.error.message, this.matDialog, ConfirmationComponent);
    });
  }

  getLatestSnapOfPost(postId: string): Observable<JSONData<PostRes>> {
    return this.webService.getRequestWithParams(StaticData.fetchPostsUrl, {id: postId}, false);
  }

}
