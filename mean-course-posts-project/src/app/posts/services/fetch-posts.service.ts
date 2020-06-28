import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/common/services/web-service/webservice.service';
import { StaticData } from 'src/assets/static-data/static.data';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../interfaces/post.interface';
import { JSONData, DeleteOne } from 'src/app/common/interfaces/api-responses.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchPostsService {

  constructor(private webService: WebserviceService) { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  fetchPosts(): void {
    this.webService.getRequest(StaticData.fetchPostsUrl)
    .pipe(map((postData: JSONData<any[]>) => {
      return postData.data.map( (post): Post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content
        };
      });
    }))
    .subscribe( (posts: Post[]): void => {
      const fetchedPosts: Post[] = posts && posts.length ? posts : [];
      this.postsUpdated.next([...fetchedPosts]);
    });
  }

  getPostUpdateObservable(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const post = { title, content, id: null };
    this.webService.postRequest(StaticData.fetchPostsUrl, post).subscribe( (res) => {
      console.log(res.message);
    });
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  deletePost(id: string) {
    this.webService.deleteRequest(StaticData.fetchPostsUrl + id).subscribe( (res: JSONData<DeleteOne>) => {
      if (res && res.data && res.data.deletedCount === 1 && res.data.n === 1 && res.data.ok === 1) {
        console.log(res.message, res.data);
      }
    });
  }

}
