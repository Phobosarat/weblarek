import { Component } from '../base/Component';

interface ISuccess {
  total: number;
}

interface ISuccessActions {
  onClick: () => void;
}

export class Success extends Component<ISuccess> {
  protected _closeButton: HTMLButtonElement;
  protected _total: HTMLElement;

  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    this._closeButton = container.querySelector('.order-success__close')!;
    this._total = container.querySelector('.order-success__description')!;

    this._closeButton.addEventListener('click', actions.onClick);
  }

  set total(value: number) {
    this.setText(this._total, `Списано ${value} синапсов`);
  }
}