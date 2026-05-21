import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IFormState {
  valid: boolean;
  errors: string;
}

export class Form<T> extends Component<IFormState> {
  protected _submit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this._submit = container.querySelector('button[type=submit]')!;
    this._errors = container.querySelector('.form__errors')!;

    this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });

    this.container.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;

      this.events.emit(`${this.container.name}.${String(field)}:change`, {
        field,
        value,
      });
    });
  }

  set valid(value: boolean) {
    this.setDisabled(this._submit, !value);
  }

  set errors(value: string) {
    this.setText(this._errors, value);
  }

  render(state: Partial<T> & IFormState): HTMLElement {
    super.render(state);
    return this.container;
  }
}