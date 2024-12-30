import { NextApiRequest, NextApiResponse } from "next";
import User from "../userdata/user";
import { MongoClient } from "mongodb";
import bcrypt from 'bcryptjs'
const client = new MongoClient(`${process.env.NEXT_PUBLIC_STATIC_MONGODB_URI}`);
const getData = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') res.status(400).json({ message: 'method not allowed' });
    const request: User = req.body;
    if (!request) return res.status(400).json({ message: 'invalid request' });
    if (!request.email) return res.status(400).json({ message: 'email is required' });
    if (!request.password || request.password.length < 5) return res.status(400).json({ message: 'strong password is required' });
    if (!request.role) return res.status(400).json({ message: 'role is required' });
    if (!request.name || request.name.length < 2) return res.status(400).json({ message: 'name is required' });
    try {
        await client.connect();
        const db = client.db(`${process.env.NEXT_PUBLIC_STATIC_DBNAME}`);
        const collection = db.collection('users');
        const user = await collection.findOne({ email: request.email })
        if (user) return res.status(400).json({ message: 'user already exists' });
        request.password = await bcrypt.hash(request.password, 10);
        await collection.insertOne(request);
        return res.status(200).json({ message: 'user registered successfuly' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error User not registered succefully' });
    } finally {
        await client.close();
    }
}
export default getData