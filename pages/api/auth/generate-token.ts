// pages/api/generate-token.js

import { sign } from 'jsonwebtoken';

export default function createTokens(payload: object, expiry: string) {
    const accessToken = sign(payload, `${process.env.NEXT_PUBLIC_STATIC_KEY}`, { expiresIn: expiry });
    const refreshTokenExpiresIn = '7d'; // 7 days
    const refreshToken = sign(payload, `${process.env.NEXT_PUBLIC_STATIC_KEY_REFRESH}`, { expiresIn: refreshTokenExpiresIn });
    return { accessToken, refreshToken };
}