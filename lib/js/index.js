// @flow

import _PaymentRequest, {
  canMakePayments as _canMakePayments,
} from "./PaymentRequest";
import { PKPaymentButton } from "./PKPaymentButton";

export const ApplePayButton = PKPaymentButton;
export const PaymentRequest = _PaymentRequest;
export const canMakePayments = _canMakePayments;
