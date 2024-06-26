import { describe, it, expect } from "@jest/globals";

describe("Matchers", () => {
    describe("common matchers", () => {
        it("adding 2 numbers", () => {
            expect(1 + 1).toBe(2);
        });

        it("object assignment", () => {
            const data: Record<string, number> = { one: 1 };
            data["two"] = 2;
            expect(data).toEqual({ one: 1, two: 2 });
        });

        it("adding positive numbers is not zero", () => {
            for (let a = 1; a < 10; a++) {
                for (let b = 1; b < 10; b++) {
                    expect(a + b).not.toBe(0);
                }
            }
        });
    });

    describe("truthiness", () => {
        it("null", () => {
            const n = null;
            expect(n).toBeNull();
            expect(n).toBeDefined();
            expect(n).not.toBeUndefined();
            expect(n).not.toBeTruthy();
            expect(n).toBeFalsy();
        });

        it("zero", () => {
            const z = 0;
            expect(z).not.toBeNull();
            expect(z).toBeDefined();
            expect(z).not.toBeUndefined();
            expect(z).not.toBeTruthy();
            expect(z).toBeFalsy();
        });
    });

    describe("numbers and strings", () => {
        it("numbers", () => {
            const num = 3;
            expect(num).toBeGreaterThan(2);
            expect(num).toBeGreaterThanOrEqual(3);
            expect(num).toBeLessThan(4);
            expect(num).toBeLessThanOrEqual(3);
            expect(num).toBe(3);
            expect(num).toEqual(3);

            const float = 0.1 + 0.2;
            expect(float).toBeCloseTo(0.3, 2);
        });

        it("string", () => {
            const s = "hello";
            expect(s).toBe("hello");
            expect(s).toMatch(/hello/);
            expect(s).toMatch("hello");
            expect(s).not.toMatch(/bye/);
        });
    });

    describe("arrays and iterables", () => {
        it("array", () => {
            const arr = [1, 2, 3];
            expect(arr).toContain(2);
            expect(arr).not.toContain(4);
            expect(arr).toEqual([1, 2, 3]);
        });

        it("iterable", () => {
            const iter = new Set([1, 2, 3]);
            expect(iter).toContain(2);
            expect(iter).not.toContain(4);
            expect(iter).toEqual(new Set([1, 2, 3]));
        });
    });

    describe("exceptions", () => {
        function fail() {
            throw new Error("fail");
        }

        it("errors", () => {
            expect(fail).toThrow();
            expect(fail).toThrow(Error);
            expect(fail).toThrow("fail");
            expect(fail).toThrow(/fail/);
        });
    });

    describe("additional matchers", () => {
        it("array has correct length", () => {
            const fruits = ["apple", "banana"];
            expect(fruits).toHaveLength(2);
        });

        it("object has property", () => {
            const obj = { name: "John", age: 30 };
            expect(obj).toHaveProperty("name");
            expect(obj).toHaveProperty("name", "John");
        });

        it("array contains object", () => {
            const array = [{ name: "John" }, { name: "Jane" }];
            expect(array).toContainEqual({ name: "John" });
        });

        it("object matches shape", () => {
            const obj = { name: "John", age: 30 };
            expect(obj).toEqual({
                name: expect.any(String),
                age: expect.any(Number),
            });
        });
    });

    describe("custom matcher", () => {
        expect.extend({
            toBeWithinRange(received, floor, ceiling) {
                const pass = received >= floor && received <= ceiling;
                if (pass) {
                    return {
                        message: () => {
                            return `expected ${received} not to be within range ${floor} - ${ceiling}`;
                        },
                        pass: true,
                    };
                } else {
                    return {
                        message: () => {
                            return `expected ${received} to be within range ${floor} - ${ceiling}`;
                        },
                        pass: false,
                    };
                }
            },
        });

        it("number is within range", () => {
            (expect(100) as any).toBeWithinRange(90, 110);
        });
    });
});
