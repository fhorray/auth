'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await db.insert(users).values({
    id: uuidv4(),
    name: name,
    email: email,
    password: hashedPassword,
  });

  return { success: 'Account created!' };
};
