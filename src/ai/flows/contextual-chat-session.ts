'use server';
/**
 * @fileOverview An AI agent that provides contextual chat support for student fee inquiries.
 *
 * - contextualChatSession - A function that handles the contextual chat session.
 * - ContextualChatSessionInput - The input type for the contextualChatSession function.
 * - ContextualChatSessionOutput - The return type for the contextualChatSession function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextualChatSessionInputSchema = z.object({
  prompt: z.string().describe('The user prompt.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The chat history of the session.'),
});
export type ContextualChatSessionInput = z.infer<typeof ContextualChatSessionInputSchema>;

const ContextualChatSessionOutputSchema = z.object({
  reply: z.string().describe('The AI assistant reply.'),
});
export type ContextualChatSessionOutput = z.infer<typeof ContextualChatSessionOutputSchema>;

export async function contextualChatSession(input: ContextualChatSessionInput): Promise<ContextualChatSessionOutput> {
  return contextualChatSessionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextualChatSessionPrompt',
  input: {schema: ContextualChatSessionInputSchema},
  output: {schema: ContextualChatSessionOutputSchema},
  prompt: `You are FeeBuddy, a friendly Indian university fee assistant. Use a helpful and friendly tone. Pay attention to the previous questions in the chat history to give personalized answers. Consider the cultural context and use Indian colloquial terms where appropriate, for example, use "Challan" instead of receipt. Always show fee amounts in ₹ symbol, e.g., ₹ 35,000

Chat History:
{{#each chatHistory}}
  {{this.role}}: {{this.content}}
{{/each}}

User Prompt: {{{prompt}}}`,
});

const contextualChatSessionFlow = ai.defineFlow(
  {
    name: 'contextualChatSessionFlow',
    inputSchema: ContextualChatSessionInputSchema,
    outputSchema: ContextualChatSessionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {reply: output!.reply!};
  }
);
