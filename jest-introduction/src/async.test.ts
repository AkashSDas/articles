import { describe, it, expect, jest, afterEach } from "@jest/globals";

function getGroceryList(callback: (list: string[]) => void): void {
    setTimeout(() => {
        callback(["milk", "bread", "eggs"]);
    }, 100_000);
}

async function rain(amount: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            if (amount === 0) {
                reject("rain is not possible");
            } else {
                if (amount >= 50 && amount < 100) {
                    throw new Error("too much rain");
                }

                resolve();
            }
        }, 100_000 * amount);
    });
}

async function lag(amounInMs: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amounInMs < 1000) {
                reject("lag is not possible");
            } else {
                resolve(true);
            }
        }, amounInMs);
    });
}

jest.useFakeTimers({ advanceTimers: true });
jest.spyOn(global, "setTimeout");

describe("Aysnc", () => {
    afterEach(() => {
        jest.clearAllTimers();
    });

    describe("callbacks", () => {
        it("callback", (done) => {
            try {
                getGroceryList((list) => {
                    expect(list).toEqual(["milk", "bread", "eggs"]);
                    done();
                });
                expect(setTimeout).toHaveBeenCalledTimes(1);
                expect(setTimeout).toHaveBeenLastCalledWith(
                    expect.any(Function),
                    100_000
                );

                jest.runOnlyPendingTimers();
            } catch (e) {
                if (e instanceof Error || typeof e === "string") {
                    done(e);
                } else {
                    done("Unknow error");
                }
            }
        }, 101_000);
    });

    describe("promises with resolve and reject", () => {
        it("resolve", () => {
            expect(rain(1)).resolves.toBeUndefined();
        });

        it("reject", () => {
            expect(rain(0)).rejects.toEqual("rain is not possible");
        });

        it("should throw an error", async () => {
            try {
                rain(100);
                jest.runOnlyPendingTimers();
            } catch (e) {
                expect.assertions(1);
                expect(e).toEqual("too much rain");
            }
        });
    });

    describe("promises with async/await", () => {
        it("should throw an error", async () => {
            try {
                await lag(0);
            } catch (e) {
                expect(e).toEqual("lag is not possible");
            }
        });

        it("should not throw an error", async () => {
            await lag(1000);
        });
    });

    describe("combine async/await with resolve/reject", () => {
        it("should throw an error", async () => {
            await expect(lag(0)).rejects.toEqual("lag is not possible");
        });

        it("should not throw an error", async () => {
            await expect(lag(1000)).resolves.toBeTruthy();
        });
    });
});
