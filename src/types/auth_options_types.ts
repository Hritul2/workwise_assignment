import z from "zod";

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const jwtUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});
