import { Component } from '../base/Component';

interface IHeader {
  counter: number;
}

interface IHeaderActions {
  onClick: () => void;
}

export class Header extends Component<IHeader> {
  protected _counter: HTMLElement;
  protected _basketButton: HTMLElement;

  constructor(container: HTMLElement, actions?: IHeaderActions) {
    super(container);

    this._counter = container.querySelector('.header__basket-counter')!;
    this._basketButton = container.querySelector('.header__basket')!;

    this._basketButton.addEventListener('click', () => {
      actions?.onClick();
    });
  }

  set counter(value: number) {
    this.setText(this._counter, value);
  }
}