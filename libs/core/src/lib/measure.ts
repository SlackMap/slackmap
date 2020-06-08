export enum MeasureConvertType {
  IMPERIAL_TO_METRIC,
  METRIC_TO_IMPERIAL
}
export class Measure {
  static IMPERIAL_TO_METRIC = MeasureConvertType.IMPERIAL_TO_METRIC;
  static METRIC_TO_IMPERIAL = MeasureConvertType.METRIC_TO_IMPERIAL;

  /**
   *
   * @param v
   * @param convertType
   * @returns number
   */
  static convert(v: number, convertType: MeasureConvertType): number {
    if (convertType === Measure.METRIC_TO_IMPERIAL) {
      return round(v * 3.280839895);
    } else if (convertType === Measure.IMPERIAL_TO_METRIC) {
      return round(v / 3.280839895);
    } else {
      return v;
    }
  }
}

function round(which) {
  return Math.round(which * 100) / 100;
}
