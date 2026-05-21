import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export class Page extends Component<IPage> {
  protected _counter: HTMLElement;
  protected _catalog: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basketButton: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = container.querySelector('.header__basket-counter')!;
    this._catalog = container.querySelector('.gallery')!;
    this._wrapper = container.querySelector('.page__wrapper')!;
    this._basketButton = container.querySelector('.header__basket')!;

    this._basketButton.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set counter(value: number) {
    this.setText(this._counter, value);
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set locked(value: boolean) {
    this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
  }
}