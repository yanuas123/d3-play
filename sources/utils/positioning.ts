import { Anchor } from "../constants/positioning";

export function calculateLocation(anchor: Anchor, anchorLocation: [number, number], size: [number, number]): [number, number] {
  return [
    calculateX(anchor, anchorLocation[0], size[0]),
    calculateY(anchor, anchorLocation[1], size[1])
  ];
}

export function calculateX(anchor: Anchor, anchorLocation: number, size: number): number {
  if (anchor === 'center') {
    return anchorLocation - (size / 2);
  }

  if (anchor.indexOf('Center') > 0) {
    return anchorLocation - (size / 2);
  }

  if (anchor.includes('Left')) {
    return anchorLocation;
  }

  if (anchor.includes('Right')) {
    return anchorLocation - size;
  }

  return 0;
}

export function calculateY(anchor: Anchor, anchorLocation: number, size: number): number {
  if (anchor.indexOf('center') === 0) {
    return anchorLocation - (size / 2);
  }

  if (anchor.includes('top')) {
    return anchorLocation;
  }

  if (anchor.includes('bottom')) {
    return anchorLocation - size;
  }

  return 0;
}

export function calculateAnchorLocation(anchor: Anchor, location: [number, number], size: [number, number]): [number, number] {
  return [
    calculateAnchorX(anchor, location[0], size[0]),
    calculateAnchorY(anchor, location[1], size[1])
  ];
}

export function calculateAnchorX(anchor: Anchor, location: number, size: number): number {
  if (anchor === 'center') {
    return location + (size / 2);
  }

  if (anchor.indexOf('Center') > 0) {
    return location + (size / 2);
  }

  if (anchor.includes('Left')) {
    return location;
  }

  if (anchor.includes('Right')) {
    return location + size;
  }

  return 0;
}

export function calculateAnchorY(anchor: Anchor, location: number, size: number): number {
  if (anchor.indexOf('center') === 0) {
    return location + (size / 2);
  }

  if (anchor.includes('top')) {
    return location;
  }

  if (anchor.includes('bottom')) {
    return location + size;
  }

  return 0;
}

export function calculateCursorLocation(
  event: MouseEvent,
  svgSize: [number, number],
  sampleSize: [number, number]
): [number, number] {
  const mainGroupXLocation: number = (svgSize[0] - sampleSize[0]) / 2;
  const mainGroupYLocation: number = (svgSize[1] - sampleSize[1]) / 2;

  let x: number = event.offsetX - mainGroupXLocation;
  let y: number = event.offsetY - mainGroupYLocation;

  if (x < 0) {
    x = 0;
  }

  if (y < 0) {
    y = 0;
  }

  if (x > sampleSize[0]) {
    x = sampleSize[0];
  }

  if (y > sampleSize[1]) {
    y = sampleSize[1];
  }

  return [x, y];
}

export function getAxisForContain(container: [number, number], size: [number, number]): 0 | 1 {
  const xSizeDifference: number = container[0] - size[0];
  const ySizeDifference: number = container[1] - size[1];

  return xSizeDifference < ySizeDifference ? 0 : 1;
}
