import { Messaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class messagingService{
    currMessaging = new BehaviorSubject<any>(null); 
    constructor(private angularMessage:Messaging){

    }
}