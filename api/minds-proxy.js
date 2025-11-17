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
export default async function handler(req, res) {
  const target =
    "https://www.minds.com/tendingsandsin1984/blog/the-return-of-tending-sands-1837274672098447360?referrer=tendingsandsin1984";

  try {
    const response = await fetch(target);
    let html = await response.text();

    // --- Remove Minds layout elements ---
    const removeSelectors = [
      /<aside[\s\S]*?<\/aside>/gi,          // any <aside> sidebar
      /<nav[\s\S]*?<\/nav>/gi,              // nav bars
      /<footer[\s\S]*?<\/footer>/gi,        // footer
      /<div[^>]*class="[^"]*sidebar[^"]*"[\s\S]*?<\/div>/gi, // explicit sidebar divs
      /<div[^>]*id="sidebar"[\s\S]*?<\/div>/gi,
      /<div[^>]*class="[^"]*suggested[^"]*"[\s\S]*?<\/div>/gi,
      /<script[\s\S]*?<\/script>/gi         // nuke their JS
    ];

    removeSelectors.forEach(pattern => {
      html = html.replace(pattern, "");
    });

    // Remove Minds header container if present
    html = html.replace(/<header[\s\S]*?<\/header>/gi, "");

    // OPTIONAL: remove body background & force white
    html = html.replace(/<body/gi, '<body style="background:#fff;color:#000;"');

    // --- Send the cleaned HTML ---
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=1800");
    res.setHeader("X-Frame-Options", "");
    res.setHeader("Content-Security-Policy", "");

    return res.status(200).send(html);
  } catch (e) {
    return res.status(500).send("Proxy error");
  }
}
