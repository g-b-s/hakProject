import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class sharedService{
    private data:any;
    Uid:string|undefined;
    isActive = new EventEmitter<string>();
    setter(uid:string|undefined){
        this.Uid = uid;
    }
    getter():any{
        return this.Uid
    }
    setData(data: any) {
        this.data = data;
      }
      getData() {
        return this.data;
      }
}