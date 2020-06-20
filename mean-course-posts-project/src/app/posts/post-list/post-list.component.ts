import { Component, OnInit } from '@angular/core';
import { FetchPostsService } from '../services/fetch-posts.service';
import { Post } from '../interfaces/post.interface';
import { StaticData } from 'src/assets/static-data/static.data';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  panelOpenState: boolean;
  postsList: Post[] = [];

  constructor(private postsService: FetchPostsService) { }

  ngOnInit(): void {
    this.postsService.fetchPosts().subscribe( (res) => {
      this.postsList = res.data ? res.data : [];
      console.log(this.postsList);
    },
    error => {
      console.log(error.message);
    });
  }

}
