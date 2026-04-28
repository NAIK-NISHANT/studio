"use client";

import { mandiPrices } from '@/app/lib/mandi-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="space-y-2">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-primary">Daily Price Watch</h1>
            <p className="text-muted-foreground">Today's Mandi Market Rates ({today})</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary px-3 py-1">
            Live Updates
          </Badge>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mandiPrices.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:border-primary/50 transition-colors">
            <CardContent className="p-0">
              <div className="flex items-center">
                <div className="bg-muted p-6 text-4xl">
                  {item.icon}
                </div>
                <div className="flex-1 p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Current Mandi Rate</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-primary">₹{item.mandiPrice}</span>
                    <span className="text-xs ml-1 font-medium text-muted-foreground">/{item.unit}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Info size={20} />
            <CardTitle className="text-lg">About Mandi Prices</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            These prices are fetched from city Mandi records. Use the <strong>Profit Calculator</strong> 
            to add your transport and wastage costs to get a <strong>Recommended Retail Price (RRP)</strong> 
            for your village Sante.
          </p>
          <Link href="/calculator" className="mt-4 inline-block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold group">
              Start Calculating
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}