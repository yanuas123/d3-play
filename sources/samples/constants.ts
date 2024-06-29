import { DoubleCircle } from './double-collection/double-circle/index';
import { Sample } from './sample';

export enum SampleIdentifier {
  doubleCircle = 'doubleCircle'
}

export const sampleIdentifiers: SampleIdentifier[] = Object.values(SampleIdentifier);

export const samplesTitles: { [key in SampleIdentifier]: string } = {
  [SampleIdentifier.doubleCircle]: 'Double circle'
};

export const samplesContents: { [key in SampleIdentifier]: typeof Sample } = {
  [SampleIdentifier.doubleCircle]: DoubleCircle
};
