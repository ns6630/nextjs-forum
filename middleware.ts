import { NextRequest } from 'next/server';
import { updateSession } from '@/lib';

export const middleware = async (request: NextRequest) => updateSession(request);
