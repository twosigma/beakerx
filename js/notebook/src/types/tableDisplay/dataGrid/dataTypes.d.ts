export declare enum ALL_TYPES {
    'string' = 0,
    'integer' = 1,
    'formatted integer' = 2,
    'double' = 3,
    'double with precision' = 4,
    'exponential 5' = 6,
    'exponential 15' = 7,
    'datetime' = 8,
    'boolean' = 9,
    'html' = 10,
    'int64' = 11,
    'time' = 12,
}
export declare const getTypeByName: (typeName: string) => number;
export declare function getDisplayType(type: ALL_TYPES, stringFormatForType?: any, stringFormatForColumn?: any): string | ALL_TYPES.string | ALL_TYPES.formatted integer | ALL_TYPES.double | ALL_TYPES.datetime;
export declare function isDoubleWithPrecision(type: string | number): boolean;
export declare function getDoublePrecisionByType(type: string | number): string;
export declare function getAllowedTypesByType(type: any): {
    type: number;
    name: string;
}[];
