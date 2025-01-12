import { z } from "zod";

// Define the Zod schema for registration
export const registrationSchema = z.object({
    email: z
        .string()
        .email("Invalid email format")
        .nonempty("Email is required"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password can't exceed 50 characters"),

    confirmPassword: z
        .string()
        .min(6, "Confirm Password must be at least 6 characters long")
        .optional(), // Make it optional here
});

// Export type for form inputs
export type RegistrationFormInputs = z.infer<typeof registrationSchema>;
