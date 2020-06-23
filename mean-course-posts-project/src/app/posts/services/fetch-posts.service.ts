import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/common/services/web-service/webservice.service';
import { StaticData } from 'src/assets/static-data/static.data';
import { Observable, Subject } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { JSONData } from 'src/app/common/interfaces/api-responses.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchPostsService {

  constructor(private webService: WebserviceService) { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  fetchPosts(): void {
    this.webService.getCall(StaticData.fetchPostsUrl).subscribe( (res: JSONData<Post[]>): void => {
      const fetchedPosts: Post[] = res && res.data ? res.data : [];
      this.postsUpdated.next([...fetchedPosts]);
    });
  }

  getPostUpdateObservable(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const post = { title, content, id: null };
    this.webService.postcall(StaticData.fetchPostsUrl, post).subscribe( (res) => {
      console.log(res.message);
    });
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

}
