import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { PostService } from './post.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  downloadURL: any
  fb: any
  constructor(
    private storage: AngularFireStorage,
    private postService: PostService,
    private user: UserService
  ) {}

  uploadFileAndPost(file: any, content:string) {
    var filename = Date.now();
    const filePath = `uploads/${filename}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.fb = url;
              this.postService.uploadPost({

                content: content,
                imageURL: url,
              }).then(rs => { 
                console.log("Post success") 
              })
            }
          });
        })
      )
  }
  uploadAvatar(file: any) {
    var filename = Date.now();
    const filePath = `uploads/${filename}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.fb = url;
              this.user.updateUser({
                id: this.user.UID(),
                photoURL: url
              }).then(rs => {
                window.location.reload()
              })
            }
          });
        })
      )
  }
}
