import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.css']
})
export class UploadPostComponent implements OnInit {

  
downloadURL: any
fb: any
image:any
file: File| any
form: FormGroup| any

constructor(
  private postService: PostService,
  private uploadImage: UploadImageService,
  private storage: AngularFireStorage,
) { 
  
}


ngOnInit(): void {
    this.formInit()
}

formInit() {
  this.form = new FormGroup({
    content: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    file: new FormControl(null, [])
  })
}
uploadPost() {
  if(this.form.value.content != null) {
    if(this.form.value.file != null) {
      this.uploadFileAndPost(this.file, this.form.value.content)
        .subscribe(url => {
          console.log('Failed', url);
        })
    } else {
      this.postService.uploadPost({
        content: this.form.value.content
      }).then(rs => {
        this.image = null
        this.file = null
        this.formInit()
      })
    }
  }  
}

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
              this.image = null
              this.file = null
              this.formInit()
            })
          }
        });
      })
    )
}

imagePreview(e: any) {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0])
  reader.onload = (event) => {
    this.image = event.target?.result;
    this.file = e.target.files[0]
  }
}

removeImage() {
  this.image = null
  this.form.value.file = null
}

}