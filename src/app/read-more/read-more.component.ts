import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sharedService } from 'src/Service/SharedService.service';
import { signupService } from 'src/Service/Signup.service';
import emailjs from '@emailjs/browser'

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent {
  receivedData: any;
  userName:any;
  userContact:any;
  constructor(private route:ActivatedRoute, private shareService:sharedService, private service:signupService){}

  ngOnInit(){    
    this.receivedData = this.shareService.getData();
    console.log("Inside of Read More Data:- "+this.receivedData);
    let uid = localStorage.getItem('uid');
    this.service.getUserById(uid).subscribe((res:any)=>{
    this.userName = res.name;
    this.userContact = res.number
    })
  }
  openImage(element:any) {
    // var imageSrc = element.src;
    window.open(element);
  }

  async buy(projectName:any, projectDescription:any, projectCost:any, projectID:any){
    console.log(this.userName);
    console.log(this.userContact);
    console.log(projectCost);
    emailjs.init('-DGPDJAWbZsQSBmCs');
    let responce = await emailjs.send("service_2hijzvq","template_u4uh5z5",{
      from_name: "GBS team",
      booking_type: "Project",
      user_name: this.userName,
      user_contact: this.userContact,
      reply_to: "ashrotri7@gmail.com",
      reply_to_bcc: "abhijeetgotad@gmail.com",
      project_id: projectID,
      project_name: projectName,
      project_description: projectDescription,
      project_cost: projectCost,
      });
    alert('message has been sent.')
  }
}
