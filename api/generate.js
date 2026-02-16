import Groq from "groq-sdk";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST allowed" });
    }

    const { type, topic, tone, words } = req.body;

    if (!type || !topic || !tone || !words) {
        return res.status(400).json({ message: "Missing fields" });
    }

    try {

        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a structured professional writing assistant."
                },
                {
                    role: "user",
                    content: `Write a ${type} about ${topic}.
Tone: ${tone}
Word limit: approximately ${words} words.
Use headings with markdown.`
                }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
        });

        const content = completion.choices[0].message.content;

        res.status(200).json({
            content
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}
