import {ChangeDetectorRef, OnDestroy, Component, AfterViewInit} from '@angular/core';

import { distinctUntilChanged, delay } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {

  private islogged: boolean = localStorage.getItem('currentUser')?true:false;


  constructor(private authService : AuthenticationService) {
  }

  ngAfterViewInit() {
   
    this.authService.isLoggedIn.pipe(distinctUntilChanged(), delay(0)).subscribe(
     res=> {
      this.islogged = res;
      console.log(res);
      }
    ); 
  }
  
 
  
  fillerNav = Array.from({length: 4}, (_, i) => `Nav Item ${i + 1}`);



  


}
