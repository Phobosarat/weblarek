import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._list = container.querySelector('.basket__list')!;
    this._total = container.querySelector('.basket__price')!;
    this._button = container.querySelector('.basket__button')!;

    this._button.addEventListener('click', () => {
      this.events.emit('order:open');
    });
  }

  set items(items: HTMLElement[]) {
  this._list.replaceChildren(...items);
  this.setDisabled(this._button, items.length === 0);
}

  set total(value: number) {
    this.setText(this._total, `${value} синапсов`);
  }
}