import { SvgElementSelection } from "../models/selection";

export function defineOrigin(element: SvgElementSelection, location: [number, number]): void {
  element.attr('transform-origin', `${location[0]}px ${location[1]}px`);
}
