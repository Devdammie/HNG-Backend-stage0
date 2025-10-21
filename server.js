import express from 'express';
const app = express();
const PORT = process.env.PORT || 3100;

let fetchFn = globalThis.fetch;
if (!fetchFn) {
  // top-level await is OK in ESM; node-fetch is a dev/runtime dependency if needed
  const { default: nodeFetch } = await import('node-fetch');
  fetchFn = nodeFetch;
}

app.use(express.json());

// simple health endpoint used by validators
app.get('/', (req, res) => {
  res.status(200).type('application/json').json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/me', async (req, res) => {
    const catFactsUrl = "https://catfact.ninja/fact";
    try {
        const resp = await fetchFn(catFactsUrl);
        if (!resp.ok) throw new Error(`API error ${resp.status}`);
        const json = await resp.json();

        const userDetails = {
            status: 'success',
            user: {
                name: "Abdulazeez Jimoh",
                email: "damilolajimoh2020@gmail.com",
                stack: ["Node.js/Express"]
            },
            timestamp: new Date().toISOString(),
            fact: String(json.fact || json.data || '') // ensure string, robust to shape changes
        };

        // ensure correct Content-Type
        res.status(200).type('application/json').json(userDetails);
        console.log(userDetails);
    } catch (err) {
        console.error(err);
        // return 503 when upstream (cat fact) is unavailable
        res.status(503).type('application/json').json({ status: 'error', message: 'Failed to fetch cat fact' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
