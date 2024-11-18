type Tuple<N extends number, R extends unknown[] = []> = R["length"] extends N
    ? R
    : Tuple<N, [unknown, ...R]>;

type Add<A extends number, B extends number> = [
    ...Tuple<A>,
    ...Tuple<B>
]["length"];
type Subtract<A extends number, B extends number> = Tuple<A> extends [
    ...Tuple<B>,
    ...infer Rest
]
    ? Rest["length"]
    : never;
type Multiply<
    A extends number,
    B extends number,
    R extends unknown[] = []
> = B extends 0
    ? R["length"]
    : Multiply<A, Subtract<B, 1>, [...R, ...Tuple<A>]>;
type Divide<
    A extends number,
    B extends number,
    Count extends unknown[] = []
> = A extends 0
    ? Count["length"]
    : Divide<Subtract<A, B>, B, [unknown, ...Count]>;

type Power<
    A extends number,
    B extends number,
    R extends unknown[] = [unknown]
> = B extends 0
    ? R["length"]
    : Power<A, Subtract<B, 1>, [...Tuple<R["length"]>, ...Tuple<A>]>;

type Root<
    A extends number,
    N extends number,
    Guess extends number = 1
> = Multiply<Power<Guess, Subtract<N, 1>>, N> extends infer G
    ? G extends A
        ? Guess
        : Root<A, N, Add<Guess, 1>>
    : never;

type Factorial<N extends number, Acc extends number = 1> = N extends 0
    ? Acc
    : Factorial<Subtract<N, 1>, Multiply<Acc, N>>;

type Eval<E> = E extends ["add", infer A, infer B]
    ? Add<Eval<A>, Eval<B>>
    : E extends ["sub", infer A, infer B]
    ? Subtract<Eval<A>, Eval<B>>
    : E extends ["mul", infer A, infer B]
    ? Multiply<Eval<A>, Eval<B>>
    : E extends ["div", infer A, infer B]
    ? Divide<Eval<A>, Eval<B>>
    : E extends ["pow", infer A, infer B]
    ? Power<Eval<A>, Eval<B>>
    : E extends ["root", infer A, infer B]
    ? Root<Eval<A>, Eval<B>>
    : E extends ["fact", infer A]
    ? Factorial<Eval<A>>
    : E extends number
    ? E
    : never;

// usage examples
type Test1 = Eval<["add", 5, ["mul", 2, 3]]>; // 5 + (2 * 3) = 11
type Test2 = Eval<["sub", ["pow", 5, 2], 20]>; // 5^2 - 20 = 5
type Test3 = Eval<["root", 16, 2]>; // sqrt(16) = 4
type Test4 = Eval<["fact", ["add", 3, 2]]>; // 5! = 120
type Test5 = Eval<["div", ["mul", 10, 10], ["pow", 2, 2]]>; // (10 * 10) / 2^2 = 25
