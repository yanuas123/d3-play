import { CircleSelection, GroupSelection, SliceSelection } from '../../../models/selection';
import { calculateAnchorLocation, calculateAnchorX, calculateX, getFromCenterOffsetHorizontalDirection } from '../../../utils/positioning';
import './index.scss';
import { Anchor } from '../../../constants/positioning';
import { sliceFactory } from '../../../utils/shapes';
import { BASIC_SLICE_ROTATION, SLIDING_SLICE_ROTATION, size } from './constants';
import { CursorEvent } from '../../../models/events';
import { getAngle } from '../../../utils/math';
import { Sample } from '../../sample';
import { responsive } from '../../../utils/general';
import { sliceDiameterProjectionalSize, sliceProjectionalSize } from './utils';
import { defineOrigin } from '../../../utils/transformation';

export class SlidingSlices extends Sample {
  private readonly anchorLocation: [number, number];
  private readonly size: typeof size;

  private slidingSlice: SliceSelection;

  private _slidingSliceAnchorLocation: [number, number];

  constructor(container: HTMLElement) {
    const basicSize: number = sliceProjectionalSize(size.sliceDiameter) * 2;

    super(container, [basicSize, basicSize]);

    this.size = responsive(
      size,
      [this.basicWidth, this.basicHeight],
      [this.svgWidth, this.svgHeight]
    );

    this.anchorLocation = calculateAnchorLocation(Anchor.center, [0, 0], [this.width, this.height]);

    this.createBasicSlice();
    this.createSlidingSlice();

    this.handleCursorMove();
  }

  private get basicSliceAnchorLocation(): [number, number] {
    return this.anchorLocation;
  }

  private get slidingSliceAnchorLocation(): [number, number] {
    return this._slidingSliceAnchorLocation || this.anchorLocation;
  }

  private createBasicSlice(): void {
    const group: GroupSelection = this.group.append('g').classed('sliding-slices__basic-slice', true);
    const createSlice = sliceFactory(group);

    createSlice(this.size.sliceDiameter, 0, this.basicSliceAnchorLocation, BASIC_SLICE_ROTATION);
  }

  private createSlidingSlice(): void {
    const group: GroupSelection = this.group.append('g').classed('sliding-slices__sliding-slice', true);
    const createSlice = sliceFactory(group);

    this.slidingSlice = createSlice(
      this.size.sliceDiameter,
      this.size.slidingSliceStroke,
      this.slidingSliceAnchorLocation,
      SLIDING_SLICE_ROTATION
    );
  }

  private relocateSlidingSlice(): void {
    this.slidingSlice.transform('translate', this.slidingSliceAnchorLocation);
  }

  private changeSlidingSliceAnchorLocation(cursorLocation: [number, number]): void {
    const fromCenterDirection: 'left' | 'right' = getFromCenterOffsetHorizontalDirection(cursorLocation[0], this.width);

    this.slidingSlice.classed('sliding-slices__sliding-slice--to-left', false);
    this.slidingSlice.classed('sliding-slices__sliding-slice--to-right', false);

    if (fromCenterDirection === 'left') {
      this._slidingSliceAnchorLocation = this.getBasicSliceLeftAngleLocation();
      this.slidingSlice.classed('sliding-slices__sliding-slice--to-left', true);
    }

    if (fromCenterDirection === 'right') {
      this._slidingSliceAnchorLocation = this.getBasicSliceRightAngleLocation();
      this.slidingSlice.classed('sliding-slices__sliding-slice--to-right', true);
    }
  }

  private handleCursorMove(): void {
    this.cursorMove$.subscribe((event: CursorEvent) => {
      this.changeSlidingSliceAnchorLocation([event.x, event.y]);
      this.relocateSlidingSlice();
    });
  }

  private getBasicSliceLeftAngleLocation(): [number, number] {
    const basicSliceDiameterProjectionalSize: number = sliceDiameterProjectionalSize(this.size.sliceDiameter);
    const basicSliceHalfOfDiameterProjectionalSize: number = basicSliceDiameterProjectionalSize / 2;

    return [
      this.basicSliceAnchorLocation[0] - basicSliceHalfOfDiameterProjectionalSize,
      this.basicSliceAnchorLocation[1] - basicSliceHalfOfDiameterProjectionalSize
    ];
  }

  private getBasicSliceRightAngleLocation(): [number, number] {
    const basicSliceDiameterProjectionalSize: number = sliceDiameterProjectionalSize(this.size.sliceDiameter);
    const basicSliceHalfOfDiameterProjectionalSize: number = basicSliceDiameterProjectionalSize / 2;

    return [
      this.basicSliceAnchorLocation[0] + basicSliceHalfOfDiameterProjectionalSize,
      this.basicSliceAnchorLocation[1] + basicSliceHalfOfDiameterProjectionalSize
    ];
  }
}
