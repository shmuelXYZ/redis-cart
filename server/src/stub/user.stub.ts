export type User = {
    name: string;
    age: number;
    hobbies: string[];
    email: string;
    isActive: boolean;
    joinedAt: Date;
};

export const usersStub: User[] = [
    {
        name: "Alice Johnson",
        age: 25,
        hobbies: ["basketball", "soccer"],
        email: "alice.johnson@example.com",
        isActive: true,
        joinedAt: new Date("2023-01-15")
    },
    {
        name: "Bob Smith",
        age: 32,
        hobbies: ["golf", "reading"],
        email: "bob.smith@example.com",
        isActive: false,
        joinedAt: new Date("2022-09-10")
    },
    {
        name: "Charlie Brown",
        age: 28,
        hobbies: ["drawing", "gaming"],
        email: "charlie.brown@example.com",
        isActive: true,
        joinedAt: new Date("2024-03-22")
    },
    {
        name: "David Wilson",
        age: 40,
        hobbies: ["hiking", "woodworking"],
        email: "david.wilson@example.com",
        isActive: false,
        joinedAt: new Date("2021-06-30")
    },
    {
        name: "Emily Davis",
        age: 22,
        hobbies: ["dancing", "yoga"],
        email: "emily.davis@example.com",
        isActive: true,
        joinedAt: new Date("2024-08-01")
    },
    {
        name: "Frank Thomas",
        age: 35,
        hobbies: ["cooking", "cycling"],
        email: "frank.thomas@example.com",
        isActive: true,
        joinedAt: new Date("2023-11-17")
    },
    {
        name: "Grace White",
        age: 29,
        hobbies: ["photography", "traveling"],
        email: "grace.white@example.com",
        isActive: false,
        joinedAt: new Date("2022-04-12")
    },
    {
        name: "Henry Martin",
        age: 38,
        hobbies: ["swimming", "reading"],
        email: "henry.martin@example.com",
        isActive: true,
        joinedAt: new Date("2024-01-25")
    },
    {
        name: "Isabella Moore",
        age: 26,
        hobbies: ["blogging", "fashion"],
        email: "isabella.moore@example.com",
        isActive: true,
        joinedAt: new Date("2023-07-04")
    },
    {
        name: "Jack Anderson",
        age: 31,
        hobbies: ["music", "running"],
        email: "jack.anderson@example.com",
        isActive: false,
        joinedAt: new Date("2022-02-18")
    }
];
