import { Component } from '../base/Component';

interface IPage {
  catalog: HTMLElement[];
  locked: boolean;
}

export class Page extends Component<IPage> {
  protected _catalog: HTMLElement;
  protected _wrapper: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._catalog = container.querySelector('.gallery')!;
    this._wrapper = container.querySelector('.page__wrapper')!;
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items);
  }

  set locked(value: boolean) {
    this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
  }
}