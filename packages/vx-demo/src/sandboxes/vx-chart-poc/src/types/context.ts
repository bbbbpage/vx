import { UseTooltipParams } from '@vx/tooltip/lib/hooks/useTooltip';
import { XYChartTheme } from './theme';
import { ScaleType, Margin, ScaleOutput, LegendShape } from '.';

// ChartContext ---------------------------------------------------------------
export interface DataRegistry<Datum = unknown, XScaleInput = unknown, yScaleInput = unknown> {
  [key: string]: {
    /** unique data key */
    key: string;
    /** array of data */
    data: Datum[];
    /** function that returns the x value of a datum. */
    xAccessor: (d: unknown) => XScaleInput;
    /** function that returns the y value of a datum. */
    yAccessor: (d: unknown) => yScaleInput;
    /** whether the entry supports mouse events. */
    mouseEvents: boolean;
    /** Legend shape */
    legendShape?: LegendShape;
  };
}

export type RegisterData = (data: DataRegistry) => void;

export type DatumWithKey<Datum = unknown> = { datum: Datum; key: string; index: number };

export interface ChartContext<
  Datum = unknown,
  XScaleInput = unknown,
  YScaleInput = unknown,
  DataKeys extends string = string
> {
  theme: XYChartTheme;
  xScale: ScaleType<XScaleInput, ScaleOutput> | null;
  yScale: ScaleType<YScaleInput, ScaleOutput> | null;
  colorScale: ScaleType<DataKeys, string>;
  width: number | null;
  height: number | null;
  margin: Margin;
  dataRegistry: DataRegistry<Datum, XScaleInput, YScaleInput>;
  registerData: RegisterData;
  unregisterData: (key: string) => void;
  setChartDimensions: (dims: { width: number; height: number; margin: Margin }) => void;
  findNearestData: (
    event: React.MouseEvent | React.TouchEvent,
  ) => {
    svgMouseX: number | null;
    svgMouseY: number | null;
    closestDatum: DatumWithKey;
    closestData: { [dataKey: string]: DatumWithKey };
  };
}

// TooltipContext ---------------------------------------------------------------

export interface TooltipData<Datum = unknown, DataKeys extends string = string> {
  /** x coord of event in svg space. */
  svgMouseX: number | null;
  /** y coord of event in svg space. */
  svgMouseY: number | null;
  /** x coord of event in page space. */
  pageX: number | null;
  /** y coord of event in page space. */
  pageY: number | null;
  /** x coord of the chart contaainer svg from its boundingClientRect. */
  svgOriginX: number | null;
  /** y coord of the chart contaainer svg from its boundingClientRect. */
  svgOriginY: number | null;
  /** The closest datum across all `dataKeys`. */
  closestDatum: DatumWithKey<Datum>;
  /** The closest datum for each `dataKey`. */
  closestData: {
    [key in DataKeys]: DatumWithKey<Datum>;
  };
}

export type TooltipContext = UseTooltipParams<TooltipData>;
