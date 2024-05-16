import userModel from "../models/userModel";
interface userdata{
    username: string,
    firstName: string,
    lastName?: string,
    password: string,
}
export const data : userdata[] = [
    {
        username: "AAA111",
        firstName: "Aaaa",
        lastName: "Bbbb",
        password: "123456",
    },
    {
        username: "CCC222",
        firstName: "Cccc",
        lastName: "dddd",
        password: "123456",
    },
    {
        username: "EEE333",
        firstName: "Eeee",
        lastName: "Ffff",
        password: "123456",
    },
    {
        username: "GGG444",
        firstName: "Gggg",
        lastName: "Hhhh",
        password: "123456",
    },

]
