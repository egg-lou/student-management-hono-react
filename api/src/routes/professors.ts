import {Context, Hono} from "hono";
import { Professor } from "../types/professor";

const fakeProfessors: Professor[] = [
    {
        id: 1,
        name: 'Professor John Doe',
        email: 'john.doe@university.edu',
        department: 'Computer Science'
    },
    {
        id: 2,
        name: 'Professor Jane Smith',
        email: 'jane.smith@university.edu',
        department: 'Mathematics'
    },
    {
        id: 3,
        name: 'Professor Richard Roe',
        email: 'richard.roe@university.edu',
        department: 'Physics'
    }
];

export const professorsRoute = new Hono()
.get("/", async (c: Context) => {
    try {
        return c.json({ message: "Professors: ", professors: fakeProfessors}, 200);
    }
    catch (error) {
        return c.json({ message: "An error occurred!", error}, 500);
    }
})
.post("/", async (c:Context) => {
    try {
        const professor: Professor = await c.res.json();
        console.log(professor);
        return c.json({ message: "Professor added successfully!", professor}, 201);
    } catch (error ) {
        return c.json({ message: "An error occurred!", error}, 500);
    }
})
.put("/:id", async (c: Context) => {
    return c.json({ message: "Professor updated successfully!"}, 200);
})
.delete("/:id", async (c: Context) => {
    return c.json({ message: "Professor deleted successfully!"}, 200);
})