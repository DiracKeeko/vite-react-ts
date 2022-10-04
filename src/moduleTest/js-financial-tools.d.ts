declare function formatRank(val: number | undefined): string;
declare function formatLongText(val: string | undefined, limit: number): string;
declare function formatWithUnit(val: number | undefined, unitStr?: string, precision?: number): string;
declare function formatToMonetaryShape(val: number | undefined, precision?: number): string;
declare function formatToFloat(val: number | undefined, plusSign?: string, precision?: number, scale?: number): string;
declare function formatToPercent(val: number | undefined, plusSign?: string, precision?: number, scale?: number): string;

declare const formatter_formatRank: typeof formatRank;
declare const formatter_formatLongText: typeof formatLongText;
declare const formatter_formatWithUnit: typeof formatWithUnit;
declare const formatter_formatToMonetaryShape: typeof formatToMonetaryShape;
declare const formatter_formatToFloat: typeof formatToFloat;
declare const formatter_formatToPercent: typeof formatToPercent;
declare namespace formatter {
  export {
    formatter_formatRank as formatRank,
    formatter_formatLongText as formatLongText,
    formatter_formatWithUnit as formatWithUnit,
    formatter_formatToMonetaryShape as formatToMonetaryShape,
    formatter_formatToFloat as formatToFloat,
    formatter_formatToPercent as formatToPercent,
  };
}

declare const _default: {
    formatter: typeof formatter;
};

export { _default as default };
