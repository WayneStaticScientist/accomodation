import { NextApiRequest, NextApiResponse } from "next";
import User from "../userdata/user";
import { MongoClient } from "mongodb";
import bcrypt from 'bcryptjs'
import createTokens from "./generate-token";
const client = new MongoClient(`${process.env.NEXT_PUBLIC_STATIC_MONGODB_URI}`);
const getData = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') res.status(400).json({ message: 'method not allowed' });
    const request: User = req.body;
    if (!request.device || request.device.length < 1) return res.status(400).json({ message: 'UnAuthorized entry' });
    try {
        await client.connect();
        const db = client.db(`${process.env.NEXT_PUBLIC_STATIC_DBNAME}`);
        const collection = db.collection('users');
        const user = await collection.findOne({ email: request.email })
        if (!user) return res.status(400).json({ message: 'user or password incorrect' });
        const isMatch = await bcrypt.compare(request.password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'user or password incorrect' });
        return res.status(200).json(createTokens({ email: user.email, device: request.device }, '15m'));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error User not logged in succefully' });
    } finally {
        await client.close();
    }
}
export default getData