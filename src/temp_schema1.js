// examples/aggregations.js
const models = require('../models/index');

// 1. Get Purchase Order with all details (header, details, additional costs, files)
async function getPurchaseOrderWithDetails(poRefNo) {
  const result = await models.TBL_PURCHASE_ORDER_HDR.aggregate([
    { $match: { PO_REF_NO: poRefNo } },
    {
      $lookup: {
        from: 'TBL_PURCHASE_ORDER_DTL',
        localField: 'PO_REF_NO',
        foreignField: 'PO_REF_NO',
        as: 'details'
      }
    },
    {
      $lookup: {
        from: 'TBL_PURCHASE_ORDER_ADDITIONAL_COST_DETAILS',
        localField: 'PO_REF_NO',
        foreignField: 'PO_REF_NO',
        as: 'additionalCosts'
      }
    },
    {
      $lookup: {
        from: 'TBL_PURCHASE_ORDER_FILES_UPLOAD',
        localField: 'PO_REF_NO',
        foreignField: 'PO_REF_NO',
        as: 'files'
      }
    },
    {
      $lookup: {
        from: 'TBL_PURCHASE_ORDER_CONVERSATION_DTL',
        localField: 'PO_REF_NO',
        foreignField: 'PO_REF_NO',
        as: 'conversations'
      }
    },
    {
      $lookup: {
        from: 'TBL_COMPANY_MASTER',
        localField: 'COMPANY_ID',
        foreignField: 'Company_Id',
        as: 'company'
      }
    },
    {
      $lookup: {
        from: 'TBL_SUPPLIER_MASTER',
        localField: 'SUPPLIER_ID',
        foreignField: 'Supplier_Id',
        as: 'supplier'
      }
    },
    { $unwind: { path: '$company', preserveNullAndEmptyArrays: true } },
    { $unwind: { path: '$supplier', preserveNullAndEmptyArrays: true } }
  ]);
  return result[0];
}

// 2. Get Customer with all related data (billing location, region, country, district)
async function getCustomerWithDetails(customerId) {
  const result = await models.TBL_CUSTOMER_MASTER.aggregate([
    { $match: { Customer_Id: customerId } },
    {
      $lookup: {
        from: 'TBL_BILLING_LOCATION_MASTER',
        localField: 'Billing_Location_Id',
        foreignField: 'Billing_Location_Id',
        as: 'billingLocation'
      }
    },
    {
      $lookup: {
        from: 'TBL_COUNTRY_MASTER',
        localField: 'Country_Id',
        foreignField: 'Country_Id',
        as: 'country'
      }
    },
    {
      $lookup: {
        from: 'TBL_REGION_MASTER',
        localField: 'Region_Id',
        foreignField: 'REGION_ID',
        as: 'region'
      }
    },
    {
      $lookup: {
        from: 'TBL_DISTRICT_MASTER',
        localField: 'District_Id',
        foreignField: 'District_id',
        as: 'district'
      }
    },
    {
      $lookup: {
        from: 'TBL_CURRENCY_MASTER',
        localField: 'currency_id',
        foreignField: 'CURRENCY_ID',
        as: 'currency'
      }
    },
    {
      $lookup: {
        from: 'TBL_CUSTOMER_ADDRESS_DETAILS',
        localField: 'Customer_Id',
        foreignField: 'Customer_Id',
        as: 'additionalAddresses'
      }
    },
    {
      $lookup: {
        from: 'TBL_CUSTOMER_MASTER_FILES_UPLOAD',
        localField: 'Customer_Id',
        foreignField: 'Customer_Id',
        as: 'files'
      }
    },
    {
      $lookup: {
        from: 'TBL_CUSTOMER_CREDIT_LIMIT_DETAILS',
        localField: 'Customer_Id',
        foreignField: 'Customer_Id',
        as: 'creditLimits'
      }
    },
    {
      $unwind: { path: '$billingLocation', preserveNullAndEmptyArrays: true },
      $unwind: { path: '$country', preserveNullAndEmptyArrays: true },
      $unwind: { path: '$region', preserveNullAndEmptyArrays: true },
      $unwind: { path: '$district', preserveNullAndEmptyArrays: true },
      $unwind: { path: '$currency', preserveNullAndEmptyArrays: true }
    }
  ]);
  return result[0];
}

// 3. Get Sales Order with product details and customer info
async function getSalesOrderWithDetails(salesOrderRefNo) {
  const result = await models.TBL_SALES_ORDER_HDR.aggregate([
    { $match: { SALES_ORDER_REF_NO: salesOrderRefNo } },
    {
      $lookup: {
        from: 'TBL_SALES_ORDER_DTL',
        localField: 'SALES_ORDER_REF_NO',
        foreignField: 'SALES_ORDER_REF_NO',
        as: 'details'
      }
    },
    {
      $lookup: {
        from: 'TBL_COMPANY_MASTER',
        localField: 'COMPANY_ID',
        foreignField: 'Company_Id',
        as: 'company'
      }
    },
    {
      $lookup: {
        from: 'TBL_CUSTOMER_MASTER',
        localField: 'CUSTOMER_ID',
        foreignField: 'Customer_Id',
        as: 'customer'
      }
    },
    {
      $lookup: {
        from: 'TBL_STORE_MASTER',
        localField: 'STORE_ID',
        foreignField: 'Store_Id',
        as: 'store'
      }
    },
    {
      $lookup: {
        from: 'TBL_SALES_PERSON_MASTER',
        localField: 'SALES_PERSON_EMP_ID',
        foreignField: 'Sales_Person_ID',
        as: 'salesPerson'
      }
    },
    {
      $unwind: { path: '$company', preserveNullAndEmptyArrays: true },
      $unwind: { path: '$customer', preserveNullAndEmptyArrays: true },
      $unwind: { path: '$store', preserveNullAndEmptyArrays: true },
      $unwind: { path: '$salesPerson', preserveNullAndEmptyArrays: true }
    },
    {
      $addFields: {
        'details': {
          $map: {
            input: '$details',
            as: 'detail',
            in: {
              $mergeObjects: [
                '$$detail',
                {
                  productDetails: {
                    $arrayElemAt: [
                      {
                        $map: {
                          input: {
                            $filter: {
                              input: { $literal: [] }, // This would need to be populated separately
                              cond: { $eq: ['$$this.PRODUCT_ID', '$$detail.PRODUCT_ID'] }
                            }
                          },
                          as: 'product',
                          in: '$$product'
                        }
                      },
                      0
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    }
  ]);
  return result[0];
}

// 4. Get Invoice with payment receipts
async function getInvoiceWithReceipts(taxInvoiceRefNo) {
  const result = await models.TBL_TAX_INVOICE_HDR.aggregate([
    { $match: { TAX_INVOICE_REF_NO: taxInvoiceRefNo } },
    {
      $lookup: {
        from: 'TBL_TAX_INVOICE_DTL',
        localField: 'TAX_INVOICE_REF_NO',
        foreignField: 'TAX_INVOICE_REF_NO',
        as: 'details'
      }
    },
    {
      $lookup: {
        from: 'TBL_CUSTOMER_RECEIPT_INVOICE_DTL',
        localField: 'TAX_INVOICE_REF_NO',
        foreignField: 'TAX_INVOICE_REF_NO',
        as: 'receiptDetails'
      }
    },
    {
      $lookup: {
        from: 'TBL_CUSTOMER_RECEIPT_HDR',
        let: { receiptRefs: '$receiptDetails.RECEIPT_REF_NO' },
        pipeline: [
          { $match: { $expr: { $in: ['$RECEIPT_REF_NO', '$$receiptRefs'] } } },
          {
            $lookup: {
              from: 'TBL_CUSTOMER_PAYMENT_MODE_MASTER',
              localField: 'PAYMENT_MODE_ID',
              foreignField: 'PAYMENT_MODE_ID',
              as: 'paymentMode'
            }
          },
          {
            $lookup: {
              from: 'TBL_BANK_MASTER',
              localField: 'CR_BANK_CASH_ID',
              foreignField: 'BANK_ID',
              as: 'crBank'
            }
          }
        ],
        as: 'receipts'
      }
    },
    {
      $addFields: {
        totalReceived: { $sum: '$receiptDetails.RECEIPT_INVOICE_ADJUST_AMOUNT' },
        outstandingAmount: {
          $subtract: ['$FINAL_SALES_AMOUNT', { $sum: '$receiptDetails.RECEIPT_INVOICE_ADJUST_AMOUNT' }]
        }
      }
    }
  ]);
  return result[0];
}

// 5. Complex aggregation: Customer credit limit status with aging
async function getCustomerCreditStatus(customerId) {
  const result = await models.TBL_CUSTOMER_CREDIT_LIMIT_DETAILS.aggregate([
    { $match: { Customer_Id: customerId, Status_Master: 'ACTIVE' } },
    { $sort: { Created_Date: -1 } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'TBL_CUSTOMER_MASTER',
        localField: 'Customer_Id',
        foreignField: 'Customer_Id',
        as: 'customer'
      }
    },
    { $unwind: '$customer' },
    {
      $lookup: {
        from: 'TBL_TAX_INVOICE_HDR',
        let: { customerId: '$Customer_Id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$CUSTOMER_ID', '$$customerId'] },
              STATUS_ENTRY: 'APPROVED'
            }
          },
          {
            $lookup: {
              from: 'TBL_CUSTOMER_RECEIPT_INVOICE_DTL',
              localField: 'TAX_INVOICE_REF_NO',
              foreignField: 'TAX_INVOICE_REF_NO',
              as: 'receipts'
            }
          },
          {
            $addFields: {
              paidAmount: { $sum: '$receipts.RECEIPT_INVOICE_ADJUST_AMOUNT' },
              invoiceAge: {
                $divide: [
                  { $subtract: [new Date(), '$INVOICE_DATE'] },
                  1000 * 60 * 60 * 24 // Convert to days
                ]
              }
            }
          },
          {
            $addFields: {
              outstanding: { $subtract: ['$FINAL_SALES_AMOUNT', '$paidAmount'] },
              isOverdue: {
                $and: [
                  { $gt: ['$invoiceAge', '$$ROOT.Approved_Credit_Limit_Days'] },
                  { $gt: [{ $subtract: ['$FINAL_SALES_AMOUNT', '$paidAmount'] }, 0] }
                ]
              }
            }
          },
          { $match: { outstanding: { $gt: 0 } } }
        ],
        as: 'openInvoices'
      }
    },
    {
      $addFields: {
        totalOutstanding: { $sum: '$openInvoices.outstanding' },
        overdueInvoices: {
          $filter: {
            input: '$openInvoices',
            cond: '$$this.isOverdue'
          }
        },
        totalOverdue: {
          $sum: {
            $map: {
              input: {
                $filter: {
                  input: '$openInvoices',
                  cond: '$$this.isOverdue'
                }
              },
              as: 'invoice',
              in: '$$invoice.outstanding'
            }
          }
        }
      }
    }
  ]);
  return result[0];
}

module.exports = {
  getPurchaseOrderWithDetails,
  getCustomerWithDetails,
  getSalesOrderWithDetails,
  getInvoiceWithReceipts,
  getCustomerCreditStatus
};