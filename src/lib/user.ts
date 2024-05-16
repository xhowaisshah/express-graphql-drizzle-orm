import { eq } from "drizzle-orm";
import { db } from "../db";
import { userSchema, users } from "../db/schema";
import { errorToMessage } from "../utils/validations";

const createUser = async (parent: any, args: any, context: any, info: any) => {
    try {
        
        const fieldsData = userSchema.safeParse(args);
        if (!fieldsData.success) {
            throw new Error(`${errorToMessage(fieldsData.error)}`);
        }

        const newUser = await db.insert(users).values({
            email: fieldsData.data.email,
            name: fieldsData.data.name,
        }).returning({ id: users.id, name: users.name, email: users.email });

        if (!newUser?.length || newUser[0]?.id == null) {
            throw new Error('Failed to create user.');
        }

        return {
            success: true,
            user: newUser[0],
            message: 'User created successfully.'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        };
    }
};

const updateUser = async (parent: any, args: any, context: any, info: any) => {
    try {
        const fieldsData = userSchema.safeParse(args);
        if (!fieldsData.success) {
            throw new Error(`${errorToMessage(fieldsData.error)}`);
        }
        const updateFields: Record<string, any> = {};
        const fieldsToUpdate = Object.keys(args);
        fieldsToUpdate.forEach(field => {
            if (args[field] !== undefined) {
                updateFields[field] = args[field];
            }
        });
        const updatedUser = await db.update(users).set(updateFields)
            .where(eq(users.id, args.id))
            .returning();

        console.log(args)
        if (!updatedUser || !updatedUser[0] || Object.keys(args).length < 2) {
            throw new Error('Failed to update user.');
        }

        return {
            success: true,
            user: updatedUser[0],
            message: 'User updated successfully.'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        };
    }
};

const deleteUser = async (parent: any, args: any, context: any, info: any) => {
    try {
        const deletedUser = await db.delete(users).where(eq(users.id, args.id))
            .returning({ id: users.id, email: users.email, name: users.name });

        if (!deletedUser?.length || deletedUser[0]?.id == null) {
            throw new Error('User not found.');
        }

        return {
            success: true,
            user: deletedUser[0],
            message: 'User deleted successfully.'
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        };
    }
};
export { createUser, updateUser, deleteUser };