// @flow

// Types
import type {
  PaymentComplete,
  PaymentDetailsInit,
  PaymentAddress,
  BillingAddress,
  ErrorPayment
} from './types';

// Modules
import NativePayments from './NativePayments';

export default class PaymentResponse {
  // Internal Slots
  _requestId: string;
  _methodName: string;
  _details: PaymentDetailsInit;
  _shippingAddress: null | PaymentAddress;
  _billingAddress: null | BillingAddress;
  _shippingOption: null | string;
  _payerName: null | string;
  _payerPhone: null | string;
  _payerEmail: null | string;
  _completeCalled: boolean;

  constructor(paymentResponse: Object) {
    // Set properties as readOnly
    this._requestId = paymentResponse.requestId;
    this._methodName = paymentResponse.methodName;
    this._details = paymentResponse.details;
    this._shippingAddress = paymentResponse.shippingAddress;
    this._billingAddress = paymentResponse.billingAddress;
    this._shippingOption = paymentResponse.shippingOption;
    this._payerName = paymentResponse.payerName;
    this._payerPhone = paymentResponse.payerPhone;
    this._payerEmail = paymentResponse.payerEmail;

    // Internal Slots
    this._completeCalled = false;
  }

  // https://www.w3.org/TR/payment-request/#requestid-attribute
  get requestId(): string {
    return this._requestId;
  }

  // https://www.w3.org/TR/payment-request/#methodname-attribute
  get methodName(): string {
    return this._methodName;
  }

  // https://www.w3.org/TR/payment-request/#details-attribute
  get details(): PaymentDetailsInit {
    return this._details;
  }

  // https://www.w3.org/TR/payment-request/#shippingaddress-attribute-1
  get shippingAddress(): null | PaymentAddress {
    return this._shippingAddress;
  }

  // https://www.w3.org/TR/payment-request/#shippingaddress-attribute-1
  get billingAddress(): null | BillingAddress {
    return this._billingAddress;
  }

  // https://www.w3.org/TR/payment-request/#shippingoption-attribute-1
  get shippingOption(): null | string {
    return this._shippingOption;
  }

  // https://www.w3.org/TR/payment-request/#payername-attribute
  get payerName(): null | string {
    return this._payerName;
  }

  // https://www.w3.org/TR/payment-request/#payerphone-attribute
  get payerPhone(): null | string {
    return this._payerPhone;
  }

  // https://www.w3.org/TR/payment-request/#payeremail-attribute
  get payerEmail(): null | string {
    return this._payerEmail;
  }

  // https://www.w3.org/TR/payment-request/#complete-method
  complete(paymentStatus: PaymentComplete, error?: ErrorPayment) {
    if (this._completeCalled === true) {
      throw new Error('InvalidStateError');
    }

    this._completeCalled = true;

    return new Promise((resolve, reject) => {
      return NativePayments.complete(paymentStatus, error, () => {
        return resolve(undefined);
      });
    });
  }
}
