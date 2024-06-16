import { createSample as createTest } from './test/index';

export enum SampleIdentifier {
  test = 'test'
}

export const sampleIdentifiers: SampleIdentifier[] = Object.values(SampleIdentifier);

export const samplesTitles: { [key in SampleIdentifier]: string } = {
  [SampleIdentifier.test]: 'Test'
};

export const samplesContents: { [key in SampleIdentifier]: (container: HTMLElement) =>  void } = {
  [SampleIdentifier.test]: createTest
};

export const SAMPLE_ROUTING_PARAMETER_KEY = 'sample';
