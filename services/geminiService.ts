import { GoogleGenAI, Type } from "@google/genai";
import { Paper, Session, ScheduleGenerationParams } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const modelName = 'gemini-2.5-flash';

export const generateSchedule = async (params: ScheduleGenerationParams): Promise<Session[]> => {
  if (!apiKey) throw new Error("API Key is missing");

  const prompt = `Generate a realistic conference schedule for a conference with the theme "${params.theme}".
  It should span ${params.days} day(s) and have ${params.tracks} track(s).
  Provide specific, creative session titles and fictional speaker names.
  Include Keynotes, Breakout Sessions, and Networking breaks.
  Return a JSON array.`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              time: { type: Type.STRING },
              title: { type: Type.STRING },
              speaker: { type: Type.STRING },
              room: { type: Type.STRING },
              track: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["time", "title", "speaker", "room", "track"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const rawSessions = JSON.parse(text) as any[];
    return rawSessions.map((s, index) => ({
      ...s,
      id: s.id || `gen-session-${index}-${Date.now()}`
    }));
  } catch (error) {
    console.error("Failed to generate schedule:", error);
    throw error;
  }
};

export const reviewPaper = async (paper: Paper): Promise<NonNullable<Paper['aiReview']>> => {
  if (!apiKey) throw new Error("API Key is missing");

  const prompt = `Act as a strict academic reviewer. Review the following conference paper abstract.
  
  Title: ${paper.title}
  Author: ${paper.author}
  Abstract: ${paper.abstract}

  Provide:
  1. A brief summary (max 2 sentences).
  2. A list of 3 potential pros/strengths.
  3. A list of 3 potential cons/weaknesses.
  4. A preliminary verdict (Strong Accept, Accept, Weak Accept, Reject).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                cons: { type: Type.ARRAY, items: { type: Type.STRING } },
                verdict: { type: Type.STRING }
            },
            required: ["summary", "pros", "cons", "verdict"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to review paper:", error);
    throw error;
  }
};