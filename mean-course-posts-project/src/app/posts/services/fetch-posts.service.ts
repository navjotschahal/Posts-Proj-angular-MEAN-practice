import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/common/services/web-service/webservice.service';
import { StaticData } from 'src/assets/static-data/static.data';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { JSONData } from 'src/app/common/interfaces/api-responses.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchPostsService {

  constructor(private webService: WebserviceService) { }

  fetchPosts(): Observable<JSONData<Post[]>> {
    return this.webService.getCall(StaticData.fetchPostsUrl);
  }

}
