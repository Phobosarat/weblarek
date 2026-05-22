import { Component } from '../base/Component';
import { IProduct } from '../../types';
import { categoryMap } from '../../utils/constants';

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._title = container.querySelector('.card__title')!;
    this._price = container.querySelector('.card__price')!;
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price(value: number | null) {
    this.setText(this._price, value !== null ? `${value} синапсов` : 'Бесценно');
  }
}

export class ProductCard extends Card {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._category = container.querySelector('.card__category')!;
    this._image = container.querySelector('.card__image')!;

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set category(value: string) {
    this.setText(this._category, value);
    this._category.className = 'card__category';

    const category = categoryMap[value as keyof typeof categoryMap];
    this.toggleClass(this._category, category, true);
  }

  set image(value: string) {
    this.setImage(this._image, value, this._title.textContent || '');
  }
}