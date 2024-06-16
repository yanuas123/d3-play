import { setElementText } from '../../utils/general';
import './index.scss';

export function createSample(container: HTMLElement): void {
  setElementText('Text', container);
}
