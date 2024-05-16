import { db } from "../../db";
import { users } from "../../db/schema";

const Queries = {
    allUsers: async () => {
        return await db.select().from(users);
    },
};

export default Queries;