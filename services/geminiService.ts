import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateIceBreaker = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-flash-lite-latest',
            contents: `Generate a witty, charming, and slightly flirty opening line for a dating app. The tone should be confident but not arrogant. Make it one short sentence. It must be in Spanish. Do not add quotes around it.`,
            config: {
                thinkingConfig: { thinkingBudget: 0 },
            },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating ice breaker:", error);
        return "Hubo un error al generar la frase. Intenta de nuevo.";
    }
};

const getToneDescription = (tone: number): string => {
    if (tone <= 20) return 'ingeniosa, sutil y un poco nerd. Usa referencias inteligentes.';
    if (tone <= 40) return 'divertida, casual y amigable. Haz preguntas abiertas.';
    if (tone <= 60) return 'juguetona y un poco coqueta, pero sin ser demasiado directo.';
    if (tone <= 80) return 'confiado, atrevido y con un toque de misterio, sugiriendo planes futuros sin ser explícito.';
    // Refined per user feedback for a clever, daring style.
    return 'atrevido, carismático y magnético. Usa humor juguetón y metáforas ingeniosas para crear respuestas inesperadas y memorables.';
};


export const analyzeChatAndSuggestReply = async (
    base64Image: string, 
    mimeType: string, 
    tone: number
): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                mimeType: mimeType,
                data: base64Image,
            },
        };

        const toneDescription = getToneDescription(tone);

        const textPart = {
            text: `
**MISIÓN:** Eres un coach de ligue de clase mundial, un maestro del ingenio. Tu objetivo es crear la respuesta perfecta para un usuario en una app de citas.

**CONTEXTO:** Te proporcionaré una captura de pantalla de una conversación.
- Los mensajes de **TU USUARIO** (a quien estás ayudando, que es de la generación z) están en el lado **DERECHO**.
- Los mensajes de la **OTRA PERSONA** están en el lado **IZQUIERDO**.

**TAREA:**
1.  **Analiza** la conversación completa para entender el tema, el ambiente y el contexto.
2.  **Identifica** el último mensaje enviado por la persona de la **IZQUIERDA**. Este es el mensaje al que debes responder.
3.  **Crea** una respuesta corta, ingeniosa y carismática para que tu usuario (el de la derecha) la envíe.
4.  La respuesta debe tener un tono **${toneDescription}**.
5.  La respuesta debe ser en español.

**EJEMPLOS DE ORO DE RESPUESTAS ATREVIDAS:**
- Si te preguntan "¿quién eres?", una buena respuesta es: "la persona que te va a invitar a salir, ¿quién más?"
- Si te preguntan "¿cuál dinero???", una buena respuesta es: "¿crees que vivir en mi corazón es gratis? 👀"

**REGLA CRÍTICA DE SALIDA:**
Responde **ÚNICAMENTE** con el texto del mensaje que tu usuario debe enviar. No añadas comillas en nigúno de los casos, ni "Respuesta:", ni "Aquí tienes una sugerencia:", ni ninguna otra explicación. Solo el texto puro de la respuesta.
`,
        };

        const response = await ai.models.generateContent({
            model: 'gemini-flash-lite-latest',
            contents: { parts: [imagePart, textPart] },
            config: {
                thinkingConfig: { thinkingBudget: 0 },
            },
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error analyzing chat:", error);
        return "No pudimos analizar el chat. Intenta con otra imagen.";
    }
};