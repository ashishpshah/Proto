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
  currentYear : any = (new Date()).getFullYear();
  msgType : string = '';
  message : string = '';
  value : any;
  commonWarningMessage : string = "* indicates a required field";
  deleteTooltip : string = "click here to delete";
  restoreTooltip : string = "click here to restore";
  clearTooltip : string = "click here to clear";
  required : string = "required";
  currency : string = "kr. ";
  contentTypeImage : string = 'image/png';
  imageNotAvail : string = "Image not available";
  downloadImageTooltip : string = 'Download Image';
  deleteTitle : string = "Do you want to delete?";
  deleteText : string = "You won't be able to revert this!";
  noItemsFoundMsg : string = "No items found";
  validEmailMsg :string = 'Enter valid email';
  constructor(private _router: Router) { }

  ngOnInit() {

  }

  convertBase64ToBlobData(base64Data: string, contentType: string, sliceSize=512) {

    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  DownloadImage(base64content :any,filename:any,contentType:any){
  const blobData = this.convertBase64ToBlobData(base64content,contentType);
  if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
    window.navigator.msSaveOrOpenBlob(blobData, filename);
  } else { // chrome
    const blob = new Blob([blobData], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    // window.open(url);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }
}

getPreNextYearList(){
  let startyr = new Date().getFullYear() -1;
  let range :any[]= [];
  for (var i = 0; i < 3; i++) {
    range.push({
      label: startyr + i,
      value: parseInt(String(startyr + i))
    });
  }
  return range;
}
getMonthList(){
  var  months = [{id:1,name:"January"}, {id:2,name:"February"},{id:3,name:"March"},{id:4,name:"April"},{id:5,name:"May"},{id:6,name:"June"},
                 {id:7,name:"July"},{id:8,name:"August"},{id:9,name:"September"},{id:10,name:"October"},{id:11,name:"November"},{id:12,name:"December"},];

  return months;
}

validateEmail(email) {
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
 }

  GenerateCaptchaNumber(length) {
    let result           = '';
    let characters       = '0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  GenerateCaptchaString(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
        if (url != null && url != '' && url != "") {
          this._router.navigateByUrl(currentUrl, { skipLocationChange: true }).then(() => {
            this._router.navigate([url]);
        });
        }

      }
      else if (this.msgType == 'A') {
        this.autoCloseAlert(title, this.message, 'error')
        if (url != null && url != '' && url != "") {
          this._router.navigateByUrl(currentUrl, { skipLocationChange: true }).then(() => {
            this._router.navigate([url]);
        });

        }

      }else {
        this.autoCloseAlert('Error', this.message, 'error')
      }

    }else{
      this.autoCloseAlert('Error', 'Something went wrong!', 'error')
    }
  }

  commonAlertReturnError(title : string ,data: any, url : string,currentUrl : string): any{
    if (data != null && data != "e" && data != "r" && data != "o") {
      let splitData = data.toString().split("|");
      this.msgType = splitData.length > 0 ? splitData[0] :'E';
      this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

      if (this.msgType == 'S') {
        // Swal.fire(title, this.message, 'success')
        this.autoCloseAlert(title, this.message, 'success')
        if (url != null && url != '' && url != "") {
          this._router.navigateByUrl(currentUrl, { skipLocationChange: true }).then(() => {
            this._router.navigate([url]);
        });
        }
        //return '';
      }
      else if (this.msgType == 'A') {
        //return this.message;
        this.autoCloseAlert(title, this.message, 'error')
        if (url != null && url != '' && url != "") {
          this._router.navigateByUrl(currentUrl, { skipLocationChange: true }).then(() => {
            this._router.navigate([url]);
        });

        }

      }else {
        return this.message;
        //this.autoCloseAlert('Error', this.message, 'error')
      }

    }else{
      this.autoCloseAlert('Error', 'Something went wrong!', 'error')
    }
  }

  commonAlertWithoutRedirect(title : string ,data: any, url : string,currentUrl : string): any{
    if (data != null && data != "e" && data != "r" && data != "o") {
      let splitData = data.toString().split("|");
      this.msgType = splitData.length > 0 ? splitData[0] :'E';
      this.message = splitData.length > 1 ? splitData[1] :'Something went wrong!';

      if (this.msgType == 'S') {
        this.autoCloseAlert(title, this.message, 'success')
        return '';
      }
      else if (this.msgType == 'A') {
        this.autoCloseAlert(title, this.message, 'error')

      }else {
        return this.message;
      }

    }else{
      this.autoCloseAlert('Error', 'Something went wrong!', 'error')
    }
  }

  activeInactiveAlert(title : string ,data: any) {
    if (data != null && data != "e" && data != "r" && data != "o") {

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
