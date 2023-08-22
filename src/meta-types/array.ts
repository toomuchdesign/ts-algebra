import type { And, Prettify } from "../utils";
import type { Any } from "./any";
import type { NeverType } from "./never";
import type { Resolve, ResolveOptions } from "./resolve";
import type { Type } from "./type";
import type { Deserialized, IsSerialized } from "./utils";

export type ArrayTypeId = "array";

// Prefixed with _ to not confuse with native Array type
export type _Array<
  V extends Type = Any,
  I extends boolean = false,
  D = never,
> = _$Array<V, I, D>;

export type _$Array<V = Any, I = false, D = never> = {
  type: ArrayTypeId;
  values: V;
  isSerialized: I;
  deserialized: D;
};

export type ArrayType = {
  type: ArrayTypeId;
  values: Type;
  isSerialized: boolean;
  deserialized: unknown;
};

export type ArrayValues<A extends ArrayType> = A["values"];

export type ResolveArray<T extends ArrayType, O extends ResolveOptions> = And<
  O["deserialize"],
  IsSerialized<T>
> extends true
  ? Deserialized<T>
  : ArrayValues<T> extends NeverType
  ? []
  : Prettify<Resolve<ArrayValues<T>, O>[]>;
