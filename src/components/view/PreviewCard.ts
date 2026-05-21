import { Card, ICardActions } from './Card';

export class PreviewCard extends Card {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container, actions);
  }

  set buttonText(value: string) {
    if (this._button) {
      this.setText(this._button, value);
    }
  }
}