import { IEvents } from '../base/events';
import { Form } from './Form';

interface IContactsForm {
  email: string;
  phone: string;
}

export class ContactsForm extends Form<IContactsForm> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set email(value: string) {
    const input = this.container.elements.namedItem('email') as HTMLInputElement;
    input.value = value;
  }

  set phone(value: string) {
    const input = this.container.elements.namedItem('phone') as HTMLInputElement;
    input.value = value;
  }
}