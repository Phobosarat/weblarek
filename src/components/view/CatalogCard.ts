import { Card, ICardActions } from './Card';

export class CatalogCard extends Card {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container, actions);
  }
}