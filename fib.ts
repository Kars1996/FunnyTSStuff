type Fibonacci<
    T extends number[],
    Count extends number
> = T["length"] extends Count
    ? T[number]
    : Fibonacci<
          [
              ...T,
              AddNumbers<T[Minus<T["length"], 1>], T[Minus<T["length"], 2>]>
          ],
          Count
      >;

type Minus<A extends number, B extends number> = [
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
][A] extends undefined
    ? never
    : number extends A
    ? number
    : [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][A] extends infer Result
    ? Result extends B
        ? 0
        : Result extends number
        ? B extends number
            ? Result extends B
                ? 0
                : Minus<Result, 1>
            : never
        : never
    : never;

// Helper type to add numbers
type AddNumbers<A extends number, B extends number> = [
    ...TupleOf<A>,
    ...TupleOf<B>
]["length"] &
    number;

// deno-lint-ignore no-explicit-any
type TupleOf<N extends number, T extends any[] = []> = T["length"] extends N
    ? T
    // deno-lint-ignore no-explicit-any
    : TupleOf<N, [...T, any]>;

type FibonacciSequence<N extends number> = Fibonacci<[0, 1], N>;

const fibonacci = <N extends number>(n: N): FibonacciSequence<N> => {
    const fib = (num: number, a = 0, b = 1): number =>
        num <= 0 ? a : fib(num - 1, b, a + b);
    return fib(n) as FibonacciSequence<N>;
};

const result = fibonacci(10);
console.log(result);
