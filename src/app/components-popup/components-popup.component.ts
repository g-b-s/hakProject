import { Component, Inject, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { signupService } from 'src/Service/Signup.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-components-popup',
  templateUrl: './components-popup.component.html',
  styleUrls: ['./components-popup.component.css']
})
export class ComponentsPopupComponent implements OnInit {
  working : boolean = false;
  path:any = "";
  downloadURL:any = "";
  uploadedBy:any = "";
  value:any={};

  constructor(private service:signupService, private storage:Storage) { }

  editcomponent = new FormGroup({
    name : new FormControl(''),
    description: new FormControl(''),
    cost: new FormControl(''),
    componentImage: new FormControl(''),
    working: new FormControl(''),
  })

  ngOnInit(): void {
    
  }

  onImageSelected(event:any){
    this.path = event.target.files[0];
    const storageData = ref(this.storage,'Component Images/'+this.path.name);
    const uploadTask = uploadBytesResumable(storageData,this.path);
    uploadTask.on('state_changed',
    /*(snapshot)=>{ 
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
      console.log('upload is' + progress + '% done');
    },*/
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("before:-",downloadURL)
        this.downloadURL = downloadURL;
      });
    })
  }

  onSubmit(){
    const myId = uuid();
    this.uploadedBy = localStorage.getItem('uid');
    if(this.editcomponent.value.working == "true"){
      this.working = true;
   }
    let params = {
    id:myId,
    name: this.editcomponent.value.name,
    description: this.editcomponent.value.description ,
    cost: this.editcomponent.value.cost ,
    componentImage: this.downloadURL,
    uploadedBy: this.uploadedBy,
    working: this.working
    }
    console.log(params);
    
    this.service.storeInFirebase1('components/', params,myId);
  }
}
