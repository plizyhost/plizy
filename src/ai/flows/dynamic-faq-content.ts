'use server';

/**
 * @fileOverview This file defines a Genkit flow for dynamically generating FAQ content using an LLM.
 *
 * It includes:
 * - `generateFaqContent`: An asynchronous function that takes a question string as input and returns a generated answer.
 * - `GenerateFaqContentInput`: The input type for the generateFaqContent function.
 * - `GenerateFaqContentOutput`: The output type for the generateFaqContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFaqContentInputSchema = z.object({
  question: z.string().describe('The question to generate an answer for.'),
});
export type GenerateFaqContentInput = z.infer<typeof GenerateFaqContentInputSchema>;

const GenerateFaqContentOutputSchema = z.object({
  answer: z.string().describe('The generated answer to the question.'),
});
export type GenerateFaqContentOutput = z.infer<typeof GenerateFaqContentOutputSchema>;

export async function generateFaqContent(input: GenerateFaqContentInput): Promise<GenerateFaqContentOutput> {
  return generateFaqContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFaqContentPrompt',
  input: {schema: GenerateFaqContentInputSchema},
  output: {schema: GenerateFaqContentOutputSchema},
  prompt: `You are a helpful AI assistant that answers questions about an IPTV service.\n\n  Question: {{{question}}}\n\n  Answer: `,
});

const generateFaqContentFlow = ai.defineFlow(
  {
    name: 'generateFaqContentFlow',
    inputSchema: GenerateFaqContentInputSchema,
    outputSchema: GenerateFaqContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
