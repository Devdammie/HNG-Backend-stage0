import express from 'express';
const app = express();
const PORT = process.env.PORT || 3100;

app.get('/me', async (req, res) => {
    const catFactsUrl = "https://catfact.ninja/fact";
    try {
        const resp = await fetch(catFactsUrl);
        if (!resp.ok) throw new Error(`API error ${resp.status}`);
        const json = await resp.json();

        const userDetails = {
            status: 'success',
            user: {
                name: "Your Name",
                email: "yourname@example.com",
                stack: ["Node.js/Express"]
            },
            timestamp: new Date().toISOString(),
            fact: json.fact
        };

        res.status(200).json(userDetails);
        console.log(userDetails);
    } catch (err) {
        console.error(err);
        res.status(502).json({ status: 'error', message: 'Failed to fetch cat fact' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
