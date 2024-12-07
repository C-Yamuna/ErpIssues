import { Component, EventEmitter, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/authentication/service/authentication.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { MainMenuService } from './shared/main-menu.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { environment } from 'src/environments/environment';
import { FileUploadModel } from './shared/file-upload-model.model';
import { FileUpload } from 'primeng/fileupload';
import { savingsbanktransactionconstant } from 'src/app/transcations/savings-bank-transcation/savingsbank-transaction-constant';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainmenuComponent implements OnInit {

  items: any[] = [];
  selectedIndex: number = 0;
  menus: any;
  roleName: any;
  userName: any;
  visibleSidebar: boolean = false;
  societyCode: any;
  societyName: any;
  issuesList: any[] = [];
  responseModel: Responsemodel = new Responsemodel();
  msgs: any[] = [];
  // issuesModel: Isssues = new Isssues();
  filesList: any[] = [];
  files: any;
  fileData: any;
  societyId: any;
  userId: any;
  // @ViewChild('screen', { static: true }) screen: any;
  file: any;
  // actionStep: string = "";
  issuePacsId: any;
  uploadFilesList: any[] = [];
  uploadFileData: any;
  uploadFile: any;
  image: any;
  imageURL: any;
  screenshot: boolean = false;
  displayAddIssue: boolean = false;
  // pacs: PacsDetails = new PacsDetails();
  // pacsScreenCaptureModel: PacsScreenCaptureModel = new PacsScreenCaptureModel();
  pacsName: any;
  lastDot = /\.(?=[^\.]+$)/;
  translate: MenuItem[] = [];
  Translates: any[] = [];
  languageLabel: any;
  translateLang;
  TranslatesResponsive = [];
  profilesList: any[] = [];
  userProfile: any;
  menuItems: any[] = [];
  defaultMenu: any;
  returnUrl: any;
  isAdminRole: boolean = false;
  itemsHeader:any;
  tooltipItems: MenuItem[] =[];
  isDarkTheme = false;
  isGreenTheme = false;
  position: string = 'center';
  display: boolean = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService, private formBuilder: FormBuilder,private confirmationService: ConfirmationService,
    private _translate: TranslateService, private commonComponent: CommonComponent,
    private commonService: CommonFunctionsService, private mainmenuService: MainMenuService,
    private commonHttpService: CommonHttpService,
    private route: ActivatedRoute,private messageService: MessageService,private renderer: Renderer2) {

    this._translate.setDefaultLang(this.commonService.getStorageValue('language'));
    this._translate.use(this.commonService.getStorageValue('language'));

    if (this.commonService.getStorageValue('language') == 'en') {
      this.translateLang = 'en';
      this.commonService.languageSelection('en');
    } else if (this.commonService.getStorageValue('language') == 'te') {
      this.translateLang = 'te';
      this.commonService.languageSelection('te');
    } else {
      this.translateLang = 'hi';
      this.commonService.languageSelection('hi');
    }

  }

  ngOnInit() {
    this.tooltipItems = [
      {
          tooltipOptions: {
              tooltipLabel: 'Add'
          },
          icon: 'pi pi-pencil',
          command: () => {
              this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          tooltipOptions: {
              tooltipLabel: 'Update'
          },
          icon: 'pi pi-refresh',
          command: () => {
              this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          tooltipOptions: {
              tooltipLabel: 'Delete'
          },
          icon: 'pi pi-trash',
          command: () => {
              this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
          tooltipOptions: {
              tooltipLabel: 'Upload'
          },
          icon: 'pi pi-upload'
      },
      {
          tooltipOptions: {
              tooltipLabel: 'Angular Website'
          },
          icon: 'pi pi-external-link',
          url: 'http://angular.io'
      }
  ];

    this.commonService.data.subscribe((res: any) => {
      if (res) {
        this._translate.use(res);
      } else {
        this._translate.use(this.commonService.getStorageValue('language'));
      }
    });

    this.Translates = [
      { label: 'English', value: 'en', icon: 'fa fa-globe' },
      { label: 'తెలుగు', value: 'te', icon: 'fa fa-globe' },
      { label: 'हिंदी', value: 'hi', icon: 'fa fa-globe' }
    ];
    // icon: 'fa fa-globe'

    this.roleName = this.commonService.getStorageValue(applicationConstants.roleName);
    this.userName = this.commonService.getStorageValue(applicationConstants.userName);
    this.userId = this.commonService.getStorageValue(applicationConstants.userId);
    this.profilesList = [
      { label: this.userName, value: 'userName', icon: 'fa fa-envelope' },
      { label: 'Profile', value: 'profile', icon: 'fa fa-user' },
      { label: 'Settings', value: 'settings', icon: 'fa fa-cog' },
      { label: 'Logout', value: 'logout', icon: 'fa fa-sign-out' },
      { label: 'Product Definition', value: 'productDefinition',icon: 'fa fa-product-hunt' }
    ]
    this.itemsHeader = [
      {
        styleClass:'responsive-notification',
        icon:'fa fa-bell',
        badge: '5'
     },
      {
        styleClass:'responsive-laguage-dropdown',
      icon:'fa fa-globe',
      items: [
       
        { label: 'English', command: (event: Event) => { this.languageChange(event); } },
        { label: 'తెలుగు', command: (event: Event) => { this.languageChange(event); } },
        { label: 'हिंदी', command: (event: Event) => { this.languageChange(event); } },
       
      ]
     },
     {
      
      styleClass:'responsive-profile-dropdown',
      icon:'fa fa-envelope',
      items: [
       
          { label: this.userName, value: 'userName', icon: 'fa fa-envelope' ,command: () => {  this.profileChange('userName')  } },
          { label: 'Profile', value: 'profile', icon: 'fa fa-user',command: () => {  this.profileChange('profile')  } },
          { label: 'Settings', value: 'settings', icon: 'fa fa-cog' ,command: () => {  this.profileChange('settings')  }},
          { label: 'Change password', value: 'changePassword', icon: 'fa fa-key',command: () => {  this.profileChange('changePassword')  } },
          { label: 'Logout', value: 'logout', icon: 'fa fa-sign-out',command: () => {  this.profileChange('logout')  } },
          { label: 'Product Definition', value: 'productDefinition', icon: 'fa fa-product-hunt',command: () => {  this.profileChange('productDefinition')  } }
       
      ]
    }
    ]

    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    this.returnUrl = snapshot.url || 'menu';

    this.getItems();

    if(this.roleName == "Admin"){
      this.isAdminRole = applicationConstants.TRUE;
    } else {
      this.isAdminRole = applicationConstants.FALSE;
    }
  }

  getItems() {
    let url = environment.rbac +
      applicationConstants.GET_DYNAMIC_MENUS
    this.commonHttpService.getAll(url).subscribe((response: any) => {
      if (response != null && response.data != null && response.data != undefined && response.data.length>0 && response.data[0]['level0'] && response.data[0].level0.length > 0) {
        this.items = [];
        response.data[0].level0.forEach((x:any) => {
          let level2Menus: any[] = [];
          x.level1.forEach((y:any) => {
            y.level2.forEach((z:any) => {
              let level2Menu = {
                label: z.featureName,
                icon: z.icon,
                routerLink: z.featurePath.toLowerCase(),
                command: (event: Event) => { this.clickmenu(event); },
              }
              level2Menus.push(level2Menu);
            })
          })
          let level0Menus = {
            label: x.menuName,
            items: level2Menus,
            icon: "fa fa-address-book-o",
          }
          this.items.push(level0Menus);
        })
      }
    })
  }

  // getItems() {
  //   let url = environment.rbac +
  //     applicationConstants.GET_DYNAMIC_MENUS
  //   this.commonHttpService.getAll(url).subscribe((response: any) => {
  //     if (response != null && response.data != null && response.data[0]['level0'] && response.data[0].level0.length > 0) {
  //       this.items = [];
  //       let landScreen = true;
  //       response.data[0].level0.forEach((x: { level1: any[]; }) => {
  //         x.level1.forEach((y: { level2: any[]; menuName: any; iconPath: any; }) => {
  //           let level2Menus: any[] = [];
  //           let count = 0;
  //           y.level2.forEach((z: { featureName: any; iconPath: any; featurePath: string; }) => {
  //             count++;
  //             let level2Menu = {
  //               label: z.featureName,
  //               icon: z.iconPath,
  //               routerLink: z.featurePath.toLowerCase(),
  //               command: (event: Event) => { this.clickmenu(event); },
  //             }
  //             if (count == 1 && landScreen == true) {
  //               landScreen = false;
  //               this.defaultMenu = z.featurePath.toLowerCase();
  //             }
  //             level2Menus.push(level2Menu);
  //           })
  //           let level1Menus = {
  //             label: y.menuName,
  //             icon: y.iconPath,
  //             items: level2Menus,
  //           }
  //           this.items.push(level1Menus);
  //         })
  //       })
  //       if (this.defaultMenu != undefined) {
  //         if (this.returnUrl == '/menu')
  //           this.router.navigateByUrl(this.defaultMenu);
  //         else
  //           this.router.navigateByUrl(this.returnUrl);
  //       }
  //     }
  //   })
  // }

  // getItems() {
  //   let url = environment.rbac +
  //     applicationConstants.GET_DYNAMIC_MENUS
  //   this.commonHttpService.getAll(url).subscribe((response: any) => {
  //     if (response != null && response.data != null && response.data[0]['level0'] && response.data[0].level0.length > 0) {
  //       response.data[0].level0.forEach(x => {
  //         x.level1.forEach(y => {

  //           this.items = [];
  //           let level2Menus: any[] = [];

  //           if (this.roleName == "Admin") {

  //             this.router.navigate([ConfigurationRouting.USERS]);

  //             this.menuItems = [
  //               { router: 'users', labelName: "MEMBERSHIP.USERS" },
  //               { router: 'country', labelName: "MEMBERSHIP.COUNTRY" },
  //               { router: 'state', labelName: "MEMBERSHIP.STATE" },
  //               { router: 'district', labelName: "MEMBERSHIP.DISTRICT" },
  //               { router: 'sub_district', labelName: "MEMBERSHIP.SUB_DISTRICT" },
  //               { router: 'covered_village', labelName: "MEMBERSHIP.COVERED_VILLAGE" },
  //               { router: 'common_status', labelName: "MEMBERSHIP.COMMON_STATUS" },
  //               { router: 'member_type', labelName: "MEMBERSHIP.MEMBERTYPE" },
  //               { router: 'gender_types', labelName: "MEMBERSHIP.GENDER_TYPES" },
  //               { router: 'caste', labelName: "MEMBERSHIP.CASTE" },
  //               { router: 'qualification', labelName: "MEMBERSHIP.QUALIFICATION" },
  //               { router: 'relationship_type', labelName: "MEMBERSHIP.RELATIONSHIP_TYPE" },
  //               { router: 'occupation_type', labelName: "MEMBERSHIP.OCCUPATION_TYPE" },
  //               { router: 'address_type', labelName: "MEMBERSHIP.ADDRESS_TYPE" },
  //               { router: 'operator_type', labelName: "MEMBERSHIP.OPERATOR_TYPE" },
  //               { router: 'kyc_types', labelName: "MEMBERSHIP.KYC_TYPES" },
  //               { router: 'uom', labelName: "MEMBERSHIP.UOM" },
  //               { router: 'uom_calculation', labelName: "MEMBERSHIP.UOM_CALCULATION" },
  //               { router: 'soil_type', labelName: "MEMBERSHIP.SOIL_TYPE" },
  //               { router: 'water_source_type', labelName: "MEMBERSHIP.WATER_SOURCE_TYPE" },
  //               { router: 'account_types', labelName: "MEMBERSHIP.ACCOUNT_TYPES" },
  //               { router: 'farmer_types', labelName: "MEMBERSHIP.FARMER_TYPES" },
  //               { router: 'group_types', labelName: "MEMBERSHIP.GROUP_TYPES" },
  //               { router: 'asset_types', labelName: "MEMBERSHIP.ASSET_TYPES" },
  //             ];

  //           } else if (this.roleName == "CEO") {

  //             this.router.navigate([MEMBERSHIP_TRANSACTION_CONSTANTS.A_CLASS_MEMBERSHIP_BY_CEO]);

  //             this.menuItems = [
  //               { router: 'a_class_membership_by_ceo', labelName: "MEMBERSHIP.A_CLASS_MEMBERSHIP_BY_CEO" },
  //               { router: 'member_360_view', labelName: "MEMBERSHIP.MEMBER_360_VIEW" },
  //             ];

  //           } else if (this.roleName == "Accountant") {

  //             this.router.navigate([MEMBERSHIP_TRANSACTION_CONSTANTS.ADD_MEMBER]);

  //             this.menuItems = [
  //               { router: 'add_member_details', labelName: "MEMBERSHIP.ADD_MEMBER" },
  //               { router: 'a_class_membership_by_ceo', labelName: "MEMBERSHIP.A_CLASS_MEMBERSHIP_BY_CEO" },
  //               { router: 'member_360_view', labelName: "MEMBERSHIP.MEMBER_360_VIEW" },
  //             ];

  //           } else if (this.roleName == "Cashier") {

  //             this.router.navigate([MEMBERSHIP_TRANSACTION_CONSTANTS.A_CLASS_MEMBERSHIP_BY_CEO]);

  //             this.menuItems = [
  //               { router: 'a_class_membership_by_ceo', labelName: "MEMBERSHIP.A_CLASS_MEMBERSHIP_BY_CEO" },
  //               { router: 'member_360_view', labelName: "MEMBERSHIP.MEMBER_360_VIEW" },
  //             ];

  //           }

  //           if (undefined != this.items) {
  //             this.menuItems.forEach(z => {
  //               let level2Menu = {
  //                 label: z.labelName,
  //                 icon: z.icon,
  //                 routerLink: z.router.toLowerCase(),
  //                 command: (event: Event) => { this.clickmenu(event); },
  //               }
  //               level2Menus.push(level2Menu);
  //             });
  //           }

  //           let level0Menus = {
  //             label: y.menuName,
  //             items: level2Menus,
  //           }
  //           this.items.push(level0Menus);
  //         })
  //       })
  //     }
  //   })
  // }

  clickmenu(event: any) {
    if (this.router.url != event.item.routerLink) {
      this.commonComponent.startSpinner();
    }
  }

  profileChange(profileValue: string) {
    if (profileValue === 'logout') {
      this.logOut();
    }
    else if(profileValue === 'productDefinition' ){
        this.productDefinition();
    }
  }

  onSearchClick() { }
  toggleTopMenu(event: any) { }

  languageChange(lang: any) {
    if (lang === 'en') {
      this.commonService.languageSelection('en');
      this.translateLang = 'en';
      this.commonService.setStorageValue('language', 'en');
      this._translate.use('en');
    } else if (lang === 'hi') {
      this.translateLang = 'hi';
      this.commonService.languageSelection('hi');
      this.commonService.setStorageValue('language', 'hi');
      this._translate.use('hi');
    }
    else {
      this.translateLang = 'te';
      this.commonService.languageSelection('te');
      this.commonService.setStorageValue('language', 'te');
      this._translate.use('te');
    }
  }


  select(index: number) {
    this.selectedIndex = index;
    this.hideBar();

  }

  defultNavigation() {
    this.items.filter((each, index) => {
      if (this.router.url.includes('/' + each.url)) {
        this.selectedIndex = index;
        return each;
      }
    });
  }

  hideBar() {
    this.visibleSidebar = false;
  }

  showBar() {
    this.visibleSidebar = true;
  }

  logOut() {
    this.authenticationService.logout();
    sessionStorage.clear();
    this.commonService.setStorageValue('language', 'en');
    this.router.navigate(['']);
  }

  productDefinition(){
    this.router.navigate([savingsbanktransactionconstant.SB_PRODUCT_DEFINITION]);
  }

  generateName(): string {
    const date: number = new Date().valueOf();
    let text: string = "";
    const possibleText: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
        Math.floor(Math.random() * possibleText.length)
      );
    }
    // Replace extension according to your media type like this
    return 'Issue_' + date + ".png";
  }


  getPacsDetails() {
    // this.commonComponent.startSpinner();
    // this.mainmenuService.getPacsDetailsById(this.societyId).subscribe((data: any) => {
    //   this.responseModel = data;
    //   if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
    //     this.pacs = this.responseModel.data[0];
    //     this.issuePacsId = this.pacs.id;
    //     this.pacsName = this.pacs.name;
    //     this.commonComponent.stopSpinner();
    //   } else {
    //     this.commonComponent.stopSpinner();
    //     this.msgs = [];
    //     this.msgs = [{ severity: "error", detail: data.statusMsg });
    //   }
    // }, error => {
    //   this.commonComponent.stopSpinner();
    //   this.msgs = [];
    //   this.msgs = [{ severity: "error", summary: 'Failed', detail: this.commonComponent.errorHandling(error) });
    //   this.commonComponent.stopSpinner();
    // });
  }
  toggleTheme(color:any) {
    this.removeTheme();
    this.isDarkTheme = !this.isDarkTheme;
    if (color == 'dark') {
      this.renderer.addClass(document.body, 'dark-theme');
    } else if(color == 'green') {
      this.renderer.addClass(document.body, 'green-theme');
    }  else {
      this.renderer.addClass(document.body, 'white-theme');
      
    }


  }
  removeTheme() {
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'green-theme');
    this.renderer.removeClass(document.body, 'white-theme');
}



showTheam() {
  this.display = true;
}
}
