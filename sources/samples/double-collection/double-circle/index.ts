import { CircleSelection, GroupSelection } from '../../../models/selection';
import { calculateAnchorLocation, calculateAnchorX, calculateX } from '../../../utils/positioning';
import './index.scss';
import { Anchor } from '../../../constants/positioning';
import { circleFactory } from '../../../utils/shapes';
import { DOUBLE_CIRCLE_ANCHOR, WIDE_CIRCLE_ANCHOR, size } from './constants';
import { CursorEvent } from '../../../models/events';
import { getAngle } from '../../../utils/math';
import { Sample } from '../../sample';
import { responsive } from '../../../utils/general';
import { defineOrigin } from '../../../utils/transformation';

export class DoubleCircle extends Sample {
  private readonly anchorLocation: [number, number];
  private readonly size: typeof size;

  private wideCircle: CircleSelection;

  constructor(container: HTMLElement) {
    const basicSize: number = size.wideCircle + size.smallDoubleCircle + size.wideCircle;

    super(container, [basicSize, basicSize]);

    this.size = responsive(
      size,
      [this.basicWidth, this.basicHeight],
      [this.svgWidth, this.svgHeight]
    );

    this.anchorLocation = calculateAnchorLocation(Anchor.center, [0, 0], [this.width, this.height]);

    this.createWideCircle();
    this.createDoubleCircle();

    this.handleCursorMove();
  }

  private get doubleCircleAnchorLocation(): [number, number] {
    return this.anchorLocation;
  }

  private get wideCircleAnchorLocation(): [number, number] {
    const smallCircleXLocation: number = calculateX(
      DOUBLE_CIRCLE_ANCHOR,
      this.doubleCircleAnchorLocation[0],
      this.size.smallDoubleCircle
    );
    const xLocation: number = smallCircleXLocation + this.size.smallDoubleCircle;
    const xAnchorLocation: number = calculateAnchorX(WIDE_CIRCLE_ANCHOR, xLocation, this.size.wideCircle);

    return [xAnchorLocation, this.doubleCircleAnchorLocation[1]];
  }

  private createDoubleCircle(): void {
    const group: GroupSelection = this.group.append('g').classed('double-circle__thin-circle', true);
    const createCircle = circleFactory(group);

    createCircle(this.size.bigDoubleCircle, this.size.doubleCircleStroke, this.doubleCircleAnchorLocation);
    createCircle(this.size.smallDoubleCircle, this.size.doubleCircleStroke, this.doubleCircleAnchorLocation);
  }

  private createWideCircle(): void {
    const group: GroupSelection = this.group.append('g').classed('double-circle__wide-circle', true);
    const createCircle = circleFactory(group);

    this.wideCircle = createCircle(this.size.wideCircle, this.size.wideCircleStroke, this.wideCircleAnchorLocation);

    defineOrigin(this.wideCircle, this.anchorLocation);
  }

  private handleCursorMove(): void {
    this.cursorMove$.subscribe((event: CursorEvent) => {
      this.rotate(this.wideCircle, [event.x, event.y], this.anchorLocation);
    });
  }

  private rotate(circle: CircleSelection, cursorLocation: [number, number], origin: [number, number]): void {
    const angleFromCenter: number = getAngle(cursorLocation, origin);

    circle.transform('rotate', angleFromCenter);
  }
}
