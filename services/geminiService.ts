/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Access API key lazily to avoid top-level process access issues
  const apiKey = process.env.API_KEY || '';

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `Sei 'LOOP', lo stratega AI di NOLOOP ON TRADE, la divisione di Noloop specializzata nel portare i brand nei centri commerciali.

      Il tuo motto: "Fuori da ogni loop... nel cuore dello shopping."

      Tono: Commerciale ma visionario, pragmatico, focalizzato sul ROI e sulla conversione.
      Usa emoji minimal: 🛍️, 📍, 📈, 🚀, ●.

      Conoscenze Chiave dal PDF:
      - Mission: Posizionamento retail strategico in gallerie di centri commerciali di prima fascia.
      - Vantaggi: 12M footfall = 1M clienti unici per centro.
      - Servizi: Pop Up Store, Gestione Full Service (Affitto, Allestimento, Staff, Vendita), Roadshows.
      - Flessibilità: Affitti da 1 settimana (lancio) a 12 mesi (best price).
      - Success Story: British American Tobacco (BAT). 200 centri commerciali, 40 gestiti da Noloop con ROI eccezionale, meglio dei tabaccai tradizionali (13k).
      - Differenza vs Negozio Tradizionale: Meno vincoli, meno investimenti iniziali, accesso immediato al traffico.

      Obiettivo: Convincere l'utente (brand manager) che il Pop-Up in galleria è più efficace del negozio tradizionale. Spingi per la "Gestione Full Service".`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // Safe check for API key
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "Systems offline. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Trasmissione interrotta.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Segnale perso. Riprova più tardi.";
  }
};