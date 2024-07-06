import { DoubleCircle } from './double-collection/double-circle';
import { RedSquare } from './double-collection/red-square';
import { SlidingSlices } from './double-collection/sliding-slices';
import { Sample } from './sample';

export enum SampleIdentifier {
  doubleCircle = 'doubleCircle',
  redSquare = 'redSquare',
  slidingSlices = 'slidingSlices'
}

export const sampleIdentifiers: SampleIdentifier[] = Object.values(SampleIdentifier);

export const samplesTitles: { [key in SampleIdentifier]: string } = {
  [SampleIdentifier.doubleCircle]: 'Double circle',
  [SampleIdentifier.redSquare]: 'Red square',
  [SampleIdentifier.slidingSlices]: 'Sliding Slices'
};

export const samplesContents: { [key in SampleIdentifier]: typeof Sample } = {
  [SampleIdentifier.doubleCircle]: DoubleCircle,
  [SampleIdentifier.redSquare]: RedSquare,
  [SampleIdentifier.slidingSlices]: SlidingSlices
};
