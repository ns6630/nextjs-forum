'use server';

import prisma from '@/lib/prisma';

export const checkEmail = async (email: string): Promise<string> => {
  const foundUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (foundUser) {
    return 'Email is already used.';
  }
  return '';
};
