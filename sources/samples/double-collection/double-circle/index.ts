import { CircleSelection, GroupSelection } from '../../../models/selection';
import { calculateAnchorLocation, calculateAnchorX, calculateX } from '../../../utils/positioning';
import './index.scss';
import { Anchor } from '../../../constants/positioning';
import { circleFactory } from '../../../utils/shapes';
import { size } from './constants';
import { CursorEvent } from '../../../models/events';
import { getAngle } from '../../../utils/math';
import { Sample } from '../../sample';
import { responsive } from '../../../utils/general';

export class DoubleCircle extends Sample {
  private anchorLocation: [number, number];
  private size: typeof size;

  private wideCircle: CircleSelection;

  constructor(container: HTMLElement) {
    const basicSize: number = size.wideCircle + size.smallDoubleCircle + size.wideCircle;

    super(container, [basicSize, basicSize]);

    this.size = responsive(
      size,
      [this.basicWidth, this.basicHeight],
      [this.svgWidth, this.svgHeight]
    );

    this.anchorLocation = this.createDoubleCircleAnchorLocation();

    this.createWideCircle();
    this.createDoubleCircle();

    this.handleCursorMove();
  }

  private createDoubleCircle(): void {
    const group: GroupSelection = this.group.append('g').classed('double-circle__thin-circle', true);
    const anchorLocation: [number, number] = this.createDoubleCircleAnchorLocation();
    const createCircle = circleFactory(group);

    createCircle(this.size.bigDoubleCircle, this.size.doubleCircleStroke, anchorLocation);
    createCircle(this.size.smallDoubleCircle, this.size.doubleCircleStroke, anchorLocation);
  }

  private createWideCircle(): void {
    const group: GroupSelection = this.group.append('g').classed('double-circle__wide-circle', true);
    const anchorLocation: [number, number] = this.createWideCircleAnchorLocation();
    const createCircle = circleFactory(group);

    this.wideCircle = createCircle(this.size.wideCircle, this.size.wideCircleStroke, anchorLocation);

    this.wideCircle.attr('transform-origin', `${this.anchorLocation[0]}px ${this.anchorLocation[1]}px`);
  }

  private createDoubleCircleAnchorLocation(): [number, number] {
    return calculateAnchorLocation(Anchor.center, [0, 0], [this.width, this.height]);
  }

  private createWideCircleAnchorLocation(): [number, number] {
    const smallCircleXLocation: number = calculateX(Anchor.center, this.anchorLocation[0], this.size.smallDoubleCircle);
  const xLocation: number = smallCircleXLocation + this.size.smallDoubleCircle;
  const xAnchorLocation: number = calculateAnchorX(Anchor.center, xLocation, this.size.wideCircle);

  return [xAnchorLocation, this.anchorLocation[1]];
  }

  private handleCursorMove(): void {
    this.cursorMove$.subscribe((event: CursorEvent) => {
      this.rotate(this.wideCircle, [event.x, event.y], this.anchorLocation);
    });
  }

  private rotate(circle: CircleSelection, cursorLocation: [number, number], origin: [number, number]): void {
    const angleFromCenter: number = getAngle(cursorLocation, origin);

    circle.attr('transform', `rotate(${angleFromCenter})`);
  }
}
