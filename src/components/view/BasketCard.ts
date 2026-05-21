import { Card, ICardActions } from './Card';

export class BasketCard extends Card {
  protected _index: HTMLElement;
  protected _deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._index = container.querySelector('.basket__item-index')!;
    this._deleteButton = container.querySelector('.basket__item-delete')!;

    if (actions?.onClick) {
      this._deleteButton.addEventListener('click', actions.onClick);
    }
  }

  set index(value: number) {
    this.setText(this._index, value);
  }
}