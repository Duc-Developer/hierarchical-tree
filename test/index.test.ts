import { test, expect } from "bun:test";

test("welcome", () => {
    expect({ foo: "bar" }).toMatchSnapshot();
});