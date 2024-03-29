import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);
export const encrypt = async (payload: any) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key);
};

export const decrypt = async (input: string): Promise<any> => {
  const { payload } = await jwtVerify(input, key, { algorithms: ['HS256'] });
  return payload;
};

export const login = async (formData: FormData) => {
  // Verify credentials and get the user
  const user = { email: formData.get('email'), name: 'ns6630' };

  // Create the session
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true });
};
export const getSession = async () => {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return decrypt(session);
};
export const logout = async () => {
  cookies().set('session', '', { expires: new Date(0) });
};

export const updateSession = async (request: NextRequest) => {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  // eslint-disable-next-line consistent-return
  return res;
};
