import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FetchPostsService } from '../services/fetch-posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  createPostForm: FormGroup;

  constructor(private postService: FetchPostsService) { }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
  }

  onAddPost(): void {
    const post: Post = this.createPostForm.value;
    this.createPostForm.reset();
    this.postService.addPost(post.title, post.content);
  }

}
