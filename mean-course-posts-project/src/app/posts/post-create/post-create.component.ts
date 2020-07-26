import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FetchPostsService } from '../services/fetch-posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType } from 'src/app/common/validators/mime-type.validator';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from 'src/app/common/components/warning/warning.component';
import { StaticData } from 'src/assets/static-data/static.data';

enum mode {
  create = 'create',
  edit = 'edit'
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public mode = mode.create;
  public modeEnum: typeof mode = mode;
  postId: string = null;
  postToEdit: Post;
  public staticDtata = StaticData;

  photoPreviewUrl: string;

  createPostForm: FormGroup;

  constructor(
    public postService: FetchPostsService,
    public router: ActivatedRoute,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createPostFormGoup();
    this.router.paramMap.subscribe( (paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = mode.edit;
        this.postId = paramMap.get('postId');
        this.postService.getLatestSnapOfPost(this.postId).subscribe(res => {
          if (res && res.data && res.data.title && res.data._id) {
            console.log(res.data);
            this.postToEdit = {
              content: res.data.content,
              id: res.data._id,
              title: res.data.title,
              photoPath: res.data.photoPath,
              creator: res.data.creator
            };
            this.createPostForm.setValue({
              title: this.postToEdit.title,
              content: this.postToEdit.content,
              photo : this.postToEdit.photoPath
            });
          } else {
            alert(res.message + '\n' + JSON.stringify(res.data));
          }
        },
        error => {
          alert(JSON.stringify(error));
        });
      } else {
        this.mode = mode.create;
        this.postId = null;
      }
    });
  }

  createPostFormGoup() {
    this.createPostForm = new FormGroup({
      title: new FormControl(
        null,
        [Validators.required, Validators.minLength(3)]
      ),
      content: new FormControl(
        null,
        [Validators.required]
      ),
      photo: new FormControl(
        null, [Validators.required], [mimeType]
      )
    });
  }

  onSavePost(): void {
    if (this.createPostForm.invalid) { return; }

    if (this.mode === mode.create) {
      const post: { title: string; content: string; photo: File, id: string } = this.createPostForm.value;
      this.postService.addPost(post.title, post.content, post.photo);
      this.createPostForm.reset();
    } else {
      const initialState = {
        disableClose: false ,
        data: {message: 'Do you want to update this post ?'}
      };
      const warnDialogRef = this.matDialog.open(WarningComponent, initialState);
      warnDialogRef.afterClosed().subscribe(res => {
        if (res) {
          const post: { title: string; content: string; photo: File | string, id: string } = this.createPostForm.value;
          post.id = this.postId;
          this.postService.updatepost(post.id, post.content, post.title, post.photo);
          this.createPostForm.reset();
        }
      });
    }
  }

  onPhotoSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    this.createPostForm.patchValue({ photo: file });
    this.createPostForm.get('photo').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreviewUrl = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }

}
