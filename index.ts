import Fastify from "fastify";
import { readFile } from "./src/services/file-reader";
import { getArticlePrompt } from "./src/services/ai/prompt";
import { OpenAIService } from "./src/services/ai/open-ai";
import * as dotenv from "dotenv";
import { splitTextIntoChunks } from "./src/services/ai/split-to-chunks";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("No OpenAI API key provided");
  }

  const file = readFile("public/file/art.txt").replace(
    /[^\x20-\x7E\u00A0-\u017F]/g,
    ""
  );
  const chunks = splitTextIntoChunks(file);

  const messages = getArticlePrompt(chunks);

  const aiService = new OpenAIService(apiKey);
  const result = await aiService.completion(messages);

  const resultHTML = result.choices[0].message.content;

  return { html: resultHTML };
});

try {
  dotenv.config();
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
