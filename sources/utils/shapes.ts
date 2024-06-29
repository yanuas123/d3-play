import { CircleSelection, GroupSelection } from "../models/selection";

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
