import Exchange from "./internal/Exchange";
import Queue, { ConsumMode } from "./internal/Queue";
import Consumer from "./internal/Consumer";
import News from "./internal/News";
import Logs from "./internal/Logs";
import UNodeMQ, { createUnmq, createQuickUnmq, QuickUNodeMQ } from "./core/UNodeMQ";
export default UNodeMQ;
export { createUnmq, createQuickUnmq, QuickUNodeMQ };
export { Exchange, Queue, Consumer, News, Logs };
export { ConsumMode };
export declare const extend: {
    <T, U>(target: T, source: U): T & U;
    <T_1, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
export declare const objectToString: () => string;
export declare const toTypeString: (value: unknown) => string;
export declare const isArray: (arg: any) => arg is any[];
export declare const isMap: (val: unknown) => val is Map<any, any>;
export declare const isSet: (val: unknown) => val is Set<any>;
export declare const isDate: (val: unknown) => val is Date;
export declare const isFunction: (val: unknown) => val is Function;
export declare const isString: (val: unknown) => val is string;
export declare const isNumber: (val: unknown) => val is number;
export declare const isBoolean: (val: unknown) => val is boolean;
export declare const isSymbol: (val: unknown) => val is symbol;
export declare const isObject: (val: unknown) => val is Record<any, any>;
export declare const isPromise: <T = any>(val: unknown) => val is Promise<T>;
