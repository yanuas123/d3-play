import * as d3 from 'd3';
import { transformControler } from '../utils/shapes';

interface SelectionCustomExtension {
  transform: ReturnType<typeof transformControler>;
}

export type SvgElementSelection = d3.Selection<SVGGraphicsElement, any, any, any>;

export type GroupSelection = d3.Selection<SVGGElement, any, any, any>;

export type CircleSelection = d3.Selection<SVGCircleElement, any, any, any> & SelectionCustomExtension;
export type RectSelection = d3.Selection<SVGRectElement, any, any, any> & SelectionCustomExtension;
export type SliceSelection = d3.Selection<SVGPathElement, any, any, any> & SelectionCustomExtension;
