export class SaoProductDefinition {
  id: any;

  name: any;

  description: any;

  status: any;

  gestationPeriod: any;

  interestCalculationType: any;

  effectiveStartDate: any;

  effectiveStartDateVal: any;

  endDate: any;

  eligibleMInAmount: any;

  eligibleMaxAmount: any;

  minLoanPeriod: any;

  maxLoanPeriod: any;

  demandAlertDays: any;

  defaulterAlertDays: any;

  maxLoanAccountsAllowed: any;

  loanLinkedshareCapitalApplicable: any;

  noOfGuarantorsRequired: any;

  isInsuranceAppicable: any;

  minDaysForRenewel: any;

  pacsId: any;

  pacsCode: any;

  branchId: any;

  isNpaExceptional: any;

  interestRateType: any;

  statusName: any;

  interestCalculationTypeName: any;

  nomineeRequired: any;

  saoProductId: any;

  saoProductName: any;

  saoInterestPolicyConfigDtoList: any;

  saoLoanLinkedSharecapitalConfigList: any[] = [];

  saoRequiredDocumentsConfigDTOList: any[] = [];

  saoProductChargesConfigDTOList: any[] = [];

  saoApportionConfigDTOList: any[] = [];

  saoProdCollateralsConfigList: any[] = [];

  saoProdPurPoseConfgList: any[] = [];

  interestPostingFrequency: any;

  saoGLHeadMappingDTOList: any[] = [];

  interestPostingFrequencyName: any;

  ledgerFolioNumber: any;

  resolutionNumber: any;
}
export class SaoCollateralConfig {

   id?: any;

  saoProductId?: any;

  collateralType?: any;

  status?: any;

  effectiveStartDate?: any;

  endDate?: any;

  statusName?: any;

  collateralTypeName?: any;
  
  saoProductName?: any;
}