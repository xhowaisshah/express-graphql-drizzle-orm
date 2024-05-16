import * as z from 'zod';

const errorToMessage = (error: z.ZodError) => {
    return JSON.stringify(error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
    })));
};

export { errorToMessage };