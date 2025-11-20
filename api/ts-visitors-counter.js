import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    let count = await kv.get("visitor_count");

    // Initialize if missing
    if (!count) {
      await kv.set("visitor_count", 522);
      count = 522;
    }

    // Increment
    count = await kv.incr("visitor_count");

    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'KV connection failed' });
  }
}
