import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/common/services/web-service/webservice.service';

@Injectable({
  providedIn: 'root'
})
export class FetchPostsService {

  constructor(private webService: WebserviceService) { }

  fetchPosts() {
    return this.webService.getCall()
  }
}
