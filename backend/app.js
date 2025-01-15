import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer-core';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import cron from 'node-cron';

dotenv.config();

import userRoutes from './routes/auth.js';
import webRoutes from './routes/website.js';
import websiteschema from './models/Website.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(webRoutes);

// Validate environment variables
if (!process.env.G_EMAIL || !process.env.G_PASSWORD || !process.env.MONGO_URI) {
  console.error('Missing required environment variables. Check your .env file.');
  process.exit(1);
}

// Nodemailer Transport
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.G_EMAIL,
    pass: process.env.G_PASSWORD,
  },
});

// Helper: Check if a site is active
const isSiteActive = async (url) => {
  try {
    const resp = await axios.get(url);
    return resp.status === 200;
  } catch (err) {
    return false;
  }
};

// Lighthouse Functionality
let lastResult = null;

const runLighthouse = async (websiteUrl) => {
  let chrome = null;
  let browser = null;
  let retries = 3;

  while (retries > 0) {
    try {
      chrome = await chromeLauncher.launch({
        chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'], 
      });

      browser = await puppeteer.connect({
        browserURL: `http://localhost:${chrome.port}`, // Ensure correct connection
        defaultViewport: { width: 1200, height: 800 },  // Set default viewport for better rendering
      });

      const options = {
        port: chrome.port,
        onlyCategories: ['performance', 'accessibility', 'seo'],
        output: 'json',  // Output in JSON format
      };

      // Lighthouse execution
      const { lhr } = await lighthouse(websiteUrl, options);
      
      if (!lhr) {
        console.error("Lighthouse failed to return valid results.");
        throw new Error('Lighthouse failed.');
      }

      // Checking the lighthouse scores
      const scores = {
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
      };

      console.log('Lighthouse analysis complete. Scores:', scores);

      // Cache the result
      lastResult = { url: websiteUrl, scores };
      return scores;
    } catch (error) {
      console.error(`Lighthouse analysis failed, retries left: ${retries}`, error.message);
      retries -= 1;
      if (retries === 0) {
        throw new Error('Lighthouse analysis failed after 3 retries.');
      }
    } finally {
      if (browser) await browser.disconnect();
      if (chrome) await chrome.kill();
    }
  }
};

// API: Run Lighthouse
app.post('/analysis', async (req, res) => {
  const { websiteUrl } = req.body;

  if (!/^https?:\/\/[\w.-]+/.test(websiteUrl)) {
    return res.status(400).json({ error: 'Invalid website URL format.' });
  }

  if (lastResult && lastResult.url === websiteUrl) {
    return res.status(200).json(lastResult.scores);
  }

  try {
    const scores = await runLighthouse(websiteUrl);
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cron Job: Check Website Status
cron.schedule('*/1 * * * *', async () => {
  console.log('Running cron job to check website statuses...');
  const allWebsites = await websiteschema.find({}).populate('userId', 'name email');
  if (!allWebsites.length) {
    console.log('No websites found.');
    return;
  }

  for (let website of allWebsites) {
    const { url, isActive, userId } = website;
    const siteActive = await isSiteActive(url);

    await websiteschema.updateOne({ _id: website._id }, { isActive: siteActive });

    if (!siteActive && isActive) {
      console.log(`Website ${url} is down. Sending email to ${userId.email}.`);
      transport.sendMail({
        from: process.env.G_EMAIL,
        to: userId.email,
        subject: 'Your website is down. Please check.',
        html: `Your website - <b>${url}</b> is down. As checked on ${new Date().toLocaleString()}.`,
      });
    }
  }
});

// Connect to MongoDB and Start Server
const PORT = 8000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log('Connected to MongoDB successfully.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
