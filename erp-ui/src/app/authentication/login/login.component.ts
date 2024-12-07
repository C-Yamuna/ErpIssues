import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Loginmodel } from './shared/login.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../service/authentication.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { LoginService } from './shared/login.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{

  userDetails: any;
  loginResponse: any;
  userInfo: FormGroup;
  mobileLoginForm: FormGroup;
  emailLoginForm: FormGroup;
  returnUrl: any;
  cars: any[] = [];
  emailPattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$';
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
  mobilePattern = applicationConstants.MOBILE_PATTERN
  otpPattern = applicationConstants.NUMBER_OTP_PATTERN;
  msgs: any[] = [];
  loginmodel: Loginmodel = new Loginmodel();
  responseObject: Responsemodel = new Responsemodel();
  responsiveOptions: any;
  id: any;
  showPwd: Boolean = false;
  loginBtnDisabled: Boolean = true;
  // redirectUrl:any; 
  constructor(private commonService: CommonFunctionsService, private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private messageService: MessageService, private authenticationService: AuthenticationService,
    private encryptDecryptService: EncryptDecryptService, private commonFunctionsService: CommonFunctionsService, private commonComponent: CommonComponent, private translate: TranslateService,
    private loginService: LoginService) {
    this.userInfo = formBuilder.group({
      'userName': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      'password': new FormControl('', [Validators.required])
    });

    this.mobileLoginForm = formBuilder.group({
      'moblieNumber': new FormControl('', [Validators.required, Validators.pattern(this.mobilePattern)]),
      'otp': new FormControl('', [Validators.required, Validators.pattern(this.otpPattern)]),
    });

    this.emailLoginForm = formBuilder.group({
      'email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      'otp': new FormControl('', [Validators.required, Validators.pattern(this.otpPattern)]),
    });

  }

  ngOnInit() {
    this.route.queryParams.subscribe((value:any) => {
      this.id = value.id;
    });
    this.commonFunctionsService.setStorageValue('language', 'en');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'menu';
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    // this.redirectUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userInfo.controls;
  }
  login() {
    this.commonComponent.startSpinner();
    this.msgs = [];
    this.authenticationService.checkUserLogin(this.loginmodel).subscribe((data: any) => {
      this.loginResponse = data;
      this.commonComponent.stopSpinner();
      if (data.status == applicationConstants.STATUS_SUCCESS) {

        if (this.loginResponse.data != null && this.loginResponse.data.length > 0) {
          this.commonFunctionsService.setStorageValue(applicationConstants.userId, this.loginResponse.data[0].userId);
          // this.commonFunctionsService.setStorageValue(applicationConstants.roleId, this.loginResponse.data[0].roleId);
          this.commonFunctionsService.setStorageValue(applicationConstants.PACS_ID, 1);
          this.commonFunctionsService.setStorageValue(applicationConstants.BRANCH_ID, 1);
          this.commonFunctionsService.setStorageValue(applicationConstants.userName, this.loginResponse.data[0].userName);
          this.commonFunctionsService.setStorageValue(applicationConstants.roleName, this.loginResponse.data[0].designation);
          this.commonFunctionsService.setStorageValue('language', 'en');
          this.commonFunctionsService.setStorageValue(applicationConstants.ORG_DATE_FORMATE, 'd/MMM/yyyy')
          this.commonFunctionsService.setStorageValue(applicationConstants.SIGNED_IN, true);

          // if (this.loginResponse.data[0].userRoleName == 'Admin') {
          //   this.returnUrl = 'menu'
          // } else {
          //   this.returnUrl = 'menu';
          // }
          this.returnUrl = 'menu';
        }
        this.router.navigateByUrl(this.returnUrl);
        this.msgs.push({ severity: 'success', detail: data.statusMsg });
        setTimeout(() => {
        }, 1200);
      }
      else {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: data.statusMsg });
        this.router.navigate(['']);
      }
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      this.router.navigate(['']);
      setTimeout(() => {
        this.msgs = [];
      }, 1200);
    });

  }
  signUp() {
    this.router.navigateByUrl(this.returnUrl);
  }

  showPwds() {
    if (this.showPwd) {
      this.showPwd = false;
    } else {
      this.showPwd = true;
    }
  }

  sendMobileOTP() {
    this.commonComponent.startSpinner();
    this.loginService.sendMobileOTP(this.loginmodel.commMobile).subscribe((data: any) => {
      this.loginResponse = data;
      this.commonComponent.stopSpinner();
      if (data.status == applicationConstants.STATUS_SUCCESS) {
        this.loginBtnDisabled = false;
        this.msgs = [];
        this.msgs.push({ severity: 'success', detail: data.statusMsg });
      }
      else {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: data.statusMsg });
        this.router.navigate(['']);
      }
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      this.router.navigate(['']);

    });
  }

  sendEmailOTP() {
    this.commonComponent.startSpinner();
    this.loginService.sendEmialOTP(this.loginmodel.commEmail).subscribe((data: any) => {
      this.loginResponse = data;
      this.commonComponent.stopSpinner();
      if (data.status == applicationConstants.STATUS_SUCCESS) {
        this.msgs = [];
        this.loginBtnDisabled = false;
        this.msgs.push({ severity: 'success', detail: data.statusMsg });
      }
      else {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: data.statusMsg });
        this.router.navigate(['']);
      }
    }, error => {
      this.msgs = [];
      this.msgs.push({ severity: 'error', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST });
      this.router.navigate(['']);

    });
  }

  onTabChange(event:any) {
    this.loginBtnDisabled = true;
    this.userInfo.reset();
    this.mobileLoginForm.reset();
    this.emailLoginForm.reset();
  }
}
