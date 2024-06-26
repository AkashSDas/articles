const users: string[] = [];

export function addUser(user: string): string {
    users.push(user);
    return user;
}

export function removeUser(user: string): string {
    const index = users.indexOf(user);
    if (index > -1) {
        users.splice(index, 1);
    }

    return user;
}

export function getUsers(): string[] {
    return users;
}
