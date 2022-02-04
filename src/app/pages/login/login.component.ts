import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

import { AuthFacade } from './auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoading: boolean;
  public isTryingAutomaticRefresh: boolean;

  private get userName(): string {
    return this.loginForm.controls.userName.value;
  }

  private get password(): string {
    return this.loginForm.controls.password.value;
  }

  private get rememberMe(): boolean {
    return this.loginForm.controls.rememberMe.value;
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private authFacade: AuthFacade, private messageService: NzMessageService) { }

  submitForm(): void {
    this.tryLogin();
  }

  ngOnInit(): void {
    this.createForm();
    this.checkAndTryAutomaticRefresh();
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [true]
    });
  }

  private tryLogin(): void {
    this.isLoading = true;
    this.authFacade.loginAsync({ userName: this.userName, password: this.password, rememberMe: this.rememberMe })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => this.router.navigate(['container']),
        (httpErrorResponse: HttpErrorResponse) => this.messageService.error(this.prepareLoginErrorMessage(httpErrorResponse)));
  }

  private checkAndTryAutomaticRefresh(): void {
    if (!this.authFacade.allowAutomaticRefresh) { return; }
    
    this.isTryingAutomaticRefresh = true;
    this.authFacade.tryLoginWithRefreshTokenAsync()
      .pipe(finalize(() => this.isTryingAutomaticRefresh = false))
      .subscribe(() => this.router.navigate(['container']));
  }

  private prepareLoginErrorMessage(httpErrorResponse: HttpErrorResponse): string {
    if (!httpErrorResponse.error) { return ''; }
    return (httpErrorResponse.error as any[])
      .map(error => error.message).join('');
  }
}
