'use server';
/**
 * @fileOverview A Genkit flow for predicting price trends for produce items based on current prices.
 *
 * - predictPriceTrends - A function that initiates the price trend prediction.
 * - VendorPriceTrendPredictionInput - The input type for the predictPriceTrends function.
 * - VendorPriceTrendPredictionOutput - The return type for the predictPriceTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VendorPriceTrendPredictionInputSchema = z.array(
  z.object({
    item: z.string().describe('The name of the produce item (e.g., "Onion", "Tomato").'),
    currentPrice: z.number().describe('The current price of the produce item.'),
  })
).describe('A list of produce items with their current prices for trend prediction.');
export type VendorPriceTrendPredictionInput = z.infer<typeof VendorPriceTrendPredictionInputSchema>;

const VendorPriceTrendPredictionOutputSchema = z.object({
  predictions: z.array(
    z.object({
      item: z.string().describe('The name of the produce item.'),
      trend: z.enum(['Rise', 'Fall', 'Stable']).describe('The predicted price trend for the item.'),
      reason: z.string().describe('A brief explanation for the predicted trend.'),
    })
  ).describe('Individual price predictions for each produce item.'),
  overallInsight: z.string().describe('A general simulated insight into the overall market trend and advice for the vendor.'),
}).describe('Predicted price trends and an overall market insight for the vendor.');
export type VendorPriceTrendPredictionOutput = z.infer<typeof VendorPriceTrendPredictionOutputSchema>;

// Exported wrapper function
export async function predictPriceTrends(input: VendorPriceTrendPredictionInput): Promise<VendorPriceTrendPredictionOutput> {
  return vendorPriceTrendPredictionFlow(input);
}

const vendorPriceTrendPredictionPrompt = ai.definePrompt({
  name: 'vendorPriceTrendPredictionPrompt',
  input: { schema: VendorPriceTrendPredictionInputSchema },
  output: { schema: VendorPriceTrendPredictionOutputSchema },
  prompt: `You are a market analyst specializing in agricultural produce in local "Mandi" markets, providing insights to small vendors. Your goal is to predict short-term price trends (rise, fall, or stable) for specific produce items based on current prices and simulate market factors. Provide a brief reason for each trend. Finally, offer an overall market insight for the vendor.

Current Produce Prices:
{{#each this}}
- Item: {{{item}}}, Current Price: {{{currentPrice}}}
{{/each}}

Based on the current prices, analyze potential market dynamics such as supply/demand, seasonal changes, local events, or news (simulate these if no explicit information is given).

Provide your predictions and an overall insight in the specified JSON format.`,
});

const vendorPriceTrendPredictionFlow = ai.defineFlow(
  {
    name: 'vendorPriceTrendPredictionFlow',
    inputSchema: VendorPriceTrendPredictionInputSchema,
    outputSchema: VendorPriceTrendPredictionOutputSchema,
  },
  async (input) => {
    const { output } = await vendorPriceTrendPredictionPrompt(input);
    return output!;
  }
);
