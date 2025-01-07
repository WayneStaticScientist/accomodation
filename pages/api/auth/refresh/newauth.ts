import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import User from "../../userdata/user";
import createTokens from "../generate-token";
const client = new MongoClient(`${process.env.NEXT_PUBLIC_STATIC_MONGODB_URI}`);
const getData = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') res.status(400).json({ message: 'method not allowed' });
    const request: User = req.body;
    if (!request.device || request.device.length < 1) return res.status(400).json({ message: 'UnAuthorized entry' });
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = verify(token, `${process.env.NEXT_PUBLIC_STATIC_KEY_REFRESH}`);
        if (typeof decoded !== 'object' || decoded === null || !('device' in decoded)) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        if (decoded.device != request.device) return res.status(401).json({ message: 'UnAuthorized entry' });
        await client.connect();
        const db = client.db(`${process.env.NEXT_PUBLIC_STATIC_DBNAME}`);
        const collection = db.collection('users');
        const user = await collection.findOne({ email: decoded.email })
        if (!user) return res.status(404).json({ message: 'user not found | register' });
        res.status(200).json(createTokens({ email: user.email, device: request.device }, '15m'));
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
}
export default getData