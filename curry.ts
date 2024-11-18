type Curry<T> = T extends (...args: infer Args) => infer Return
    ? Args extends [infer First, ...infer Rest]
        ? (arg: First) => Curry<(...args: Rest) => Return>
        : Return
    : never;

const curry = <T extends (...args: any[]) => any>(fn: T): Curry<T> => {
    return ((...args: any[]) =>
        args.length >= fn.length
            ? fn(...args)
            : curry(fn.bind(null, ...args))) as Curry<T>;
};

const add = (a: number, b: number, c: number): number => a + b + c;

const curriedAdd = curry(add);

const result = curriedAdd(1)(2)(3);
console.log(result);
