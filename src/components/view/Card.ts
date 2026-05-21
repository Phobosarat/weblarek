import { Component } from '../base/Component';
import { IProduct } from '../../types';
import { categoryMap } from '../../utils/constants';

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _category?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _description?: HTMLElement;
  protected _button?: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._title = container.querySelector('.card__title')!;
    this._price = container.querySelector('.card__price')!;
    this._category = container.querySelector('.card__category') || undefined;
    this._image = container.querySelector('.card__image') || undefined;
    this._description = container.querySelector('.card__text') || undefined;
    this._button = container.querySelector('.card__button') || undefined;

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        this.container.addEventListener('click', actions.onClick);
      }
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price(value: number | null) {
  this.setText(this._price, value !== null ? `${value} синапсов` : 'Бесценно');

  if (this._button) {
    this.setDisabled(this._button, value === null);

    if (value === null) {
      this.setText(this._button, 'Недоступно');
    }
  }
}

  set category(value: string) {
  if (this._category) {
    this.setText(this._category, value);
    this._category.className = 'card__category';

    const category = categoryMap[value as keyof typeof categoryMap];
    this.toggleClass(this._category, category, true);
  }
}

  set image(value: string) {
    if (this._image) {
      this.setImage(this._image, value, this._title.textContent || '');
    }
  }

  set description(value: string) {
    if (this._description) {
      this.setText(this._description, value);
    }
  }
}