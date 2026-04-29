import { IBuyer, TBuyerErrors } from '../../../types';

export class BuyerModel {
  protected data: IBuyer = {
    payment: null,
    email: '',
    phone: '',
    address: '',
  };

  setData(data: Partial<IBuyer>): void {
    this.data = {
      ...this.data,
      ...data,
    };
  }

  getData(): IBuyer {
    return this.data;
  }

  clear(): void {
    this.data = {
      payment: null,
      email: '',
      phone: '',
      address: '',
    };
  }

  validate(): TBuyerErrors {
    const errors: TBuyerErrors = {};

    if (!this.data.payment) {
      errors.payment = 'Не выбран способ оплаты';
    }

    if (!this.data.address) {
      errors.address = 'Укажите адрес';
    }

    if (!this.data.email) {
      errors.email = 'Укажите email';
    }

    if (!this.data.phone) {
      errors.phone = 'Укажите телефон';
    }

    return errors;
  }
}