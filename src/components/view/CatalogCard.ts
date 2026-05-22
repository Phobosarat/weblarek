import { ProductCard, ICardActions } from './Card';

export class CatalogCard extends ProductCard {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container, actions);
  }
}