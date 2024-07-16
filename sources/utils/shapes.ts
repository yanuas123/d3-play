import { CircleSelection, EnterSelection, GroupSelection, RectSelection, SliceSelection } from "../models/selection";
import { TransformFunctions, TransformValueTypes } from '../models/attributes';
import * as d3 from 'd3';

export function transformControler(): <Func extends TransformFunctions = any>(
  func: Func,
  value: TransformValueTypes[Func]
) => void {
  const appliedValues: Map<TransformFunctions, TransformValueTypes[TransformFunctions]> = new Map();

  return function (func: TransformFunctions, value: TransformValueTypes[TransformFunctions]) {
    appliedValues.set(func, value);

    if (value === null) {
      appliedValues.delete(func);
    }

    const transformations: string[] = [];

    appliedValues.forEach((v: TransformValueTypes[TransformFunctions], k: TransformFunctions) => {
      switch (k) {
        case 'translate':
          transformations.push(`translate(${v[0]} ${v[1]})`);
          break;
        case 'rotate':
          transformations.push(`rotate(${v})`);
          break;
        default: break;
      }
    });

    this.attr('transform', transformations.join(' '));
  }
}

export function circleFactory(group: GroupSelection | EnterSelection) {
  return (
    size: number,
    strokeSize: number,
    location: [
      number | ((d: any) => number),
      number | ((d: any) => number)
    ]
  ): CircleSelection => {
    const radius: number = size / 2;
    const strokeShiftOut: number = strokeSize / 2;

    const circle = group.append('circle').attr('stroke-width', strokeSize);

    if (typeof location[0] === 'number') {
      circle.attr('cx', location[0]);
    } else {
      circle.attr('cx', (d: any) => {
        return (location[0] as (d: any) => number)(d);
      });
    }

    if (typeof location[1] === 'number') {
      circle.attr('cy', location[1]);
    } else {
      circle.attr('cy', (d: any) => {
        return (location[1] as (d: any) => number)(d);
      });
    }

    circle.attr('r', radius - strokeShiftOut);

    const extendedCircle = circle as CircleSelection;

    extendedCircle.transform = transformControler().bind(circle);

    return extendedCircle;
  };
}

export function rectFactory(group: GroupSelection | EnterSelection) {
  return (
    size: [number, number],
    strokeSize: number,
    location: [
      number | ((d: any) => number),
      number | ((d: any) => number)
    ]
  ): RectSelection => {
    const strokeShiftOut: number = strokeSize / 2;

    const rect = group.append('rect').attr('stroke-width', strokeSize);

    if (typeof location[0] === 'number') {
      rect.attr('x', location[0] + strokeShiftOut);
    } else {
      rect.attr('x', (d: any) => {
        return (location[0] as (d: any) => number)(d) + strokeShiftOut;
      });
    }

    if (typeof location[1] === 'number') {
      rect.attr('y', location[1] + strokeShiftOut);
    } else {
      rect.attr('y', (d: any) => {
        return (location[1] as (d: any) => number)(d) + strokeShiftOut;
      });
    }

    rect.attr('width', size[0] - strokeSize);
    rect.attr('height', size[1] - strokeSize);

    const extendedRect = rect as RectSelection;

    extendedRect.transform = transformControler().bind(rect);

    return extendedRect;
  };
}

export function sliceFactory(group: GroupSelection) {
  return (diameter: number, strokeSize: number, location: [number, number], rotate?: number): SliceSelection => {
    const strokeShiftOut: number = strokeSize / 2;

    const arc: d3.Arc<any, d3.DefaultArcObject> = d3.arc()
      .innerRadius(0)
      .outerRadius(diameter / 2 - strokeShiftOut)
      .startAngle(0)
      .endAngle(Math.PI);

    const path = group.append('path').attr('d', arc);

    path.attr('stroke-width', strokeSize);

    const extendedSlice = path as SliceSelection;

    extendedSlice.transform = transformControler().bind(path);
    extendedSlice.attr('transform-origin', `-${strokeShiftOut} -${strokeShiftOut}`);

    extendedSlice.transform('translate', location);

    if (rotate) {
      extendedSlice.transform('rotate', rotate);
    }

    return extendedSlice;
  };
}
