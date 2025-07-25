const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/api/promotions', async (req, res) => {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .order('id', { ascending: false })
    .limit(50);

  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  const { error } = await supabase
    .from('newsletter')
    .insert({ email });

  if (error) return res.status(500).json({ error });
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`PromoGlow backend running on port ${PORT}`));
