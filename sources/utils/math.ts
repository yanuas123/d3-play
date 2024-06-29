export function getAngle(location: [number, number], origin: [number, number]): number {
  const x: number = location[0] - origin[0];
  const y: number = location[1] - origin[1];

  return (Math.atan2(y, x) * 180) / Math.PI;
}

export function getDifferenceMultiplier(value1: number, value2: number): number {
  return Math.floor(value1 / value2);
}
