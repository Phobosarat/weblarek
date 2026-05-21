/**
 * Базовый компонент
 */
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
    element.classList.toggle(className, force);
    }
    // Инструментарий для работы с DOM в дочерних компонентах
    protected setText(element: HTMLElement, value: unknown) {
    if (element) {
      element.textContent = String(value);
    }
    }

    setDisabled(element: HTMLElement, state: boolean) {
    if (element) {
      if (state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
    }
    // Установить изображение с альтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}
