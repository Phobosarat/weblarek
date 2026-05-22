import { ProductCard, ICardActions } from './Card';

export class PreviewCard extends ProductCard {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._description = container.querySelector('.card__text')!;
    this._button = container.querySelector('.card__button')!;

    if (actions?.onClick) {
      this._button.addEventListener('click', actions.onClick);
    }
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set buttonText(value: string) {
    this.setText(this._button, value);
  }

  set price(value: number | null) {
    super.price = value;

    this.setDisabled(this._button, value === null);

    if (value === null) {
      this.setText(this._button, 'Недоступно');
    }
  }
}