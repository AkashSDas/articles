import {
    describe,
    it,
    expect,
    afterEach,
    beforeEach,
    beforeAll,
    afterAll,
} from "@jest/globals";
import { addUser, getUsers, removeUser } from "./setup-and-teardown";

describe("Setup and Teardown", () => {
    let initialUsers: string[];

    // Runs once before all tests start
    beforeAll(() => {
        console.log("Setting up the testing environment...");
    });

    // Runs once after all tests are done
    afterAll(() => {
        console.log("Cleaning up the testing environment...");
    });

    // Runs before each test
    beforeEach(() => {
        console.log("Setting up before each test...");
        initialUsers = getUsers().slice();
    });

    // Runs after each test
    afterEach(() => {
        console.log("Cleaning up after each test...");
        // Reset the users array to its initial state
        while (getUsers().length > initialUsers.length) {
            removeUser(getUsers()[getUsers().length - 1]);
        }
    });

    it("should add a user", () => {
        const user = "Jane Doe";
        addUser(user);
        const users = getUsers();

        expect(users).toContain(user);
        console.log("Users after adding Jane Doe:", users);
    });

    it("should remove a user", () => {
        const user = "John Doe";
        removeUser(user);
        const users = getUsers();

        expect(users).not.toContain(user);
        console.log("Users after removing John Doe:", users);
    });
});

// Output:
// Setting up the testing environment...
// Setting up before each test...
// Users after adding Jane Doe: [ 'Jane Doe' ]
// Cleaning up after each test...
// Setting up before each test...
// Users after removing John Doe: []
// Cleaning up after each test...
// Cleaning up the testing environment...

describe("Scope", () => {
    beforeAll(() => console.log("1 - beforeAll"));
    afterAll(() => console.log("1 - afterAll"));
    beforeEach(() => console.log("1 - beforeEach"));
    afterEach(() => console.log("1 - afterEach"));

    it("", () => console.log("1 - test"));

    describe("Scoped / Nested block", () => {
        beforeAll(() => console.log("2 - beforeAll"));
        afterAll(() => console.log("2 - afterAll"));
        beforeEach(() => console.log("2 - beforeEach"));
        afterEach(() => console.log("2 - afterEach"));

        it("", () => console.log("2 - test"));
    });

    // 1 - beforeAll
    // 1 - beforeEach
    // 1 - test
    // 1 - afterEach
    // 2 - beforeAll
    // 1 - beforeEach
    // 2 - beforeEach
    // 2 - test
    // 2 - afterEach
    // 1 - afterEach
    // 2 - afterAll
    // 1 - afterAll
});

describe.only("Scope", () => {
    console.log("1 - describe");

    beforeAll(() => console.log("1 - beforeAll"));
    afterAll(() => console.log("1 - afterAll"));
    beforeEach(() => console.log("1 - beforeEach"));
    afterEach(() => console.log("1 - afterEach"));

    it("", () => console.log("1 - test"));

    describe("Scoped / Nested block", () => {
        console.log("2 - describe");
        beforeAll(() => console.log("2 - beforeAll"));
        afterAll(() => console.log("2 - afterAll"));
        beforeEach(() => console.log("2 - beforeEach"));
        afterEach(() => console.log("2 - afterEach"));

        it("", () => console.log("2 - test"));
    });

    // 1 - describe
    // 2 - describe
    // 1 - beforeAll
    // 1 - beforeEach
    // 1 - test
    // 1 - afterEach
    // 2 - beforeAll
    // 1 - beforeEach
    // 2 - beforeEach
    // 2 - test
    // 2 - afterEach
    // 1 - afterEach
    // 2 - afterAll
    // 1 - afterAll
});

describe.only("Order of execution", () => {
    beforeEach(() => console.log("connection setup"));
    beforeEach(() => console.log("database setup"));

    afterEach(() => console.log("database teardown"));
    afterEach(() => console.log("connection teardown"));

    it("test 1", () => console.log("test 1"));

    describe("extra", () => {
        beforeEach(() => console.log("extra database setup"));
        afterEach(() => console.log("extra database teardown"));

        it("test 2", () => console.log("test 2"));
    });

    // connection setup
    // database setup
    // test 1
    // database teardown
    // connection teardown

    // connection setup
    // database setup
    // extra database setup
    // test 2
    // extra database teardown
    // database teardown
    // connection teardown
});
