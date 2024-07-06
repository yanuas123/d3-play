import { RectSelection, GroupSelection } from '../../../models/selection';
import './index.scss';
import { rectFactory } from '../../../utils/shapes';
import { size } from './constants';
import { CursorEvent } from '../../../models/events';
import { Sample } from '../../sample';
import { responsive } from '../../../utils/general';
import * as d3 from 'd3';
import { getFromCenterOffset } from '../../../utils/math';
import { calculateAnchorLocation } from '../../../utils/positioning';
import { Anchor } from '../../../constants/positioning';

export class RedSquare extends Sample {
  private readonly anchorLocation: [number, number];
  private readonly size: typeof size;

  private square: RectSelection;

  private roundingScale: d3.ScaleLinear<number, number>;

  constructor(container: HTMLElement) {
    const basicSize: number = size.square;

    super(container, [basicSize, basicSize]);

    this.size = responsive(
      size,
      [this.basicWidth, this.basicHeight],
      [this.svgWidth, this.svgHeight]
    );

    this.anchorLocation = calculateAnchorLocation(Anchor.center, [0, 0], [this.width, this.height]);

    this.createRoundingScale();

    this.createSquare();

    this.handleCursorMove();
  }

  private createRoundingScale(): void {
    this.roundingScale = d3.scaleLinear([this.anchorLocation[0], 0], [0, this.size.stroke]);
  }

  private createSquare(): void {
    const group: GroupSelection = this.group.append('g').classed('red-square', true);
    const createRect = rectFactory(group);

    this.square = createRect([this.size.square, this.size.square], this.size.stroke, [0, 0]);
  }

  private handleCursorMove(): void {
    this.cursorMove$.subscribe((event: CursorEvent) => {
      this.roundSquare([event.x, event.y]);
    });
  }

  private roundSquare(cursorLocation: [number, number]): void {
    const fromCenterDistance: number = this.getFromCenterDistance(cursorLocation);
    const radius: number = this.roundingScale(fromCenterDistance);

    this.square.attr('rx', radius);
  }

  private getFromCenterDistance(location: [number, number]): number {
    let xDistance: number = getFromCenterOffset(location[0], this.width);
    let yDistance: number = getFromCenterOffset(location[1], this.height);

    return xDistance > yDistance ? xDistance : yDistance;
  }
}
