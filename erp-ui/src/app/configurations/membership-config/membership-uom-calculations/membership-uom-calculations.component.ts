import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipConfigConstants } from '../membership-config-constants';
import { LandUomCalculations } from './shared/land-uom-calculations.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { UomCalculationsService } from './shared/uom-calculations.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-membership-uom-calculations',
  templateUrl: './membership-uom-calculations.component.html',
  styleUrls: ['./membership-uom-calculations.component.css']
})
export class MembershipUomCalculationsComponent {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  uomCalculationsModel: LandUomCalculations = new LandUomCalculations();
  responseModel!: Responsemodel;
  statusList: any[] = [];
  displayDialog: boolean = false;
  deleteId: any;


  constructor(private router: Router,
    private uomCalculationsService: UomCalculationsService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) { }

  ngOnInit() {
    this.columns = [
      { field: 'sourceUomName', header: 'MEMBERSHIPCONFIG.SOURCE_UOM' },
      { field: 'sourceNumberOfUnits', header: 'MEMBERSHIPCONFIG.SOURCE_NO' },
      { field: 'destinationUomName', header: 'MEMBERSHIPCONFIG.DESTINATION_UOM' },
      { field: 'destinationNumberOfUnits', header: 'MEMBERSHIPCONFIG.DESTINATION_NO' },
      { field: 'equation', header: 'MEMBERSHIPCONFIG.EQUATION' },
      { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' },
    ];
    this.getAll();
  }
  getAll() {
    this.commonComponent.startSpinner();
    this.uomCalculationsService.getAllUomCalculations().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

  addData() {
    this.router.navigate([MembershipConfigConstants.ADD_UOM_CALCULATION]);
  }

  editData(rowData: any) {
    this.router.navigate([MembershipConfigConstants.ADD_UOM_CALCULATION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteUomCalculation(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  delete() {
    this.commonComponent.startSpinner();
    this.uomCalculationsService.deleteUomCalculations(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.displayDialog = false;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAll();
        }, 2000);
      } else {
        this.displayDialog = false;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    });
  }
  cancel() {
    this.displayDialog = false;
  }

}
