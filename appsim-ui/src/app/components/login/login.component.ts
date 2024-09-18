import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonHttpService } from 'src/app/services/common-http.service';
import { CommonService } from 'src/app/services/common.service';
import { LoginReqResp } from 'src/app/models/login-req-resp';
import { BaseReqResp } from 'src/app/models/base-req-resp';
import { UserLocalStorage } from 'src/app/models/user-local-storage';
import { CommonLocalStorageService } from 'src/app/services/common-local-storage.service';
import { NavItemsService } from 'src/app/services/nav-items.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private commonSvc: CommonService, private commonHttpSvc: CommonHttpService, private commonLSSvc: CommonLocalStorageService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    this.commonHttpSvc.loginUser(this.loginForm.value).subscribe({next: (resp: LoginReqResp) => {
      this.commonLSSvc.addUser(resp.username);
      if(resp.username === "admin_asuser")
        {
          this.router.navigate(['/admin-home']);
        }
        else{
          this.router.navigate(['/']);
        }
    }, error: (error: HttpErrorResponse) => {
      this.commonSvc.handleError(error);
    }});
  }

}
