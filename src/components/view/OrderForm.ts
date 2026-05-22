import { IEvents } from '../base/events';
import { Form } from './Form';
import { TPayment } from '../../types';

interface IOrderForm {
  payment: 'card' | 'cash' | null;
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  protected _cardButton: HTMLButtonElement;
  protected _cashButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._cardButton = container.querySelector('button[name=card]')!;
    this._cashButton = container.querySelector('button[name=cash]')!;

    this._cardButton.addEventListener('click', () => {
      this.events.emit('order.payment:change', {
        field: 'payment',
        value: 'card',
      });
    });

    this._cashButton.addEventListener('click', () => {
      this.events.emit('order.payment:change', {
        field: 'payment',
        value: 'cash',
      });
    });
  }

  set payment(value: TPayment) {
    this.toggleClass(this._cardButton, 'button_alt-active', value === 'card');
    this.toggleClass(this._cashButton, 'button_alt-active', value === 'cash');
  }

  set address(value: string) {
    const input = this.container.elements.namedItem('address') as HTMLInputElement;
    input.value = value;
  }
}