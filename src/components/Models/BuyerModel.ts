import { IBuyer, TBuyerErrors } from '../../types';
import { IEvents } from '../base/events';

export class BuyerModel {
  protected data: IBuyer = {
    payment: null,
    email: '',
    phone: '',
    address: '',
  };

  constructor(protected events: IEvents) {}

  setData(data: Partial<IBuyer>): void {
    this.data = {
      ...this.data,
      ...data,
    };

    this.events.emit('buyer:changed', {
      buyer: this.data,
    });

    this.events.emit('formErrors:changed', {
      errors: this.validate(),
    });
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

    this.events.emit('buyer:changed', {
      buyer: this.data,
    });

    this.events.emit('formErrors:changed', {
      errors: this.validate(),
    });
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