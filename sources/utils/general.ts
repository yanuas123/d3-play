import { ID_ATTRIBUTE_NAME } from '../constants/general';
import { ApplyDataFn } from '../models/general';
import { getDifferenceMultiplier } from './math';
import { getAxisForContain } from './positioning';

export function getElement<T extends HTMLElement = any>(id: string, ancestor?: HTMLElement): T {
  const selector: string = `[${ID_ATTRIBUTE_NAME}="${id}"]`;

  return (ancestor || document).querySelector(selector) as T;
}

export function setElementText(text: string, element: HTMLElement): void {
  element.innerText = text;
}

export function toggleElementClass(clas: string, show: boolean, element: HTMLElement): void {
  if (show) {
    element.classList.add(clas);
  } else {
    element.classList.remove(clas);
  }
}

export function elementClassToggler(clas: string, element: HTMLElement) {
  return {
    show(value: boolean): void {
      toggleElementClass(clas, value, element);
    }
  };
}

export class Template<T extends HTMLElement = any, Data = any> {
  private template: T;
  private parent: HTMLElement;

  constructor(id: string, ancestor: HTMLElement, private applyDataFn?: ApplyDataFn<T, Data>) {
    this.initialize(id, ancestor);
  }

  public insert(withData?: Data): T {
    const templateClone: T = this.cloneTemplate();

    if (this.applyDataFn) {
      this.applyDataFn(templateClone, withData as Data);
    }

    this.parent.appendChild(templateClone);

    return templateClone;
  }

  private initialize(id: string, ancestor: HTMLElement): void {
    const sourceElement: HTMLElement = getElement(id, ancestor);

    this.template = sourceElement.cloneNode(true) as T;
    this.parent = sourceElement.parentNode as HTMLElement;

    this.parent.removeChild(sourceElement);
  }

  private cloneTemplate(): T {
    return this.template.cloneNode(true) as T;
  }
}

export function responsive<T extends { [key: string]: number } = any>(
  values: T,
  size: [number, number],
  container: [number, number]
): T {
  const targetAxis: 0 | 1 = getAxisForContain(container, size);
  const multiplier: number = getDifferenceMultiplier(container[targetAxis], size[targetAxis]);

  return Object.keys(values).reduce((acc, key: string) => {
    return {
      ...acc,
      [key]: values[key] * multiplier
    };
  }, {} as T);
}
