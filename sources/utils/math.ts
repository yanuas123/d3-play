export function getAngle(location: [number, number], origin: [number, number]): number {
  const x: number = location[0] - origin[0];
  const y: number = location[1] - origin[1];

  return Math.atan2(y, x) * 180 / Math.PI;
}

export function getDifferenceMultiplier(value1: number, value2: number): number {
  return Math.floor(value1 / value2);
}

export function getFromCenterOffset(value: number, base: number): number {
  const center: number = base / 2;

  if (value > center) {
    return value - center;
  }

  return center - value;
}

export function isoscelesTriangleLeg(hypotenuse: number): number {
  return hypotenuse * Math.sqrt(2) / 2;
}
