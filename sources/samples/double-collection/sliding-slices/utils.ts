import { isoscelesTriangleLeg } from "../../../utils/math";

export function sliceDiameterProjectionalSize(diameter: number): number {
  return isoscelesTriangleLeg(diameter);
}

export function sliceProjectionalSize(diameter: number): number {
  const diameterProjectionalSize: number = sliceDiameterProjectionalSize(diameter);
  const sliceArcLedge: number = diameter - diameterProjectionalSize / 2;

  return diameterProjectionalSize + sliceArcLedge;
}
