import './index.scss';
import { GroupSelection, RectSelection } from '../../../models/selection';
import {
  calculateAnchorLocation,
  calculateLocation,
  getFromCenterOffsetHorizontalDirection,
  getFromCenterOffsetVerticalDirection
} from '../../../utils/positioning';
import { Anchor } from '../../../constants/positioning';
import { circleFactory, rectFactory } from '../../../utils/shapes';
import { AXIS_POINTS_COUNT, size } from './constants';
import { CursorEvent } from '../../../models/events';
import { Sample } from '../../sample';
import { responsive } from '../../../utils/general';
import { defineOrigin } from '../../../utils/transformation';

export class PointsAndSquare extends Sample {
  private readonly anchorLocation: [number, number];
  private readonly size: typeof size;

  private square: RectSelection;

  constructor(container: HTMLElement) {
    const basicSize: number = size.squareShift + size.points + size.squareShift;

    super(container, [basicSize, basicSize]);

    this.size = responsive(
      size,
      [this.basicWidth, this.basicHeight],
      [this.svgWidth, this.svgHeight]
    );

    this.anchorLocation = calculateAnchorLocation(Anchor.center, [0, 0], [this.width, this.height]);

    this.createPoints();
    this.createSquare();

    this.handleCursorMove();
  }

  private get pointsLocation(): [number, number] {
    return [
      this.anchorLocation[0] - (this.size.points / 2),
      this.anchorLocation[1] - (this.size.points / 2)
    ];
  }

  private get squareLocation(): [number, number] {
    return calculateLocation(Anchor.center, this.anchorLocation, [this.size.square, this.size.square]);
  }

  private createSquare(): void {
    const group: GroupSelection = this.group.append('g').classed('points-and-square__square', true);
    const createRect = rectFactory(group);

    this.square = createRect([this.size.square, this.size.square], this.size.squareStroke, this.squareLocation);

    this.square.classed('points-and-square__square-element', true);
    defineOrigin(this.square, this.anchorLocation);
  }

  private createPoints(): void {
    const group: GroupSelection = this.group.append('g').classed('points-and-square__points', true);
    const createCircle = circleFactory(group);

    const step: number = this.size.points / (AXIS_POINTS_COUNT - 1);
    const pointsScale: number[] = [];

    for (let i = 0; i < AXIS_POINTS_COUNT; i++) {
      pointsScale.push(this.pointsLocation[0] + step * i);
    }

    pointsScale.forEach((y: number) => {
      pointsScale.forEach((x: number) => {
        createCircle(this.size.point, 0, [x, y]);
      });
    });
  }

  private handleCursorMove(): void {
    this.cursorMove$.subscribe((event: CursorEvent) => {
      this.moveToSide(this.square, [event.x, event.y]);
    });
  }

  private moveToSide(square: RectSelection, cursorLocation: [number, number]): void {
    const horizontalShiftToSide: 'left' | 'right' = getFromCenterOffsetHorizontalDirection(cursorLocation[0], this.width);
    const verticalShiftToSide: 'top' | 'bottom' = getFromCenterOffsetVerticalDirection(cursorLocation[1], this.height);

    const translateValue: [number, number] = [0, 0];

    if (horizontalShiftToSide === 'left') {
      translateValue[0] = -this.size.squareShift;
    }

    if (horizontalShiftToSide === 'right') {
      translateValue[0] = this.size.squareShift;
    }

    if (verticalShiftToSide === 'top') {
      translateValue[1] = -this.size.squareShift;
    }

    if (verticalShiftToSide === 'bottom') {
      translateValue[1] = this.size.squareShift;
    }

    square.transform('translate', translateValue);
  }
}
