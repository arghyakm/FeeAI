'use server';

/**
 * @fileOverview An AI agent to answer student fee-related questions.
 *
 * - feeAssistantQuery - A function that handles the fee-related question answering process.
 * - FeeAssistantQueryInput - The input type for the feeAssistantQuery function.
 * - FeeAssistantQueryOutput - The return type for the feeAssistantQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeeAssistantQueryInputSchema = z.object({
  query: z.string().describe('The query about student fees.'),
});
export type FeeAssistantQueryInput = z.infer<typeof FeeAssistantQueryInputSchema>;

const FeeAssistantQueryOutputSchema = z.object({
  reply: z.string().describe('The reply to the student question.'),
});
export type FeeAssistantQueryOutput = z.infer<typeof FeeAssistantQueryOutputSchema>;

export async function feeAssistantQuery(input: FeeAssistantQueryInput): Promise<FeeAssistantQueryOutput> {
  return feeAssistantQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'feeAssistantQueryPrompt',
  input: {schema: FeeAssistantQueryInputSchema},
  output: {schema: FeeAssistantQueryOutputSchema},
  prompt: `You are FeeBuddy, a friendly Indian university fee assistant.
  Answer the following question about student fees:
  {{query}}`,
});

const feeAssistantQueryFlow = ai.defineFlow(
  {
    name: 'feeAssistantQueryFlow',
    inputSchema: FeeAssistantQueryInputSchema,
    outputSchema: FeeAssistantQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
