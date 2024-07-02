import { RectSelection, GroupSelection } from '../../../models/selection';
import './index.scss';
import { rectFactory } from '../../../utils/shapes';
import { size } from './constants';
import { CursorEvent } from '../../../models/events';
import { Sample } from '../../sample';
import { responsive } from '../../../utils/general';
import * as d3 from 'd3';
import { getCenterOffset } from '../../../utils/math';

export class RedSquare extends Sample {
  private size: typeof size;

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

    this.createRoundingScale();

    this.createSquare();

    this.handleCursorMove();
  }

  private createRoundingScale(): void {
    this.roundingScale = d3.scaleLinear([this.width / 2, 0], [0, this.size.stroke]);
  }

  private createSquare(): void {
    const group: GroupSelection = this.group.append('g').classed('red-square', true);
    const createRect = rectFactory(group);

    this.square = createRect([this.size.square, this.size.square], this.size.stroke, [0, 0]);
  }

  private handleCursorMove(): void {
    this.cursorMove$.subscribe((event: CursorEvent) => {
      this.round([event.x, event.y]);
    });
  }

  private round(cursorLocation: [number, number]): void {
    const centerDistance: number = this.getCenterDistance(cursorLocation);
    const radius: number = this.roundingScale(centerDistance);

    this.square.attr('rx', radius);
  }

  private getCenterDistance(location: [number, number]): number {
    let xDistance: number = getCenterOffset(location[0], this.width);
    let yDistance: number = getCenterOffset(location[1], this.height);

    return xDistance > yDistance ? xDistance : yDistance;
  }
}
