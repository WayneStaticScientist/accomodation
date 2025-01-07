import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const client = new MongoClient(`${process.env.NEXT_PUBLIC_STATIC_MONGODB_URI}`);
const getData = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') res.status(400).json({ message: 'method not allowed' });
    const { query } = req;
    const page = query.page;
    const keyName = query.keyName;
    const keyValue = query.keyValue;
    await client.connect();
    const db = client.db(`${process.env.NEXT_PUBLIC_STATIC_DBNAME}`);
    const collection = db.collection('houses');
    const results = (keyName && keyName.length > 1) ? await collection.find({
        [keyName as string]: keyValue
    }).skip((parseInt(page as string) - 1) * 20).toArray() : await collection.find({}).skip((parseInt(page as string) - 1) * 20).toArray()
    console.log(results)
    res.status(200).json(results)
}
export default getData