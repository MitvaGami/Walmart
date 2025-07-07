// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// --- 1. IMPORT DATA FROM OUR NEW FILE ---
const { WALMART_ASSETS, DEMO_RISKS } = require('./locations.js');

const app = express();
const PORT = 5000;
app.use(cors());

// --- YOUR API KEY ---
const NEWS_API_KEY = 'cc465d64066b427fbfd97af01ff59936';

app.get('/api/risks', async (req, res) => {
  console.log("Request received for ADVANCED GLOBAL risks analysis...");
  try {
    const keywords = [
        'hurricane', 'earthquake', 'flood', 'typhoon', 'wildfire', 'tsunami',
        'strike', 'protest', 'lockdown', 'tariff', '"trade war"', '"border closure"',
        'congestion', 'delay', 'accident', 'explosion', 'blockage', '"power outage"',
        '"factory fire"', 'bankruptcy'
    ].join(' OR ');

    const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=(${keywords})&apiKey=${NEWS_API_KEY}&pageSize=100&sortBy=relevancy&language=en`);
    
    const articles = newsResponse.data.articles;
    const relevantRisks = [];
    const foundArticles = new Set(); // Use a Set to prevent duplicate articles for different aliases

    for (const article of articles) {
      if (foundArticles.has(article.url)) continue; // Skip if we've already processed this article

      for (const asset of WALMART_ASSETS) {
        // --- 2. UPGRADED ALIAS MATCHING LOGIC ---
        // Now we loop through the aliases for each asset
        for (const alias of asset.aliases) {
          const articleText = `${article.title} ${article.description}`.toLowerCase();
          if (articleText.includes(alias)) {
            relevantRisks.push({
              id: article.url, // Use URL for a unique ID
              title: article.title,
              sourceName: article.source.name,
              sourceUrl: article.url,
              riskLevel: 'high',
              locationName: asset.name,
              lat: asset.lat,
              lon: asset.lon,
            });
            foundArticles.add(article.url); // Mark this article as processed
            break; // Move to the next article
          }
        }
        if (foundArticles.has(article.url)) break; // Exit the asset loop as well
      }
    }
    
    // --- DEMO FALLBACK LOGIC ---
    if (relevantRisks.length === 0) {
        console.log("No real-time global risks found. Serving DEMO data for the presentation.");
        return res.json(DEMO_RISKS); 
    } else {
        console.log(`Success! Found ${relevantRisks.length} real-time global risks.`);
        return res.json(relevantRisks);
    }

  } catch (error) {
    console.error("Error during global analysis:", error.message);
    return res.json(DEMO_RISKS); 
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});