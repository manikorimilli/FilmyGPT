import OpenAI from 'openai';

// OpenRouter speaks the OpenAI API, so the openai client works with its base URL.
export const AI_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

let client = null;

// Created on first use, so a missing key only affects GPT search
// instead of crashing the whole app on load.
export const getAIClient = () => {
  const apiKey = process.env.REACT_APP_OPENROUTER_KEY;
  if (!apiKey) return null;

  if (!client) {
    client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
      defaultHeaders: {
        "HTTP-Referer": window.location.origin,
        "X-Title": "FilmyGPT",
      },
    });
  }
  return client;
};
