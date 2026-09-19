import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily/safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "PearlStream TV", timestamp: new Date().toISOString() });
});

// Personalized recommendation API endpoint
app.post("/api/recommendations", async (req, res) => {
  try {
    const { watchHistory = [], favoriteCategories = [], userMood = "thrilling", language = "Luganda/English" } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback heuristics if no API key is set
      return res.json({
        source: "heuristic",
        recommendations: [
          {
            id: "rec-fallback-1",
            title: "Arsenal vs Manchester City - 4K Live",
            category: "sports",
            matchScore: 99,
            reason: "Top live match trending now in Uganda & worldwide with 4K UHD stream",
            badge: "4K HDR • LIVE",
            duration: "Live Now",
            rating: "9.9/10"
          },
          {
            id: "rec-fallback-2",
            title: "NBS Live At 9 - Prime Edition",
            category: "uganda",
            matchScore: 96,
            reason: "Uganda's premier investigative evening bulletin in crystal clear 1080p60",
            badge: "UG LOCAL • NEWS",
            duration: "60 min",
            rating: "9.5/10"
          },
          {
            id: "rec-fallback-3",
            title: "Bukedde Agataliiko Nfuufu",
            category: "uganda",
            matchScore: 94,
            reason: "Most popular Luganda local drama & street news bulletin",
            badge: "LUGANDA • VIRAL",
            duration: "45 min",
            rating: "9.3/10"
          },
          {
            id: "rec-fallback-4",
            title: "UEFA Champions League: Real Madrid vs Bayern",
            category: "sports",
            matchScore: 92,
            reason: "High octane European football tailored to your sports affinity",
            badge: "4K 60FPS • STADIUM AUDIO",
            duration: "115 min",
            rating: "9.8/10"
          },
          {
            id: "rec-fallback-5",
            title: "Pearl of Africa: Rwenzori Expedition (4K IMAX)",
            category: "documentary",
            matchScore: 90,
            reason: "Spectacular Ugandan wildlife & alpine glaciated peaks in true 4K HDR",
            badge: "4K DOLBY VISION",
            duration: "1h 48m",
            rating: "9.7/10"
          }
        ]
      });
    }

    const prompt = `You are the AI Recommendation Engine for an Android TV streaming application called "PearlStream TV", popular in Uganda and East Africa with international sports and local Ugandan TV.
User context:
- Watch History: ${JSON.stringify(watchHistory.slice(-5))}
- Preferred Categories: ${favoriteCategories.join(", ") || "Sports, Ugandan Local TV, 4K Movies"}
- Current User Mood: ${userMood}
- Preferred Commentary/Language: ${language}

Generate 5 personalized content recommendations. Return strict JSON only.
Format:
{
  "recommendations": [
    {
      "id": "rec-1",
      "title": "Title here",
      "category": "sports" | "uganda" | "movies" | "series",
      "matchScore": 95,
      "reason": "Because you enjoyed [X] and love live sports commentary...",
      "badge": "4K HDR • LIVE",
      "duration": "Duration or status",
      "rating": "9.8/10"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({
      source: "gemini",
      recommendations: parsed.recommendations || []
    });
  } catch (error: any) {
    console.warn("AI recommendation error, falling back to smart defaults:", error?.message);
    return res.json({
      source: "fallback",
      recommendations: [
        {
          id: "rec-fb-1",
          title: "Premier League: Arsenal vs Manchester City",
          category: "sports",
          matchScore: 98,
          reason: "Highest rated sports broadcast in 4K UHD with Luganda & English dual audio",
          badge: "4K HDR • LIVE",
          duration: "Live Now",
          rating: "9.9/10"
        },
        {
          id: "rec-fb-2",
          title: "NBS Barometer Talk Show",
          category: "uganda",
          matchScore: 95,
          reason: "Uganda's hard-hitting political debate in HD",
          badge: "UG LOCAL",
          duration: "1h 30m",
          rating: "9.4/10"
        },
        {
          id: "rec-fb-3",
          title: "Uganda Premier League: KCCA FC vs Vipers SC",
          category: "sports",
          matchScore: 93,
          reason: "Derby clash from St. Mary's Stadium Kitende",
          badge: "4K 60FPS • LOCAL SPORTS",
          duration: "Live Now",
          rating: "9.6/10"
        }
      ]
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PearlStream TV server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
