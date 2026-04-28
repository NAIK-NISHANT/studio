"use client";

import { useState } from 'react';
import { predictPriceTrends, VendorPriceTrendPredictionOutput } from '@/ai/flows/vendor-price-trend-prediction-flow';
import { mandiPrices } from '@/app/lib/mandi-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, TrendingDown, Minus, Loader2, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PriceTrends() {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<VendorPriceTrendPredictionOutput | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const input = mandiPrices.slice(0, 5).map(item => ({
        item: item.name,
        currentPrice: item.mandiPrice
      }));
      const result = await predictPriceTrends(input);
      setPredictions(result);
    } catch (error) {
      console.error("Failed to fetch trends", error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Rise': return <TrendingUp className="text-destructive" size={20} />;
      case 'Fall': return <TrendingDown className="text-green-500" size={20} />;
      default: return <Minus className="text-muted-foreground" size={20} />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Rise': return "border-destructive/30 bg-destructive/5";
      case 'Fall': return "border-green-500/30 bg-green-500/5";
      default: return "border-muted-foreground/30 bg-muted-foreground/5";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary">Market Intelligence</h1>
          <p className="text-muted-foreground">AI-powered predictions for the next week</p>
        </div>
        <Button 
          onClick={handlePredict} 
          disabled={loading}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
        >
          {loading ? <Loader2 className="mr-2 animate-spin" size={18} /> : <BrainCircuit className="mr-2" size={18} />}
          Get New Predictions
        </Button>
      </header>

      {!predictions && !loading && (
        <Card className="border-dashed border-2 py-12 flex flex-col items-center justify-center text-center">
          <div className="bg-primary/10 p-6 rounded-full mb-4">
            <Sparkles size={48} className="text-primary" />
          </div>
          <CardTitle className="mb-2">Discover Future Trends</CardTitle>
          <CardDescription className="max-w-md px-6">
            Our AI analyzes current Mandi prices to simulate short-term market shifts. 
            Click the button above to start your analysis.
          </CardDescription>
        </Card>
      )}

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-24" />
            </Card>
          ))}
        </div>
      )}

      {predictions && !loading && (
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BrainCircuit className="text-primary" size={20} />
                Market Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium leading-relaxed italic text-foreground">
                "{predictions.overallInsight}"
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            {predictions.predictions.map((p, idx) => (
              <Card key={idx} className={cn("border-l-4", getTrendColor(p.trend))}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-background border">
                    {getTrendIcon(p.trend)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-black text-xl">{p.item}</h3>
                      <Badge variant={p.trend === 'Rise' ? 'destructive' : p.trend === 'Fall' ? 'default' : 'secondary'}>
                        {p.trend === 'Rise' ? 'Selling Price Likely to Rise' : p.trend === 'Fall' ? 'Selling Price Likely to Fall' : 'Stable Market'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{p.reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}