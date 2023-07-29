import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sharedService } from 'src/Service/SharedService.service';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent {
  receivedData: any;
  constructor(private route:ActivatedRoute, private shareService:sharedService){}

  ngOnInit(){    
    this.receivedData = this.shareService.getData();
    console.log("Inside of Read More Data:- "+this.receivedData);
  }
  openImage(element:any) {
    // var imageSrc = element.src;
    window.open(element);
  }
}
