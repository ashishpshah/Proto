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
    this.autoCloseAlert(title, message, type)
  }

  commonAlert(title : string ,data: any, url : string): any{
    if (data != null && data != "e" && data != "r" && data != "o") {
      let splitData = data.toString().split("|");
      this.msgType = splitData.length > 0 ? splitData[0] :'E';
      this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

      if (this.msgType == 'S') {
        this.autoCloseAlert(title, this.message, 'success')
        if (url != null && url != '' && url != "") {
          this._router.navigate([url]);
        }

      }else {
        this.autoCloseAlert('Error', this.message, 'error')
      }

    }else{
      this.autoCloseAlert('Error', 'Something went wrong!', 'error')
    }
  }

  commonAlerts(title : string ,data: any, url : string,currentUrl : string): any{
    if (data != null && data != "e" && data != "r" && data != "o") {
      let splitData = data.toString().split("|");
      this.msgType = splitData.length > 0 ? splitData[0] :'E';
      this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

      if (this.msgType == 'S') {
        // Swal.fire(title, this.message, 'success')
        this.autoCloseAlert(title, this.message, 'success')
        // Swal.fire({
        //   title: title,
        //   text: this.message,
        //   icon: 'success',
        //   timer: 2000,
        //   buttons: false,
        //   showCancelButton: false,
        //   showConfirmButton: false
        //   });
        //   // function () {
        //   //    location.reload(true);
        //   //    tr.hide();
        //   // };


        if (url != null && url != '' && url != "") {
          this._router.navigateByUrl(currentUrl, { skipLocationChange: true }).then(() => {
            this._router.navigate([url]);
        });
          // this._router.navigate([url]);
        }

      }
      else if (this.msgType == 'A') {
        // Swal.fire(title, this.message, 'success')
        this.autoCloseAlert(title, this.message, 'error')
        // Swal.fire({
        //   title: title,
        //   text: this.message,
        //   icon: 'success',
        //   timer: 2000,
        //   buttons: false,
        //   showCancelButton: false,
        //   showConfirmButton: false
        //   });
        //   // function () {
        //   //    location.reload(true);
        //   //    tr.hide();
        //   // };


        if (url != null && url != '' && url != "") {
          this._router.navigateByUrl(currentUrl, { skipLocationChange: true }).then(() => {
            this._router.navigate([url]);
        });
          // this._router.navigate([url]);
        }

      }else {
        this.autoCloseAlert('Error', this.message, 'error')
      }

    }else{
      this.autoCloseAlert('Error', 'Something went wrong!', 'error')
    }
  }

  activeInactiveAlert(title : string ,data: any) {
    if (data != null && data != "e" && data != "r" && data != "o") {
      debugger;
      let splitData = data.toString().split("|");
      this.msgType = splitData.length > 0 ? splitData[0] :'E';
      this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

      if (this.msgType == 'S') {
        this.autoCloseAlert(title, this.message, 'success')


      }else {
        this.autoCloseAlert(title, this.message, 'error')
      }

    }else{
      this.autoCloseAlert('Error', 'Something went wrong!', 'error')
    }
    return this.msgType;
  }

  autoCloseAlert(title, message, type){
    Swal.fire({
      position: 'top',
      title: title,
      text: message,
      icon: type,
      timer: 1500,
      buttons: false,
      showCancelButton: false,
      showConfirmButton: false
      });
  }

}
