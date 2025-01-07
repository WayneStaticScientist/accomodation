import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const client = new MongoClient(`${process.env.NEXT_PUBLIC_STATIC_MONGODB_URI}`);
const getData = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') res.status(400).json({ message: 'method not allowed' });
    const houseData = JSON.parse(req.body)
    console.log(houseData)
    const id = houseData.houseID;
    await client.connect();
    const db = client.db(`${process.env.NEXT_PUBLIC_STATIC_DBNAME}`);
    const collection = db.collection('houses');
    const results = await collection.findOne({ _id: new ObjectId(id as string) })
    if (!results) {
        return res.status(402).json({ message: "house with id " + id + " not found | it may have been deleted" })
    }
    res.status(200).json(results)
}
export default getData