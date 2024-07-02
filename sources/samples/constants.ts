import { DoubleCircle } from './double-collection/double-circle/index';
import { RedSquare } from './double-collection/red-square';
import { Sample } from './sample';

export enum SampleIdentifier {
  doubleCircle = 'doubleCircle',
  redSquare = 'redSquare'
}

export const sampleIdentifiers: SampleIdentifier[] = Object.values(SampleIdentifier);

export const samplesTitles: { [key in SampleIdentifier]: string } = {
  [SampleIdentifier.doubleCircle]: 'Double circle',
  [SampleIdentifier.redSquare]: 'Red square'
};

export const samplesContents: { [key in SampleIdentifier]: typeof Sample } = {
  [SampleIdentifier.doubleCircle]: DoubleCircle,
  [SampleIdentifier.redSquare]: RedSquare
};
