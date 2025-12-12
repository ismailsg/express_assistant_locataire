// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// const GROQ_API_KEY = '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'; // Ta clé Groq

// app.post('/api/chat', async (req, res) => {
//   try {
//     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${GROQ_API_KEY}`
//       },
//       body: JSON.stringify(req.body)
//     });

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('Erreur:', error);
//     res.status(500).json({ error: 'Erreur serveur' });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialisation du client Groq
const groq = new Groq({ apiKey: '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' }); // Ta clé Groq

app.post('/api/chat', async (req, res) => {
  try {
    const messages = req.body.messages;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'Aucun message fourni' });
    }

    // Appel à l'API Groq avec toute la conversation
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: messages
    });

    res.json(response);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

