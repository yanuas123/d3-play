import { CircleSelection, GroupSelection, RectSelection } from "../models/selection";

export function circleFactory(group: GroupSelection) {
  return (size: number, strokeSize: number, location: [number, number]): CircleSelection => {
    const radius: number = size / 2;
    const strokeShiftOut: number = strokeSize / 2;

    const circle = group.append('circle').attr('stroke-width', strokeSize);

    circle.attr('cx', location[0]);
    circle.attr('cy', location[1]);

    circle.attr('r', radius - strokeShiftOut);

    return circle;
  };
}

export function rectFactory(group: GroupSelection) {
  return (size: [number, number], strokeSize: number, location: [number, number]): RectSelection => {
    const strokeShiftOut: number = strokeSize / 2;

    const rect = group.append('rect').attr('stroke-width', strokeSize);

    rect.attr('x', location[0] + strokeShiftOut);
    rect.attr('y', location[1] + strokeShiftOut);

    rect.attr('width', size[0] - strokeSize);
    rect.attr('height', size[1] - strokeSize);

    return rect;
  };
}
