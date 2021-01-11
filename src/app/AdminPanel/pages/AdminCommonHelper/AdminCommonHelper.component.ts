import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-AdminCommonHelper',
  templateUrl: './AdminCommonHelper.component.html',
  styleUrls: ['./AdminCommonHelper.component.scss']
})
export class AdminCommonHelperComponent implements OnInit {

  userId : string = localStorage.getItem('userId');
  msgType : string = '';
  message : string = '';
  value : any;
  constructor(private _router: Router) { }

  ngOnInit() {

  }

  simpleAlert(title : string, message : string , type : string){
    Swal.fire(title, message, type)
  }

  commonAlert(title : string ,data: any, url : string): any{
    if (data != null && data != "e" && data != "r" && data != "o") {
      let splitData = data.toString().split("|");
      this.msgType = splitData.length > 0 ? splitData[0] :'E';
      this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

      if (this.msgType == 'S') {
        Swal.fire(title, this.message, 'success')
        if (url != null && url != '' && url != "") {
          this._router.navigate([url]);
        }

      }else {
        Swal.fire('Error', this.message, 'error')
      }

    }else{
      Swal.fire('Error', 'Something went wrong!', 'error')
    }
  }

  activeInactiveAlert(title : string ,data: any) {
    if (data != null && data != "e" && data != "r" && data != "o") {
      debugger;
      let splitData = data.toString().split("|");
      this.msgType = splitData.length > 0 ? splitData[0] :'E';
      this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

      if (this.msgType == 'S') {
        this.commonAlert(title, this.message, 'success')

      }else {
        this.commonAlert('Error', this.message, 'error')
      }

    }else{
      this.commonAlert('Error', 'Something went wrong!', 'error')
    }
    return this.msgType;
  }

}
