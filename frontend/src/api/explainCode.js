export async function explainCode(code, mode) {
  if (!code || code.trim() === "") {
    return "Please paste some code to explain.";
  }

  const prompt = `
You are an expert software engineer.

Explain the following code in "${mode}" mode.

Guidelines:
- Student / ELI5 → very simple language
- Senior Developer → technical depth
- Be structured and clear
- Do NOT hallucinate functionality

Code:
${code}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini response:", data);

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map(p => p.text)
        .join("");

    return text || "Gemini returned an empty response.";
  } catch (error) {
    console.error("Gemini error:", error);
    return "Error while connecting to Gemini API.";
  }
}
