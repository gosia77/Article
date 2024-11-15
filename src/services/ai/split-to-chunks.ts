export const splitTextIntoChunks = (text: string, maxTokens = 2000) => {
  const avgTokenLength = 4;
  const maxChunkSize = maxTokens * avgTokenLength;

  const paragraphs = text.split(/\n/g);
  const chunks = [];
  let currentChunk = "";

  paragraphs.forEach((paragraph) => {
    if (currentChunk.length + paragraph.length <= maxChunkSize) {
      currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = paragraph;
    }
  });

  if (currentChunk) chunks.push(currentChunk);

  return chunks;
};
