type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

type JsonValidator<T> = (value: JsonValue) => value is T;

const validate = <T>(
    validator: JsonValidator<T>,
    value: JsonValue
): T | null => {
    return validator(value) ? value : null;
};

type MyJson = { name: string; age: number; hobbies: string[] };

const isMyJson: JsonValidator<MyJson> = (value): value is MyJson => {
    if (typeof value !== "object" || value === null) return false;
    const obj = value as Record<string, unknown>;
    return (
        typeof obj.name === "string" &&
        typeof obj.age === "number" &&
        Array.isArray(obj.hobbies) &&
        obj.hobbies.every((h) => typeof h === "string")
    );
};

const data: JsonValue = { name: "John", age: 30, hobbies: ["coding"] };
const result = validate(isMyJson, data);
console.log(result);
