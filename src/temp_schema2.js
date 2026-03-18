// models/index.js
const mongoose = require('mongoose');

// ==================== UTILITY FUNCTIONS ====================
const byteaSchema = {
  type: Buffer,
  required: false
};

const decimalToNumber = {
  type: Number,
  get: v => parseFloat(v),
  set: v => v.toString()
};

// ==================== STOMASTER SCHEMAS ====================

// TBL_CUSTOMER_PAYMENT_MODE_MASTER
const customerPaymentModeMasterSchema = new mongoose.Schema({
  PAYMENT_MODE_ID: { type: Number, unique: true, default: 1 },
  PAYMENT_MODE_NAME: { type: String, maxlength: 50 },
  SHORT_CODE: { type: String, maxlength: 20 },
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: { type: Date },
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: { type: Date },
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_PAYMENT_MODE_MASTER' });

// TBL_BILLING_LOCATION_MASTER
const billingLocationMasterSchema = new mongoose.Schema({
  Billing_Location_Id: { type: Number, unique: true, default: 1 },
  Billing_Location_Name: { type: String, maxlength: 100, unique: true },
  Billing_Location_Description: { type: String, maxlength: 100 },
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: { type: Date },
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: { type: Date },
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_BILLING_LOCATION_MASTER' });

// TBL_BANK_MASTER
const bankMasterSchema = new mongoose.Schema({
  BANK_ID: { type: Number, unique: true, default: 1 },
  BANK_NAME: { type: String, maxlength: 50, unique: true },
  ADDRESS: { type: String, maxlength: 50 },
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: { type: Date },
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: { type: Date },
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_BANK_MASTER' });

// TBL_ROLE_MASTER
const roleMasterSchema = new mongoose.Schema({
  ROLE_ID: { type: Number, unique: true, default: 1 },
  ROLE_NAME: { type: String, maxlength: 50, unique: true },
  ROLE_DESCRIPTION: { type: String, maxlength: 50 },
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: { type: Date },
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: { type: Date },
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_ROLE_MASTER' });

// TBL_CURRENCY_MASTER
const currencyMasterSchema = new mongoose.Schema({
  CURRENCY_ID: { type: Number, unique: true, default: 1 },
  CURRENCY_NAME: { type: String, maxlength: 50, unique: true },
  ADDRESS: { type: String, maxlength: 50 },
  Exchange_Rate: { type: Number, get: v => parseFloat(v), set: v => v },
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: { type: Date },
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: { type: Date },
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_CURRENCY_MASTER' });

// TBL_COMPANY_MASTER
const companyMasterSchema = new mongoose.Schema({
  Company_Id: { type: Number, unique: true, default: 1 },
  Company_Name: { type: String, maxlength: 100, unique: true },
  TIN_Number: { type: String, maxlength: 50, unique: true },
  Address: { type: String, maxlength: 2000 },
  Contact_Person: { type: String, maxlength: 50 },
  Contact_Number: { type: String, maxlength: 50 },
  Email: { type: String, maxlength: 50 },
  Short_Code: { type: String, maxlength: 4 },
  Finance_Start_Month: { type: String, maxlength: 50 },
  Finance_End_Month: { type: String, maxlength: 50 },
  Year_Code: { type: String, maxlength: 50 },
  Company_Full_Name: { type: String, maxlength: 150 },
  Currency_ID: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  TimeZone: { type: String, maxlength: 50 },
  No_Of_User: Number,
  WebSite: { type: String, maxlength: 50 },
  Comp_Big_Logo: byteaSchema,
  Comp_Small_Logo: byteaSchema,
  Comp_Letter_Head: byteaSchema,
  Comp_Stamp_LOGO: byteaSchema,
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_COMPANY_MASTER' });

// TBL_EXCHANGE_RATE_MASTER
const exchangeRateMasterSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, default: 1 },
  Company_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  CURRENCY_ID: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  Exchange_Rate: Number,
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_EXCHANGE_RATE_MASTER' });

// TBL_USER_INFO_HDR
const userInfoHdrSchema = new mongoose.Schema({
  LOGIN_ID_USER_HDR: { type: Number, unique: true, default: 1 },
  NEW_CARD_NO_USER_HDR: Number,
  LOGIN_NAME: { type: String, maxlength: 50, unique: true },
  PASSWORD_USER_HDR: { type: String, maxlength: 100 },
  ROLE_USER_HDR: { type: String, maxlength: 100 },
  MOBILE_NO_USER_HDR: { type: String, maxlength: 30 },
  MAIL_ID_USER_HDR: { type: String, maxlength: 150 },
  STOCK_SHOW_STATUS: { type: String, maxlength: 10 },
  OUTSIDE_ACCESS_Y_N: { type: String, maxlength: 20 },
  STATUS_USER_HDR: { type: String, maxlength: 20 },
  REMARKS_USER_HDR: { type: String, maxlength: 1000 },
  CREATED_USER_USER_HDR: { type: String, maxlength: 50 },
  CREATED_DATE_USER_HDR: Date,
  CREATED_MAC_ADDR_USER_HDR: { type: String, maxlength: 50 },
  MODIFIED_USER_USER_HDR: { type: String, maxlength: 50 },
  MODIFIED_DATE_USER_HDR: Date,
  MODIFIED_MAC_ADDR_USER_HDR: { type: String, maxlength: 50 }
}, { collection: 'TBL_USER_INFO_HDR' });

// TBL_VAT_PERCENTAGE_SETTING
const vatPercentageSettingSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, default: 1 },
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  VAT_PERCENTAGE: Number,
  EFFECTIVE_FROM: Date,
  EFFECTIVE_TO: Date,
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_VAT_PERCENTAGE_SETTING' });

// TBL_LOCATION_MASTER
const locationMasterSchema = new mongoose.Schema({
  Location_Id: { type: Number, unique: true, default: 1 },
  Location_Name: { type: String, maxlength: 100, unique: true },
  Location_Description: { type: String, maxlength: 100 },
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_LOCATION_MASTER' });

// TBL_STORE_MASTER
const storeMasterSchema = new mongoose.Schema({
  Store_Id: { type: Number, unique: true, default: 1 },
  Store_Name: { type: String, maxlength: 100, unique: true },
  Location_Id: { type: Number, ref: 'TBL_LOCATION_MASTER' },
  Manager_Name: { type: String, maxlength: 50 },
  Store_Short_Code: { type: String, maxlength: 5 },
  Store_Short_Name: { type: String, maxlength: 100 },
  Email_Address: { type: String, maxlength: 1000 },
  CC_Email_Address: String,
  BCC_Email_Address: { type: String, maxlength: 50 },
  Response_Directors_Name: { type: String, maxlength: 1000 },
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_STORE_MASTER' });

// TBL_USER_TO_STORE_MAPPING
const userToStoreMappingSchema = new mongoose.Schema({
  USER_TO_LOCATION_ID_USER_TO_ROLE: { type: Number, unique: true, default: 1 },
  USER_ID_USER_TO_ROLE: { type: Number, ref: 'TBL_USER_INFO_HDR' },
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  STORE_ID_USER_TO_ROLE: { type: Number, ref: 'TBL_STORE_MASTER' },
  ROLE_ID_USER_TO_ROLE: { type: Number, ref: 'TBL_ROLE_MASTER' },
  STATUS_USER_TO_ROLE: { type: String, maxlength: 20 },
  CREATED_USER_USER_TO_ROLE: { type: String, maxlength: 50 },
  CREATED_DATE_USER_TO_ROLE: Date,
  CREATED_MAC_ADDR_USER_TO_ROLE: { type: String, maxlength: 50 },
  MODIFIED_USER_USER_TO_ROLE: { type: String, maxlength: 50 },
  MODIFIED_DATE_USER_TO_ROLE: Date,
  MODIFIED_MAC_ADDR_USER_TO_ROLE: { type: String, maxlength: 50 }
}, { collection: 'TBL_USER_TO_STORE_MAPPING' });

// TBL_PAYMENT_MODE_MASTER
const paymentModeMasterSchema = new mongoose.Schema({
  PAYMENT_MODE_ID: { type: Number, unique: true, default: 1 },
  PAYMENT_MODE_NAME: { type: String, maxlength: 50, unique: true },
  PAYMENT_MODE_PERCENTAGE: Number,
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_ENTRY: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PAYMENT_MODE_MASTER' });

// TBL_ADDITIONAL_COST_TYPE_MASTER
const additionalCostTypeMasterSchema = new mongoose.Schema({
  ADDITIONAL_COST_TYPE_ID: { type: Number, unique: true, default: 1 },
  ADDITIONAL_COST_TYPE_NAME: { type: String, maxlength: 50, unique: true },
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_ENTRY: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_ADDITIONAL_COST_TYPE_MASTER' });

// TBL_PAYMENT_TERM_MASTER
const paymentTermMasterSchema = new mongoose.Schema({
  PAYMENT_TERM_ID: { type: Number, unique: true, default: 1 },
  PAYMENT_TERM_NAME: { type: String, maxlength: 50, unique: true },
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_ENTRY: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PAYMENT_TERM_MASTER' });

// TBL_ACCOUNTS_LEDGER_GROUP_MASTER
const accountsLedgerGroupMasterSchema = new mongoose.Schema({
  LEDGER_GROUP_ID: { type: Number, unique: true, default: 1 },
  LEDGER_GROUP_NAME: { type: String, maxlength: 50, unique: true },
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_ENTRY: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_ACCOUNTS_LEDGER_GROUP_MASTER' });

// TBL_ACCOUNTS_HEAD_MASTER
const accountsHeadMasterSchema = new mongoose.Schema({
  ACCOUNT_HEAD_ID: { type: Number, unique: true, default: 1 },
  ACCOUNT_HEAD_NAME: { type: String, maxlength: 50, unique: true },
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_ENTRY: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_ACCOUNTS_HEAD_MASTER' });

// TBL_PRODUCT_MAIN_CATEGORY_MASTER
const productMainCategoryMasterSchema = new mongoose.Schema({
  MAIN_CATEGORY_ID: { type: Number, unique: true, default: 1 },
  MAIN_CATEGORY_NAME: { type: String, maxlength: 100, unique: true },
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' });

// TBL_PRODUCT_SUB_CATEGORY_MASTER
const productSubCategoryMasterSchema = new mongoose.Schema({
  SUB_CATEGORY_ID: { type: Number, unique: true, default: 1 },
  SUB_CATEGORY_NAME: { type: String, maxlength: 50, unique: true },
  MAIN_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' });

// TBL_PRODUCT_MASTER
const productMasterSchema = new mongoose.Schema({
  PRODUCT_ID: { type: Number, unique: true, default: 1 },
  PRODUCT_NAME: { type: String, maxlength: 150, unique: true },
  MAIN_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  SUB_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  UOM: { type: String, maxlength: 50 },
  QTY_PER_PACKING: Number,
  ALTERNATE_UOM: { type: String, maxlength: 50 },
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PRODUCT_MASTER' });

// TBL_COUNTRY_MASTER
const countryMasterSchema = new mongoose.Schema({
  Country_Id: { type: Number, unique: true, default: 1 },
  Country_Name: { type: String, maxlength: 100, unique: true },
  nicename: { type: String, maxlength: 80 },
  iso3: { type: String, maxlength: 50 },
  numcode: Number,
  phonecode: Number,
  Batch_No: { type: String, maxlength: 2 },
  Remarks: { type: String, maxlength: 1000 },
  Status_Master: { type: String, maxlength: 50 },
  Created_User: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_User: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_COUNTRY_MASTER' });

// TBL_REGION_MASTER
const regionMasterSchema = new mongoose.Schema({
  REGION_ID: { type: Number, unique: true, default: 1 },
  REGION_NAME: { type: String, maxlength: 50, unique: true },
  COUNTRY_ID: { type: Number, ref: 'TBL_COUNTRY_MASTER' },
  CAPITAL: { type: String, maxlength: 50 },
  NO_OF_DISTRICTS: Number,
  TOTAL_POPULATION: Number,
  ZONE_NAME: { type: String, maxlength: 50 },
  DISTANCE_FROM_ARUSHA: Number,
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_REGION_MASTER' });

// TBL_PRODUCT_OPENING_STOCK
const productOpeningStockSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, default: 1 },
  OPENING_STOCK_DATE: Date,
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  MAIN_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  SUB_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  PRODUCT_ID: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  TOTAL_QTY: Number,
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PRODUCT_OPENING_STOCK' });

// TBL_FIELD_HDR
const fieldHdrSchema = new mongoose.Schema({
  field_id_fld_hdr: { type: Number, unique: true, default: 1 },
  project_name_fld_hdr: { type: String, maxlength: 50 },
  field_category_fld_hdr: { type: String, maxlength: 50, unique: true },
  field_desc_fld_hdr: { type: String, maxlength: 150 },
  status_fld_hdr: { type: String, maxlength: 20 },
  remarks_fld_hdr: { type: String, maxlength: 1000 },
  created_user_fld_hdr: { type: String, maxlength: 50 },
  created_date_fld_hdr: Date,
  created_mac_addr_fld_hdr: { type: String, maxlength: 50 },
  modified_user_fld_hdr: { type: String, maxlength: 50 },
  modified_date_fld_hdr: Date,
  modified_mac_addr_fld_hdr: { type: String, maxlength: 50 }
}, { collection: 'TBL_FIELD_HDR' });

// TBL_FIELD_DTL
const fieldDtlSchema = new mongoose.Schema({
  activity_id_fld_dtl: { type: Number, unique: true, default: 1 },
  field_id_fld_dtl: { type: Number, ref: 'TBL_FIELD_HDR' },
  activity_name_fld_dtl: String,
  activity_desc_fld_dtl: String,
  status_fld_dtl: { type: String, maxlength: 10 },
  remarks_fld_dtl: { type: String, maxlength: 1000 },
  created_user_fld_dtl: { type: String, maxlength: 50 },
  created_date_fld_dtl: Date,
  created_mac_addr_fld_dtl: { type: String, maxlength: 50 },
  modified_user_fld_dtl: { type: String, maxlength: 50 },
  modified_date_fld_dtl: Date,
  modified_mac_addr_fld_dtl: { type: String, maxlength: 50 }
}, { collection: 'TBL_FIELD_DTL' });

// TBL_PRODUCT_COMPANY_MAIN_CATEGORY_MAPPING
const productCompanyMainCategoryMappingSchema = new mongoose.Schema({
  Sno: { type: Number, unique: true, default: 1 },
  Company_Id: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  Main_Category_Id: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_PRODUCT_COMPANY_MAIN_CATEGORY_MAPPING' });

// TBL_STORE_PRODUCT_MINIMUM_STOCK
const storeProductMinimumStockSchema = new mongoose.Schema({
  Sno: { type: Number, unique: true, default: 1 },
  Company_id: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  Store_Id: { type: Number, ref: 'TBL_STORE_MASTER' },
  Main_Category_Id: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  Sub_Category_Id: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  Product_Id: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  Minimum_Stock_Pcs: Number,
  Purchase_Alert_Qty: Number,
  Requested_By: { type: String, maxlength: 50 },
  Effective_From: Date,
  Effective_To: Date,
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_STORE_PRODUCT_MINIMUM_STOCK' });

// TBL_SUPPLIER_MASTER
const supplierMasterSchema = new mongoose.Schema({
  Supplier_Id: { type: Number, unique: true, default: 1 },
  Supplier_Type: { type: String, maxlength: 50 },
  Supplier_Name: { type: String, maxlength: 250, unique: true },
  TIN_Number: { type: String, maxlength: 100 },
  Vat_Register_No: { type: String, maxlength: 50 },
  SH_Nick_Name: { type: String, maxlength: 50 },
  Shipment_Mode: { type: String, maxlength: 100 },
  Country_Id: { type: Number, ref: 'TBL_COUNTRY_MASTER' },
  Region_Id: Number,
  District_Id: Number,
  Address: { type: String, maxlength: 2500 },
  Contact_Person: { type: String, maxlength: 50 },
  Phone_number: { type: String, maxlength: 50 },
  Mail_Id: { type: String, maxlength: 50 },
  Fax: { type: String, maxlength: 50 },
  vat_Percentage: Number,
  Withholding_vat_percentage: Number,
  Remarks: { type: String, maxlength: 150 },
  Status_Master: { type: String, maxlength: 20 },
  Created_User: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_User: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_SUPPLIER_MASTER' });

// TBL_COMPANY_BANK_ACCOUNT_MASTER
const companyBankAccountMasterSchema = new mongoose.Schema({
  Account_Id: { type: Number, unique: true, default: 1 },
  Company_id: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  Bank_Id: { type: Number, ref: 'TBL_BANK_MASTER' },
  Account_Name: { type: String, maxlength: 100, unique: true },
  Account_Number: { type: String, maxlength: 100, unique: true },
  Swift_Code: { type: String, maxlength: 50 },
  Branch_Address: { type: String, maxlength: 200 },
  Bank_Branch_Name: { type: String, maxlength: 50 },
  Currency_Id: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_COMPANY_BANK_ACCOUNT_MASTER' });

// TBL_CHANGE_PASSWORD_LOG
const changePasswordLogSchema = new mongoose.Schema({
  Sno: { type: Number, unique: true, default: 1 },
  login_id: { type: Number, ref: 'TBL_USER_INFO_HDR' },
  User_Name: { type: String, maxlength: 50 },
  Old_Password: { type: String, maxlength: 50 },
  New_Password: { type: String, maxlength: 50 },
  Reason: { type: String, maxlength: 1000 },
  status_entry: { type: String, maxlength: 50 },
  Created_by: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_by: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_CHANGE_PASSWORD_LOG' });

// TBL_DISTRICT_MASTER
const districtMasterSchema = new mongoose.Schema({
  District_id: { type: Number, unique: true, default: 1 },
  Country_Id: { type: Number, ref: 'TBL_COUNTRY_MASTER' },
  Region_Id: { type: Number, ref: 'TBL_REGION_MASTER' },
  District_Name: { type: String, maxlength: 50 },
  Total_Population: Number,
  Zone_Name: { type: String, maxlength: 50 },
  Distance_From_Arusha: Number,
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_DISTRICT_MASTER' });

// TBL_CUSTOMER_MASTER
const customerMasterSchema = new mongoose.Schema({
  Customer_Id: { type: Number, unique: true, default: 1 },
  Customer_Name: { type: String, maxlength: 250, unique: true },
  TIN_Number: { type: String, maxlength: 100 },
  VAT_Number: { type: String, maxlength: 50 },
  Contact_Person: { type: String, maxlength: 50 },
  Contact_Number: { type: String, maxlength: 50 },
  Location: { type: String, maxlength: 100 },
  Nature_Of_Business: { type: String, maxlength: 50 },
  Billing_Location_Id: { type: Number, ref: 'TBL_BILLING_LOCATION_MASTER' },
  Country_Id: { type: Number, ref: 'TBL_COUNTRY_MASTER' },
  Region_Id: { type: Number, ref: 'TBL_REGION_MASTER' },
  District_Id: { type: Number, ref: 'TBL_DISTRICT_MASTER' },
  currency_id: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  CREDIT_ALLOWED: { type: String, maxlength: 50 },
  Address: { type: String, maxlength: 1500 },
  Email_Address: { type: String, maxlength: 100 },
  PHONE_NUMBER_2: { type: String, maxlength: 50 },
  LAT: Number,
  LNG: Number,
  TIER: { type: String, maxlength: 50 },
  Company_Head_Contact_Person: { type: String, maxlength: 250 },
  Company_Head_Phone_No: { type: String, maxlength: 250 },
  Company_Head_Email: { type: String, maxlength: 250 },
  Accounts_Contact_Person: { type: String, maxlength: 250 },
  Accounts_Phone_No: { type: String, maxlength: 250 },
  Accounts_Email: { type: String, maxlength: 250 },
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_MASTER' });

// TBL_CUSTOMER_ADDRESS_DETAILS
const customerAddressDetailsSchema = new mongoose.Schema({
  Sno: { type: Number, unique: true, default: 1 },
  Customer_Id: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  Address_Count: Number,
  Contact_Person: { type: String, maxlength: 50 },
  Contact_Number: { type: String, maxlength: 50 },
  Address: { type: String, maxlength: 5000 },
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_ADDRESS_DETAILS' });

// TBL_CUSTOMER_MASTER_FILES_UPLOAD
const customerMasterFilesUploadSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, default: 1 },
  Customer_Id: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  DOCUMENT_TYPE: { type: String, maxlength: 50 },
  DESCRIPTIONS: { type: String, maxlength: 100 },
  FILE_NAME: { type: String, maxlength: 150 },
  CONTENT_TYPE: { type: String, maxlength: 50 },
  CONTENT_DATA: byteaSchema,
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_MASTER_FILES_UPLOAD' });

// TBL_CUSTOMER_COMPANY_WISE_BILLING_LOCATION_MAPPING
const customerCompanyWiseBillingLocationMappingSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, default: 1 },
  Customer_Id: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  Company_id: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  Billing_Location_Id: { type: Number, ref: 'TBL_BILLING_LOCATION_MASTER' },
  EFFECTIVE_FROM: Date,
  EFFECTIVE_TO: Date,
  REMARKS: { type: String, maxlength: 500 },
  STATUS_MASTER: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_COMPANY_WISE_BILLING_LOCATION_MAPPING' });

// TBL_CUSTOMER_PRODUCT_VAT_PERCENTAGE_SETTINGS
const customerProductVatPercentageSettingsSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, default: 1 },
  Company_id: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  Customer_Id: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  Main_Category_Id: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  Sub_Category_Id: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  Product_Id: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  VAT_PERCENTAGE: Number,
  EFFECTIVE_FROM: Date,
  EFFECTIVE_TO: Date,
  REQUEST_STATUS: { type: String, maxlength: 50 },
  REMARKS: { type: String, maxlength: 100 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_PRODUCT_VAT_PERCENTAGE_SETTINGS' });

// TBL_CUSTOMER_WISE_PRODUCT_PRICE_SETTINGS
const customerWiseProductPriceSettingsSchema = new mongoose.Schema({
  Sno: { type: Number, unique: true, default: 1 },
  Company_id: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  Customer_Id: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  Main_Category_Id: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  Sub_Category_Id: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  Product_Id: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  VAT_Percentage: Number,
  Valid_Type: { type: String, maxlength: 50 },
  currency_id: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  Effective_From: Date,
  Effective_To: Date,
  Requested_By: { type: String, maxlength: 50 },
  Requested_Date: Date,
  Requested_Product_Amount: Number,
  Approved_Product_Amount: Number,
  Respond_By: { type: String, maxlength: 50 },
  Response_Status: { type: String, maxlength: 50 },
  REspond_Date: Date,
  Respond_Mac_Address: { type: String, maxlength: 50 },
  Response_Remarks: { type: String, maxlength: 1000 },
  Accounts_Response_Person: { type: String, maxlength: 50 },
  Accounts_Response_Date: Date,
  Accounts_Response_Status: { type: String, maxlength: 50 },
  Accounts_Response_Remarks: { type: String, maxlength: 500 },
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_WISE_PRODUCT_PRICE_SETTINGS' });

// TBL_CUSTOMER_CREDIT_LIMIT_DETAILS
const customerCreditLimitDetailsSchema = new mongoose.Schema({
  Sno: { type: Number, unique: true, default: 1 },
  Company_id: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  Customer_Id: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  Currency_id: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  Valid_Type: { type: String, maxlength: 50 },
  Requested_Credit_Limit_Days: Number,
  Requested_Credit_Limit_Amount: Number,
  Requested_Payment_Mode_Id: { type: Number, ref: 'TBL_CUSTOMER_PAYMENT_MODE_MASTER' },
  Requested_By: { type: String, maxlength: 50 },
  Requested_Date: Date,
  Total_Outstanding_Amount: Number,
  Over_Due_Outstanding_Amount: Number,
  Approved_Credit_Limit_Days: Number,
  Approved_Credit_Limit_Amount: Number,
  Approved_PAYMENT_MODE_ID: { type: Number, ref: 'TBL_CUSTOMER_PAYMENT_MODE_MASTER' },
  Effective_From: Date,
  Effective_To: Date,
  Finance_Head_1_Response_By: { type: String, maxlength: 50 },
  Finance_Head_1_Response_Date: Date,
  Finance_Head_1_Response_Status: { type: String, maxlength: 50 },
  Finance_Head_1_Response_IP_Address: { type: String, maxlength: 50 },
  Finance_Head_1_Response_Remarks: { type: String, maxlength: 500 },
  Respond_by: { type: String, maxlength: 50 },
  Respond_Status: { type: String, maxlength: 50 },
  Respond_Date: Date,
  Respond_Mac_address: { type: String, maxlength: 50 },
  Response_Remarks: { type: String, maxlength: 1000 },
  Remarks: { type: String, maxlength: 2000 },
  Status_Master: { type: String, maxlength: 20 },
  Created_By: { type: String, maxlength: 50 },
  Created_Date: Date,
  Created_Mac_Address: { type: String, maxlength: 50 },
  Modified_By: { type: String, maxlength: 50 },
  Modified_Date: Date,
  Modified_Mac_Address: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_CREDIT_LIMIT_DETAILS' });

// CUSTOMER_CREDIT_LIMIT_FILE_UPLOAD
const customerCreditLimitFileUploadSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, default: 1 },
  CREDIT_LIMIT_ID: { type: Number, ref: 'TBL_CUSTOMER_CREDIT_LIMIT_DETAILS' },
  DESCRIPTION_DETAILS: { type: String, maxlength: 100 },
  FILE_NAME: { type: String, maxlength: 150 },
  CONTENT_TYPE: { type: String, maxlength: 50 },
  CONTENT_DATA: byteaSchema,
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 },
  Document_Type: { type: String, maxlength: 60 }
}, { collection: 'CUSTOMER_CREDIT_LIMIT_FILE_UPLOAD' });

// TBL_ACCOUNTS_LEDGER_MASTER
const accountsLedgerMasterSchema = new mongoose.Schema({
  LEDGER_ID: { type: Number, unique: true, default: 1 },
  Company_id: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  LEDGER_TYPE: { type: String, maxlength: 50 },
  LEDGER_GROUP_ID: Number,
  LEDGER_NAME: { type: String, maxlength: 100 },
  LEDGER_DESC: { type: String, maxlength: 100 },
  REMARKS: { type: String, maxlength: 100 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_ACCOUNTS_LEDGER_MASTER' });

// TBL_SALES_PERSON_MASTER
const salesPersonMasterSchema = new mongoose.Schema({
  Sales_Person_ID: { type: Number, unique: true, default: 1 },
  Emp_Id: Number,
  PERSON_NAME: { type: String, maxlength: 50 },
  Designation_Name: { type: String, maxlength: 50 },
  Sales_Contact_Person_Phone: { type: String, maxlength: 60 },
  Sales_Person_Email_Addres: { type: String, maxlength: 60 },
  Reporting_Manager_Card_No: Number,
  Reporting_Manager_Name: { type: String, maxlength: 100 },
  Reporting_Manager_Email_Address: { type: String, maxlength: 100 },
  Sales_Person_Designation: { type: String, maxlength: 100 },
  REMARKS: { type: String, maxlength: 50 },
  STATUS_MASTER: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_SALES_PERSON_MASTER' });

// ==================== STOENTRIES SCHEMAS ====================

// TBL_PURCHASE_ORDER_HDR
const purchaseOrderHdrSchema = new mongoose.Schema({
  SNO: { type: Number, default: 1 },
  PO_REF_NO: { type: String, maxlength: 50, unique: true, required: true },
  PO_DATE: Date,
  PURCHASE_TYPE: { type: String, maxlength: 20 },
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  SUPPLIER_ID: { type: Number, ref: 'TBL_SUPPLIER_MASTER' },
  PO_STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  PAYMENT_TERM_ID: { type: Number, ref: 'TBL_PAYMENT_TERM_MASTER' },
  MODE_OF_PAYMENT: { type: String, maxlength: 25 },
  CURRENCY_ID: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  SUPLIER_PROFORMA_NUMBER: { type: String, maxlength: 100 },
  SHIPMENT_MODE: { type: String, maxlength: 100 },
  PRICE_TERMS: { type: String, maxlength: 150 },
  ESTIMATED_SHIPMENT_DATE: Date,
  SHIPMENT_REMARKS: { type: String, maxlength: 2500 },
  PRODUCT_HDR_AMOUNT: Number,
  TOTAL_ADDITIONAL_COST_AMOUNT: Number,
  TOTAL_PRODUCT_HDR_AMOUNT: Number,
  TOTAL_VAT_HDR_AMOUNT: Number,
  FINAL_PURCHASE_HDR_AMOUNT: Number,
  EXCHANGE_RATE: Number,
  PRODUCT_HDR_AMOUNT_LC: Number,
  TOTAL_ADDITIONAL_COST_AMOUNT_LC: Number,
  TOTAL_PRODUCT_HDR_AMOUNT_LC: Number,
  TOTAL_VAT_HDR_AMOUNT_LC: Number,
  FINAL_PURCHASE_HDR_AMOUNT_LC: Number,
  SUBMITTED_BY: { type: String, maxlength: 50 },
  SUBMITTED_DATE: Date,
  SUBMITTED_IP_ADDRESS: { type: String, maxlength: 50 },
  PURCHASE_HEAD_RESPONSE_PERSON: { type: String, maxlength: 50 },
  PURCHASE_HEAD_RESPONSE_DATE: Date,
  PURCHASE_HEAD_RESPONSE_STATUS: { type: String, maxlength: 50 },
  PURCHASE_HEAD_RESPONSE_REMARKS: { type: String, maxlength: 500 },
  PURCHASE_HEAD_RESPONSE_IP_ADDRESS: { type: String, maxlength: 50 },
  RESPONSE_1_PERSON: { type: String, maxlength: 50 },
  RESPONSE_1_DATE: Date,
  RESPONSE_1_STATUS: { type: String, maxlength: 50 },
  RESPONSE_1_REMARKS: { type: String, maxlength: 5000 },
  RESPONSE_1_IP_ADDRESS: { type: String, maxlength: 50 },
  RESPONSE_2_PERSON: { type: String, maxlength: 50 },
  RESPONSE_2_DATE: Date,
  RESPONSE_2_STATUS: { type: String, maxlength: 50 },
  RESPONSE_2_REMARKS: { type: String, maxlength: 5000 },
  RESPONSE_2_IP_ADDRESS: { type: String, maxlength: 50 },
  FINAL_RESPONSE_PERSON: { type: String, maxlength: 50 },
  FINAL_RESPONSE_DATE: Date,
  FINAL_RESPONSE_STATUS: { type: String, maxlength: 50 },
  FINAL_RESPONSE_REMARKS: { type: String, maxlength: 5000 },
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PURCHASE_ORDER_HDR' });

// TBL_PURCHASE_ORDER_DTL
const purchaseOrderDtlSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  REQUEST_STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  MAIN_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  SUB_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  PRODUCT_ID: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  QTY_PER_PACKING: Number,
  TOTAL_QTY: Number,
  UOM: { type: String, maxlength: 50 },
  TOTAL_PACKING: Number,
  ALTERNATE_UOM: { type: String, maxlength: 500 },
  RATE_PER_QTY: Number,
  PRODUCT_AMOUNT: Number,
  DISCOUNT_PERCENTAGE: Number,
  DISCOUNT_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT: Number,
  VAT_PERCENTAGE: Number,
  VAT_AMOUNT: Number,
  FINAL_PRODUCT_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT_LC: Number,
  FINAL_PRODUCT_AMOUNT_LC: Number,
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PURCHASE_ORDER_DTL' });

// TBL_PURCHASE_ORDER_ADDITIONAL_COST_DETAILS
const purchaseOrderAdditionalCostDetailsSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  ADDITIONAL_COST_TYPE_ID: { type: Number, ref: 'TBL_ADDITIONAL_COST_TYPE_MASTER' },
  ADDITIONAL_COST_AMOUNT: Number,
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_MASTER: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PURCHASE_ORDER_ADDITIONAL_COST_DETAILS' });

// TBL_PURCHASE_ORDER_FILES_UPLOAD
const purchaseOrderFilesUploadSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  DOCUMENT_TYPE: { type: String, maxlength: 50 },
  DESCRIPTION_DETAILS: { type: String, maxlength: 100 },
  FILE_NAME: { type: String, maxlength: 150 },
  CONTENT_TYPE: { type: String, maxlength: 50 },
  CONTENT_DATA: byteaSchema,
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PURCHASE_ORDER_FILES_UPLOAD' });

// TBL_PURCHASE_ORDER_CONVERSATION_DTL
const purchaseOrderConversationDtlSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  RESPOND_PERSON: { type: String, maxlength: 50 },
  DISCUSSION_DETAILS: String,
  RESPONSE_STATUS: { type: String, maxlength: 50 },
  STATUS_ENTRY: { type: String, maxlength: 50 },
  REMARKS: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PURCHASE_ORDER_CONVERSATION_DTL' });

// TBL_GOODS_INWARD_GRN_HDR
const goodsInwardGrnHdrSchema = new mongoose.Schema({
  SNO: { type: Number, default: 1 },
  GRN_REF_NO: { type: String, maxlength: 50, unique: true, required: true },
  GRN_DATE: Date,
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  SOURCE_STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  GRN_STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  GRN_SOURCE: { type: String, maxlength: 50 },
  DELIVERY_NOTE_REF_NO: { type: String, maxlength: 50 },
  SUPPLIER_ID: { type: Number, ref: 'TBL_SUPPLIER_MASTER' },
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  PURCHASE_INVOICE_REF_NO: { type: String, maxlength: 50 },
  SUPPLIER_INVOICE_NUMBER: { type: String, maxlength: 100 },
  CONTAINER_NO: { type: String, maxlength: 20 },
  DRIVER_NAME: { type: String, maxlength: 50 },
  DRIVER_CONTACT_NUMBER: { type: String, maxlength: 50 },
  VEHICLE_NO: { type: String, maxlength: 50 },
  SEAL_NO: { type: String, maxlength: 50 },
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_GOODS_INWARD_GRN_HDR' });

// TBL_GOODS_INWARD_GRN_DTL
const goodsInwardGrnDtlSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  GRN_REF_NO: { type: String, maxlength: 50, ref: 'TBL_GOODS_INWARD_GRN_HDR' },
  PO_DTL_SNO: { type: Number, ref: 'TBL_PURCHASE_ORDER_DTL' },
  MAIN_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  SUB_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  PRODUCT_ID: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  QTY_PER_PACKING: Number,
  TOTAL_QTY: Number,
  UOM: { type: String, maxlength: 50 },
  TOTAL_PACKING: Number,
  ALTERNATE_UOM: { type: String, maxlength: 500 },
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_GOODS_INWARD_GRN_DTL' });

// TBL_PURCHASE_INVOICE_HDR
const purchaseInvoiceHdrSchema = new mongoose.Schema({
  SNO: { type: Number, default: 1 },
  PURCHASE_INVOICE_REF_NO: { type: String, maxlength: 50, unique: true, required: true },
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  INVOICE_NO: { type: String, maxlength: 100 },
  INVOICE_DATE: Date,
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  PURCHASE_TYPE: { type: String, maxlength: 20 },
  SUPPLIER_ID: { type: Number, ref: 'TBL_SUPPLIER_MASTER' },
  STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  PAYMENT_TERM_ID: { type: Number, ref: 'TBL_PAYMENT_TERM_MASTER' },
  MODE_OF_PAYMENT: { type: String, maxlength: 25 },
  CURRENCY_ID: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  PRICE_TERMS: { type: String, maxlength: 150 },
  PRODUCT_HDR_AMOUNT: Number,
  TOTAL_ADDITIONAL_COST_AMOUNT: Number,
  TOTAL_PRODUCT_HDR_AMOUNT: Number,
  TOTAL_VAT_HDR_AMOUNT: Number,
  FINAL_INVOICE_HDR_AMOUNT: Number,
  EXCHANGE_RATE: Number,
  PRODUCT_HDR_AMOUNT_LC: Number,
  TOTAL_ADDITIONAL_COST_AMOUNT_LC: Number,
  TOTAL_PRODUCT_HDR_AMOUNT_LC: Number,
  TOTAL_VAT_HDR_AMOUNT_LC: Number,
  FINAL_PURCHASE_INVOICE_AMOUNT_LC: Number,
  SUBMITTED_BY: { type: String, maxlength: 50 },
  SUBMITTED_DATE: Date,
  SUBMITTED_IP_ADDRESS: { type: String, maxlength: 50 },
  RESPONSE_1_PERSON: { type: String, maxlength: 50 },
  RESPONSE_1_DATE: Date,
  RESPONSE_1_STATUS: { type: String, maxlength: 50 },
  RESPONSE_1_REMARKS: { type: String, maxlength: 5000 },
  RESPONSE_1_IP_ADDRESS: { type: String, maxlength: 50 },
  RESPONSE_2_PERSON: { type: String, maxlength: 50 },
  RESPONSE_2_DATE: Date,
  RESPONSE_2_STATUS: { type: String, maxlength: 50 },
  RESPONSE_2_REMARKS: { type: String, maxlength: 5000 },
  RESPONSE_2_IP_ADDRESS: { type: String, maxlength: 50 },
  FINAL_RESPONSE_PERSON: { type: String, maxlength: 50 },
  FINAL_RESPONSE_DATE: Date,
  FINAL_RESPONSE_STATUS: { type: String, maxlength: 50 },
  FINAL_RESPONSE_REMARKS: { type: String, maxlength: 5000 },
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PURCHASE_INVOICE_HDR' });

// TBL_PURCHASE_INVOICE_DTL
const purchaseInvoiceDtlSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  PURCHASE_INVOICE_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  GRN_REF_NO: { type: String, maxlength: 50, ref: 'TBL_GOODS_INWARD_GRN_HDR' },
  MAIN_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  SUB_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  PRODUCT_ID: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  QTY_PER_PACKING: Number,
  TOTAL_QTY: Number,
  UOM: { type: String, maxlength: 50 },
  TOTAL_PACKING: Number,
  ALTERNATE_UOM: { type: String, maxlength: 500 },
  RATE_PER_QTY: Number,
  PRODUCT_AMOUNT: Number,
  DISCOUNT_PERCENTAGE: Number,
  DISCOUNT_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT: Number,
  VAT_PERCENTAGE: Number,
  VAT_AMOUNT: Number,
  FINAL_PRODUCT_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT_LC: Number,
  FINAL_PRODUCT_AMOUNT_LC: Number,
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PURCHASE_INVOICE_DTL' });

// TBL_PURCHASE_INVOICE_ADDITIONAL_COST_DETAILS
const purchaseInvoiceAdditionalCostDetailsSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  PURCHASE_INVOICE_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  ADDITIONAL_COST_TYPE_ID: { type: Number, ref: 'TBL_ADDITIONAL_COST_TYPE_MASTER' },
  ADDITIONAL_COST_AMOUNT: Number,
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_MASTER: { type: String, maxlength: 50 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PURCHASE_INVOICE_ADDITIONAL_COST_DETAILS' });

// TBL_PURCHASE_INVOICE_FILES_UPLOAD
const purchaseInvoiceFilesUploadSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  PURCHASE_INVOICE_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  DOCUMENT_TYPE: { type: String, maxlength: 50 },
  DESCRIPTION_DETAILS: { type: String, maxlength: 100 },
  FILE_NAME: { type: String, maxlength: 150 },
  CONTENT_TYPE: { type: String, maxlength: 50 },
  CONTENT_DATA: byteaSchema,
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_MASTER: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_PURCHASE_INVOICE_FILES_UPLOAD' });

// TBL_EXPENSE_HDR
const expenseHdrSchema = new mongoose.Schema({
  SNO: { type: Number, default: 1 },
  EXPENSE_REF_NO: { type: String, maxlength: 50, unique: true, required: true },
  EXPENSE_DATE: Date,
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  EXPENSE_AGAINST: { type: String, maxlength: 50 },
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  ACCOUNT_HEAD_ID: { type: Number, ref: 'TBL_ACCOUNTS_HEAD_MASTER' },
  EXPENSE_SUPPLIER_ID: { type: Number, ref: 'TBL_SUPPLIER_MASTER' },
  EXPENSE_TYPE: { type: String, maxlength: 100 },
  TRA_EFD_RECEIPT_NO: { type: String, maxlength: 100 },
  CURRENCY_ID: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  EXCHANGE_RATE: Number,
  TOTAL_EXPENSE_AMOUNT: Number,
  TOTAL_EXPENSE_AMOUNT_LC: Number,
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 },
  SUBMITTED_BY: { type: String, maxlength: 50 },
  SUBMITTED_DATE: Date,
  SUBMITTED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_EXPENSE_HDR' });

// TBL_EXPENSE_DTL
const expenseDtlSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  EXPENSE_REF_NO: { type: String, maxlength: 50, ref: 'TBL_EXPENSE_HDR' },
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  PO_DTL_SNO: { type: Number, ref: 'TBL_PURCHASE_ORDER_DTL' },
  PRODUCT_ID: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  EXPENSE_AMOUNT: Number,
  EXPENSE_AMOUNT_LC: Number,
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_IP_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_IP_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_EXPENSE_DTL' });

// TBL_SALES_ORDER_HDR
const salesOrderHdrSchema = new mongoose.Schema({
  SNO: { type: Number, default: 1 },
  SALES_ORDER_REF_NO: { type: String, maxlength: 50, unique: true, required: true },
  SALES_ORDER_DATE: Date,
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  CUSTOMER_ID: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  BILLING_LOCATION_ID: { type: Number, ref: 'TBL_BILLING_LOCATION_MASTER' },
  SALES_PERSON_EMP_ID: { type: Number, ref: 'TBL_SALES_PERSON_MASTER' },
  CREDIT_LIMIT_AMOUNT: Number,
  CREDIT_LIMIT_DAYS: Number,
  OUTSTANDING_AMOUNT: Number,
  CURRENCY_ID: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  EXCHANGE_RATE: Number,
  TOTAL_PRODUCT_AMOUNT: Number,
  VAT_AMOUNT: Number,
  FINAL_SALES_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT_LC: Number,
  FINAL_SALES_AMOUNT_LC: Number,
  REMARKS: { type: String, maxlength: 2000 },
  TEST_DESC: { type: String, maxlength: 50 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 },
  SUBMITTED_BY: { type: String, maxlength: 50 },
  SUBMITTED_DATE: Date
}, { collection: 'TBL_SALES_ORDER_HDR' });

// TBL_SALES_ORDER_DTL
const salesOrderDtlSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  SALES_ORDER_REF_NO: { type: String, maxlength: 50, ref: 'TBL_SALES_ORDER_HDR' },
  MAIN_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  SUB_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  PRODUCT_ID: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  STORE_STOCK_PCS: Number,
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  PO_DTL_SNO: { type: Number, ref: 'TBL_PURCHASE_ORDER_DTL' },
  PO_DTL_STOCK_QTY: Number,
  PURCHASE_RATE_PER_QTY: Number,
  PO_EXPENSE_AMOUNT: Number,
  SALES_RATE_PER_QTY: Number,
  QTY_PER_PACKING: Number,
  TOTAL_QTY: Number,
  UOM: { type: String, maxlength: 50 },
  TOTAL_PACKING: Number,
  ALTERNATE_UOM: { type: String, maxlength: 500 },
  TOTAL_PRODUCT_AMOUNT: Number,
  VAT_PERCENTAGE: Number,
  VAT_AMOUNT: Number,
  FINAL_SALES_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT_LC: Number,
  FINAL_SALES_AMOUNT_LC: Number,
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_SALES_ORDER_DTL' });

// TBL_DELIVERY_NOTE_HDR
const deliveryNoteHdrSchema = new mongoose.Schema({
  SNO: { type: Number, default: 1 },
  DELIVERY_NOTE_REF_NO: { type: String, maxlength: 50, unique: true, required: true },
  DELIVERY_DATE: Date,
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  FROM_STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  DELIVERY_SOURCE_TYPE: { type: String, maxlength: 50 },
  DELIVERY_SOURCE_REF_NO: { type: String, maxlength: 50 },
  TO_STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  CUSTOMER_ID: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  TRUCK_NO: { type: String, maxlength: 50 },
  TRAILER_NO: { type: String, maxlength: 50 },
  DRIVER_NAME: { type: String, maxlength: 50 },
  DRIVER_CONTACT_NUMBER: { type: String, maxlength: 50 },
  SEAL_NO: { type: String, maxlength: 50 },
  CURRENCY_ID: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  EXCHANGE_RATE: Number,
  TOTAL_PRODUCT_AMOUNT: Number,
  VAT_AMOUNT: Number,
  FINAL_SALES_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT_LC: Number,
  FINAL_SALES_AMOUNT_LC: Number,
  TEST_DESC: { type: String, maxlength: 50 },
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 },
  SUBMITTED_BY: { type: String, maxlength: 50 },
  SUBMITTED_DATE: Date,
  SUBMITTED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_DELIVERY_NOTE_HDR' });

// TBL_DELIVERY_NOTE_DTL
const deliveryNoteDtlSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  DELIVERY_NOTE_REF_NO: { type: String, maxlength: 50, ref: 'TBL_DELIVERY_NOTE_HDR' },
  SALES_ORDER_DTL_SNO: Number,
  PO_DTL_SNO: { type: Number, ref: 'TBL_PURCHASE_ORDER_DTL' },
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  MAIN_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  SUB_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  PRODUCT_ID: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  SALES_RATE_PER_QTY: Number,
  QTY_PER_PACKING: Number,
  REQUEST_QTY: Number,
  DELIVERY_QTY: Number,
  UOM: { type: String, maxlength: 50 },
  TOTAL_PACKING: Number,
  ALTERNATE_UOM: { type: String, maxlength: 500 },
  TOTAL_PRODUCT_AMOUNT: Number,
  VAT_PERCENTAGE: Number,
  VAT_AMOUNT: Number,
  FINAL_SALES_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT_LC: Number,
  FINAL_SALES_AMOUNT_LC: Number,
  STORE_STOCK_PCS: Number,
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_DELIVERY_NOTE_DTL' });

// TBL_TAX_INVOICE_HDR
const taxInvoiceHdrSchema = new mongoose.Schema({
  SNO: { type: Number, default: 1 },
  TAX_INVOICE_REF_NO: { type: String, maxlength: 50, unique: true, required: true },
  INVOICE_DATE: Date,
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  FROM_STORE_ID: { type: Number, ref: 'TBL_STORE_MASTER' },
  INVOICE_TYPE: { type: String, maxlength: 50 },
  DELIVERY_NOTE_REF_NO: { type: String, maxlength: 50, ref: 'TBL_DELIVERY_NOTE_HDR' },
  CUSTOMER_ID: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  CURRENCY_ID: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  EXCHANGE_RATE: Number,
  TOTAL_PRODUCT_AMOUNT: Number,
  VAT_AMOUNT: Number,
  FINAL_SALES_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT_LC: Number,
  FINAL_SALES_AMOUNT_LC: Number,
  TEST_DESC: { type: String, maxlength: 50 },
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 },
  SUBMITTED_BY: { type: String, maxlength: 50 },
  SUBMITTED_DATE: Date,
  SUBMITTED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_TAX_INVOICE_HDR' });

// TBL_TAX_INVOICE_DTL
const taxInvoiceDtlSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  TAX_INVOICE_REF_NO: { type: String, maxlength: 50, ref: 'TBL_TAX_INVOICE_HDR' },
  DELIVERY_NOTE_DTL_SNO: Number,
  PO_DTL_SNO: { type: Number, ref: 'TBL_PURCHASE_ORDER_DTL' },
  PO_REF_NO: { type: String, maxlength: 50, ref: 'TBL_PURCHASE_ORDER_HDR' },
  MAIN_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_MAIN_CATEGORY_MASTER' },
  SUB_CATEGORY_ID: { type: Number, ref: 'TBL_PRODUCT_SUB_CATEGORY_MASTER' },
  PRODUCT_ID: { type: Number, ref: 'TBL_PRODUCT_MASTER' },
  SALES_RATE_PER_QTY: Number,
  QTY_PER_PACKING: Number,
  DELIVERY_QTY: Number,
  INVOICE_QTY: Number,
  UOM: { type: String, maxlength: 50 },
  TOTAL_PACKING: Number,
  ALTERNATE_UOM: { type: String, maxlength: 500 },
  TOTAL_PRODUCT_AMOUNT: Number,
  VAT_PERCENTAGE: Number,
  VAT_AMOUNT: Number,
  FINAL_SALES_AMOUNT: Number,
  TOTAL_PRODUCT_AMOUNT_LC: Number,
  FINAL_SALES_AMOUNT_LC: Number,
  REMARKS: { type: String, maxlength: 2000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_TAX_INVOICE_DTL' });

// TBL_CUSTOMER_RECEIPT_HDR
const customerReceiptHdrSchema = new mongoose.Schema({
  SNO: { type: Number, default: 1 },
  RECEIPT_REF_NO: { type: String, maxlength: 50, unique: true, required: true },
  RECEIPT_DATE: Date,
  PAYMENT_TYPE: { type: String, maxlength: 50 },
  COMPANY_ID: { type: Number, ref: 'TBL_COMPANY_MASTER' },
  CUSTOMER_ID: { type: Number, ref: 'TBL_CUSTOMER_MASTER' },
  PAYMENT_MODE_ID: { type: Number, ref: 'TBL_CUSTOMER_PAYMENT_MODE_MASTER' },
  CR_BANK_CASH_ID: { type: Number, ref: 'TBL_BANK_MASTER' },
  CR_ACCOUNT_ID: { type: Number, ref: 'TBL_COMPANY_BANK_ACCOUNT_MASTER' },
  DR_BANK_CASH_ID: { type: Number, ref: 'TBL_BANK_MASTER' },
  TRANSACTION_REF_NO: { type: String, maxlength: 100 },
  TRANSACTION_DATE: Date,
  CURRENCY_ID: { type: Number, ref: 'TBL_CURRENCY_MASTER' },
  RECEIPT_AMOUNT: Number,
  EXCHANGE_RATE: Number,
  RECEIPT_AMOUNT_LC: Number,
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 },
  Submitted_By: { type: String, maxlength: 50 },
  Submitted_Date: Date,
  Submitted_IP_Address: { type: String, maxlength: 50 },
  Tally_Ref_No: { type: String, maxlength: 50 },
  Tally_Sync_Status: { type: String, maxlength: 20 },
  Tally_Sync_Date: Date,
  Tally_Sync_Person_Name: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_RECEIPT_HDR' });

// TBL_CUSTOMER_RECEIPT_INVOICE_DTL
const customerReceiptInvoiceDtlSchema = new mongoose.Schema({
  SNO: { type: Number, unique: true, required: true, default: 1 },
  RECEIPT_REF_NO: { type: String, maxlength: 50, ref: 'TBL_CUSTOMER_RECEIPT_HDR' },
  TAX_INVOICE_REF_NO: { type: String, maxlength: 50, ref: 'TBL_TAX_INVOICE_HDR' },
  ACTUAL_INVOICE_AMOUNT: Number,
  ALREADY_PAID_AMOUNT: Number,
  OUTSTANDING_INVOICE_AMOUNT: Number,
  RECEIPT_INVOICE_ADJUST_AMOUNT: Number,
  REMARKS: { type: String, maxlength: 1000 },
  STATUS_ENTRY: { type: String, maxlength: 20 },
  CREATED_BY: { type: String, maxlength: 50 },
  CREATED_DATE: Date,
  CREATED_MAC_ADDRESS: { type: String, maxlength: 50 },
  MODIFIED_BY: { type: String, maxlength: 50 },
  MODIFIED_DATE: Date,
  MODIFIED_MAC_ADDRESS: { type: String, maxlength: 50 }
}, { collection: 'TBL_CUSTOMER_RECEIPT_INVOICE_DTL' });

// ==================== CREATE MODELS ====================
const models = {};

// Stomaster Models
models.TBL_CUSTOMER_PAYMENT_MODE_MASTER = mongoose.model('TBL_CUSTOMER_PAYMENT_MODE_MASTER', customerPaymentModeMasterSchema);
models.TBL_BILLING_LOCATION_MASTER = mongoose.model('TBL_BILLING_LOCATION_MASTER', billingLocationMasterSchema);
models.TBL_BANK_MASTER = mongoose.model('TBL_BANK_MASTER', bankMasterSchema);
models.TBL_ROLE_MASTER = mongoose.model('TBL_ROLE_MASTER', roleMasterSchema);
models.TBL_CURRENCY_MASTER = mongoose.model('TBL_CURRENCY_MASTER', currencyMasterSchema);
models.TBL_COMPANY_MASTER = mongoose.model('TBL_COMPANY_MASTER', companyMasterSchema);
models.TBL_EXCHANGE_RATE_MASTER = mongoose.model('TBL_EXCHANGE_RATE_MASTER', exchangeRateMasterSchema);
models.TBL_USER_INFO_HDR = mongoose.model('TBL_USER_INFO_HDR', userInfoHdrSchema);
models.TBL_VAT_PERCENTAGE_SETTING = mongoose.model('TBL_VAT_PERCENTAGE_SETTING', vatPercentageSettingSchema);
models.TBL_LOCATION_MASTER = mongoose.model('TBL_LOCATION_MASTER', locationMasterSchema);
models.TBL_STORE_MASTER = mongoose.model('TBL_STORE_MASTER', storeMasterSchema);
models.TBL_USER_TO_STORE_MAPPING = mongoose.model('TBL_USER_TO_STORE_MAPPING', userToStoreMappingSchema);
models.TBL_PAYMENT_MODE_MASTER = mongoose.model('TBL_PAYMENT_MODE_MASTER', paymentModeMasterSchema);
models.TBL_ADDITIONAL_COST_TYPE_MASTER = mongoose.model('TBL_ADDITIONAL_COST_TYPE_MASTER', additionalCostTypeMasterSchema);
models.TBL_PAYMENT_TERM_MASTER = mongoose.model('TBL_PAYMENT_TERM_MASTER', paymentTermMasterSchema);
models.TBL_ACCOUNTS_LEDGER_GROUP_MASTER = mongoose.model('TBL_ACCOUNTS_LEDGER_GROUP_MASTER', accountsLedgerGroupMasterSchema);
models.TBL_ACCOUNTS_HEAD_MASTER = mongoose.model('TBL_ACCOUNTS_HEAD_MASTER', accountsHeadMasterSchema);
models.TBL_PRODUCT_MAIN_CATEGORY_MASTER = mongoose.model('TBL_PRODUCT_MAIN_CATEGORY_MASTER', productMainCategoryMasterSchema);
models.TBL_PRODUCT_SUB_CATEGORY_MASTER = mongoose.model('TBL_PRODUCT_SUB_CATEGORY_MASTER', productSubCategoryMasterSchema);
models.TBL_PRODUCT_MASTER = mongoose.model('TBL_PRODUCT_MASTER', productMasterSchema);
models.TBL_COUNTRY_MASTER = mongoose.model('TBL_COUNTRY_MASTER', countryMasterSchema);
models.TBL_REGION_MASTER = mongoose.model('TBL_REGION_MASTER', regionMasterSchema);
models.TBL_PRODUCT_OPENING_STOCK = mongoose.model('TBL_PRODUCT_OPENING_STOCK', productOpeningStockSchema);
models.TBL_FIELD_HDR = mongoose.model('TBL_FIELD_HDR', fieldHdrSchema);
models.TBL_FIELD_DTL = mongoose.model('TBL_FIELD_DTL', fieldDtlSchema);
models.TBL_PRODUCT_COMPANY_MAIN_CATEGORY_MAPPING = mongoose.model('TBL_PRODUCT_COMPANY_MAIN_CATEGORY_MAPPING', productCompanyMainCategoryMappingSchema);
models.TBL_STORE_PRODUCT_MINIMUM_STOCK = mongoose.model('TBL_STORE_PRODUCT_MINIMUM_STOCK', storeProductMinimumStockSchema);
models.TBL_SUPPLIER_MASTER = mongoose.model('TBL_SUPPLIER_MASTER', supplierMasterSchema);
models.TBL_COMPANY_BANK_ACCOUNT_MASTER = mongoose.model('TBL_COMPANY_BANK_ACCOUNT_MASTER', companyBankAccountMasterSchema);
models.TBL_CHANGE_PASSWORD_LOG = mongoose.model('TBL_CHANGE_PASSWORD_LOG', changePasswordLogSchema);
models.TBL_DISTRICT_MASTER = mongoose.model('TBL_DISTRICT_MASTER', districtMasterSchema);
models.TBL_CUSTOMER_MASTER = mongoose.model('TBL_CUSTOMER_MASTER', customerMasterSchema);
models.TBL_CUSTOMER_ADDRESS_DETAILS = mongoose.model('TBL_CUSTOMER_ADDRESS_DETAILS', customerAddressDetailsSchema);
models.TBL_CUSTOMER_MASTER_FILES_UPLOAD = mongoose.model('TBL_CUSTOMER_MASTER_FILES_UPLOAD', customerMasterFilesUploadSchema);
models.TBL_CUSTOMER_COMPANY_WISE_BILLING_LOCATION_MAPPING = mongoose.model('TBL_CUSTOMER_COMPANY_WISE_BILLING_LOCATION_MAPPING', customerCompanyWiseBillingLocationMappingSchema);
models.TBL_CUSTOMER_PRODUCT_VAT_PERCENTAGE_SETTINGS = mongoose.model('TBL_CUSTOMER_PRODUCT_VAT_PERCENTAGE_SETTINGS', customerProductVatPercentageSettingsSchema);
models.TBL_CUSTOMER_WISE_PRODUCT_PRICE_SETTINGS = mongoose.model('TBL_CUSTOMER_WISE_PRODUCT_PRICE_SETTINGS', customerWiseProductPriceSettingsSchema);
models.TBL_CUSTOMER_CREDIT_LIMIT_DETAILS = mongoose.model('TBL_CUSTOMER_CREDIT_LIMIT_DETAILS', customerCreditLimitDetailsSchema);
models.CUSTOMER_CREDIT_LIMIT_FILE_UPLOAD = mongoose.model('CUSTOMER_CREDIT_LIMIT_FILE_UPLOAD', customerCreditLimitFileUploadSchema);
models.TBL_ACCOUNTS_LEDGER_MASTER = mongoose.model('TBL_ACCOUNTS_LEDGER_MASTER', accountsLedgerMasterSchema);
models.TBL_SALES_PERSON_MASTER = mongoose.model('TBL_SALES_PERSON_MASTER', salesPersonMasterSchema);

// Stoentries Models
models.TBL_PURCHASE_ORDER_HDR = mongoose.model('TBL_PURCHASE_ORDER_HDR', purchaseOrderHdrSchema);
models.TBL_PURCHASE_ORDER_DTL = mongoose.model('TBL_PURCHASE_ORDER_DTL', purchaseOrderDtlSchema);
models.TBL_PURCHASE_ORDER_ADDITIONAL_COST_DETAILS = mongoose.model('TBL_PURCHASE_ORDER_ADDITIONAL_COST_DETAILS', purchaseOrderAdditionalCostDetailsSchema);
models.TBL_PURCHASE_ORDER_FILES_UPLOAD = mongoose.model('TBL_PURCHASE_ORDER_FILES_UPLOAD', purchaseOrderFilesUploadSchema);
models.TBL_PURCHASE_ORDER_CONVERSATION_DTL = mongoose.model('TBL_PURCHASE_ORDER_CONVERSATION_DTL', purchaseOrderConversationDtlSchema);
models.TBL_GOODS_INWARD_GRN_HDR = mongoose.model('TBL_GOODS_INWARD_GRN_HDR', goodsInwardGrnHdrSchema);
models.TBL_GOODS_INWARD_GRN_DTL = mongoose.model('TBL_GOODS_INWARD_GRN_DTL', goodsInwardGrnDtlSchema);
models.TBL_PURCHASE_INVOICE_HDR = mongoose.model('TBL_PURCHASE_INVOICE_HDR', purchaseInvoiceHdrSchema);
models.TBL_PURCHASE_INVOICE_DTL = mongoose.model('TBL_PURCHASE_INVOICE_DTL', purchaseInvoiceDtlSchema);
models.TBL_PURCHASE_INVOICE_ADDITIONAL_COST_DETAILS = mongoose.model('TBL_PURCHASE_INVOICE_ADDITIONAL_COST_DETAILS', purchaseInvoiceAdditionalCostDetailsSchema);
models.TBL_PURCHASE_INVOICE_FILES_UPLOAD = mongoose.model('TBL_PURCHASE_INVOICE_FILES_UPLOAD', purchaseInvoiceFilesUploadSchema);
models.TBL_EXPENSE_HDR = mongoose.model('TBL_EXPENSE_HDR', expenseHdrSchema);
models.TBL_EXPENSE_DTL = mongoose.model('TBL_EXPENSE_DTL', expenseDtlSchema);
models.TBL_SALES_ORDER_HDR = mongoose.model('TBL_SALES_ORDER_HDR', salesOrderHdrSchema);
models.TBL_SALES_ORDER_DTL = mongoose.model('TBL_SALES_ORDER_DTL', salesOrderDtlSchema);
models.TBL_DELIVERY_NOTE_HDR = mongoose.model('TBL_DELIVERY_NOTE_HDR', deliveryNoteHdrSchema);
models.TBL_DELIVERY_NOTE_DTL = mongoose.model('TBL_DELIVERY_NOTE_DTL', deliveryNoteDtlSchema);
models.TBL_TAX_INVOICE_HDR = mongoose.model('TBL_TAX_INVOICE_HDR', taxInvoiceHdrSchema);
models.TBL_TAX_INVOICE_DTL = mongoose.model('TBL_TAX_INVOICE_DTL', taxInvoiceDtlSchema);
models.TBL_CUSTOMER_RECEIPT_HDR = mongoose.model('TBL_CUSTOMER_RECEIPT_HDR', customerReceiptHdrSchema);
models.TBL_CUSTOMER_RECEIPT_INVOICE_DTL = mongoose.model('TBL_CUSTOMER_RECEIPT_INVOICE_DTL', customerReceiptInvoiceDtlSchema);

module.exports = models;