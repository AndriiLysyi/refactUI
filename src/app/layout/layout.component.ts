import {ChangeDetectorRef, OnDestroy, Component, AfterViewInit} from '@angular/core';

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
    

    this.authService.isLoggedIn.subscribe( state=> {
      this.islogged = state;
    }
      
  }
  
 
  
  fillerNav = Array.from({length: 4}, (_, i) => `Nav Item ${i + 1}`);

    private _mobileQueryListener: () => void;

  


}
