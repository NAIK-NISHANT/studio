"use client";

import { useState, useEffect } from 'react';
import { mandiPrices, ProduceItem } from '@/app/lib/mandi-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, Save, RefreshCcw } from 'lucide-react';

export default function ProfitCalculator() {
  const [selectedItemId, setSelectedItemId] = useState(mandiPrices[0].id);
  const [transportCost, setTransportCost] = useState(2);
  const [wastePercentage, setWastePercentage] = useState(10);
  const [desiredProfit, setDesiredProfit] = useState(5);
  const [rrp, setRrp] = useState(0);
  const [netProfit, setNetProfit] = useState(0);

  const selectedItem = mandiPrices.find(i => i.id === selectedItemId) || mandiPrices[0];

  useEffect(() => {
    // Math: RRP = (Mandi + Transport) / (1 - Waste%) + Profit
    const mandiRate = selectedItem.mandiPrice;
    const effectiveCost = (mandiRate + transportCost) / (1 - (wastePercentage / 100));
    const calculatedRrp = Math.ceil(effectiveCost + desiredProfit);
    setRrp(calculatedRrp);
    setNetProfit(calculatedRrp - effectiveCost);
  }, [selectedItemId, transportCost, wastePercentage, desiredProfit, selectedItem]);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-extrabold text-primary">Price Intelligence</h1>
        <p className="text-muted-foreground">Calculate your village retail price</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator size={20} className="text-primary" />
              Input Costs
            </CardTitle>
            <CardDescription>Enter your actual expenses per KG</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Produce Item</Label>
              <Select value={selectedItemId} onValueChange={setSelectedItemId}>
                <SelectTrigger>
                  <SelectValue placeholder="Pick an item" />
                </SelectTrigger>
                <SelectContent>
                  {mandiPrices.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.icon} {item.name} (₹{item.mandiPrice})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Transport Cost (₹ per KG)</Label>
              <Input 
                type="number" 
                value={transportCost} 
                onChange={(e) => setTransportCost(Number(e.target.value))} 
                className="text-lg font-bold"
              />
              <p className="text-xs text-muted-foreground">Fuel, vehicle hire, labor, etc.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <Label>Wastage Allowance (%)</Label>
                <span className="text-primary font-bold">{wastePercentage}%</span>
              </div>
              <Slider 
                value={[wastePercentage]} 
                onValueChange={(val) => setWastePercentage(val[0])} 
                max={30} 
                step={1} 
              />
              <p className="text-xs text-muted-foreground">Factor in weight loss, damage, or rot.</p>
            </div>

            <div className="space-y-2">
              <Label>Target Net Profit (₹ per KG)</Label>
              <Input 
                type="number" 
                value={desiredProfit} 
                onChange={(e) => setDesiredProfit(Number(e.target.value))} 
                className="text-lg font-bold text-primary"
              />
            </div>
          </CardContent>
          <CardFooter>
             <Button variant="outline" className="w-full" onClick={() => {
               setTransportCost(2);
               setWastePercentage(10);
               setDesiredProfit(5);
             }}>
               <RefreshCcw size={16} className="mr-2" /> Reset
             </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest opacity-80">Recommended Retail Price</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <span className="text-7xl font-black">₹{rrp}</span>
              <span className="text-lg font-medium opacity-90">per {selectedItem.unit}</span>
            </CardContent>
            <CardFooter className="bg-black/10 flex justify-between py-4">
              <div className="text-center w-full">
                <p className="text-xs uppercase font-bold opacity-70">Estimated Net Profit</p>
                <p className="text-xl font-bold">₹{netProfit.toFixed(1)} / {selectedItem.unit}</p>
              </div>
            </CardFooter>
          </Card>

          <Card className="border-dashed border-2 bg-transparent">
            <CardContent className="p-6">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Save size={18} className="text-secondary" />
                Next Steps
              </h4>
              <ul className="text-sm space-y-3 text-muted-foreground">
                <li>• This price ensures you cover all costs and get ₹{desiredProfit} profit.</li>
                <li>• Use the <strong>Price Board</strong> mode to show this to customers.</li>
                <li>• Monitor <strong>Trends</strong> to see if you should buy more today.</li>
              </ul>
              <Button className="w-full mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                Update Digital Price Board
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}