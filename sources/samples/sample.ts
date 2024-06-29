import * as d3 from 'd3';
import { GroupSelection } from '../models/selection';
import { Observable, Subject, debounceTime, fromEvent, map, takeUntil } from 'rxjs';
import { CursorEvent } from '../models/events';
import { calculateCursorLocation } from '../utils/positioning';
import { responsive } from '../utils/general';

export abstract class Sample {
  public cursorMove$: Observable<CursorEvent>;

  private _svgWidth: number;
  private _svgHeight: number;

  private _basicWidth: number;
  private _basicHeight: number;

  private _x: number;
  private _y: number;

  private _width: number;
  private _height: number;

  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private _group: GroupSelection;

  private destroySubject: Subject<void> = new Subject();

  private destroy$: Observable<void> = this.destroySubject.asObservable();

  private readonly overloadedEventsDebounce: number = 2;

  constructor(private container: HTMLElement, basicSize: [number, number]) {
    this._svgWidth = container.clientWidth;
    this._svgHeight = container.clientHeight;

    this._basicWidth = basicSize[0];
    this._basicHeight = basicSize[1];

    const size: { width: number, height: number } = responsive(
      {
        width: this._basicWidth,
        height: this._basicHeight
      },
      [this._basicWidth, this._basicHeight],
      [this._svgWidth, this._svgHeight]
    );

    this._width = size.width;
    this._height = size.height;

    this._x = (this._svgWidth - this._width) / 2;
    this._y = (this._svgHeight - this._height) / 2;

    this.initialize();
    this.handleEvents();
  }

  protected get svgWidth(): number {
    return this._svgWidth;
  }

  protected get svgHeight(): number {
    return this._svgHeight;
  }

  protected get basicWidth(): number {
    return this._basicWidth;
  }

  protected get basicHeight(): number {
    return this._basicHeight;
  }

  protected get width(): number {
    return this._width;
  }

  protected get x(): number {
    return this._x;
  }

  protected get y(): number {
    return this._y;
  }

  protected get height(): number {
    return this._height;
  }

  protected get group(): GroupSelection {
    return this._group;
  }

  public destroy(): void {
    this.destroySubject.next();
  }

  private initialize(): void {
    this.svg = d3.select(this.container).append('svg').attr('width', this.svgWidth).attr('height', this.svgHeight);
    this._group = this.svg.append('g').attr('transform', `translate(${this.x},${this.y})`);
  }

  private handleEvents(): void {
    this.listenMouseMoveEvent(this.svg.node() as SVGSVGElement);
  }

  private listenMouseMoveEvent(svg: SVGSVGElement): void {
    this.cursorMove$ = fromEvent(svg, 'mousemove').pipe(
      takeUntil(this.destroy$),
      debounceTime(this.overloadedEventsDebounce),
      map((e: Event) => {
        const event: MouseEvent = e as MouseEvent;
        const [x, y]: [number, number] = calculateCursorLocation(
          event,
          [this.svgWidth, this.svgHeight],
          [this.width, this.height]
        );

        const cursorEvent: CursorEvent = { x, y };

        return cursorEvent;
      })
    );
  }
}
