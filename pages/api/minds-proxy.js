export default async function handler(req, res) {
  const target = "https://www.minds.com/tendingsandsin1984/blog/the-return-of-tending-sands-1837274672098447360?referrer=tendingsandsin1984";

  try {
    const response = await fetch(target);
    const html = await response.text();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=1800");

    // REMOVE frame-blocking headers
    res.setHeader("X-Frame-Options", ""); 
    res.setHeader("Content-Security-Policy", "");

    return res.status(200).send(html);
  } catch (e) {
    return res.status(500).send("Proxy error");
  }
}
