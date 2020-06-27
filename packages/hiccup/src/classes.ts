import { deref } from "@thi.ng/api";
import { isString } from "@thi.ng/checks";

/**
 * Takes a space separated string of existing CSS class names and merges
 * it with `val`, which is either another string of class names, an
 * object of booleans or an `IDeref` evaluating to either. Returns
 * updated class string.
 *
 * @remarks
 * If `val` evaluates to a string, it will be appended to `existing`.
 *
 * If `val` is an object, its keys are used as class names and their
 * values indicate if the class should be added or removed from the
 * existing set.
 *
 * @example
 * ```ts
 * mergeClasses("foo bar", { foo: false, baz: true })
 * // "bar baz"
 *
 * mergeClasses("foo bar", "baz");
 * // "baz"
 * ```
 *
 * @param existing
 * @param val
 */
export const mergeClasses = (existing: string, val: any) => {
    val = deref(val);
    if (val == null) return existing;
    if (isString(val)) return existing + " " + val;
    const classes = new Set(existing.split(" "));
    for (let id in val) {
        deref(val[id]) ? classes.add(id) : classes.delete(id);
    }
    return [...classes].join(" ");
};
