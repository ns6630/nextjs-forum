"use server";

import prisma from "@/lib/prisma";
import { createHash } from "node:crypto";
import { readUser } from "@/data/user";

export const checkEmail = async (email: string): Promise<string | undefined> => {
  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (foundUser) {
    return "Email is already used.";
  }
};

export const registrate = async (email: string, password: string) => {
  const hash = createHash("sha256");
  hash.update(`${process.env.SALT}${password}`);
  const hashedPassword = hash.digest("hex");
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return readUser(user);
};
