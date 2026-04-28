"use client";

import { useState } from 'react';
import { mandiPrices } from '@/app/lib/mandi-data';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PriceBoard() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % mandiPrices.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + mandiPrices.length) % mandiPrices.length);

  const currentItem = mandiPrices[currentIndex];

  // We add a mock RRP for display purposes here - in a real app this would come from the calculator state
  const mockRrp = Math.ceil(currentItem.mandiPrice * 1.4);

  return (
    <div className={cn(
      "flex flex-col transition-all duration-500",
      isFullscreen ? "fixed inset-0 z-[100] bg-black p-4" : "space-y-6"
    )}>
      {!isFullscreen && (
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-primary">Price Board</h1>
            <p className="text-muted-foreground">Digital Slate for Village Customers</p>
          </div>
          <Button onClick={() => setIsFullscreen(true)} className="bg-primary hover:bg-primary/90">
            <Maximize2 size={18} className="mr-2" /> Full Screen
          </Button>
        </header>
      )}

      <div className={cn(
        "flex-1 flex flex-col items-center justify-center rounded-2xl transition-all duration-700",
        isFullscreen ? "bg-black" : "bg-card border-4 border-primary min-h-[400px]"
      )}>
        {isFullscreen && (
          <Button 
            variant="ghost" 
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 hover:bg-white/10"
          >
            <Minimize2 size={24} />
          </Button>
        )}

        <div className="w-full flex items-center justify-between px-8">
          <button onClick={prev} className="p-4 rounded-full hover:bg-white/10 text-primary transition-colors">
            <ChevronLeft size={isFullscreen ? 64 : 32} className={isFullscreen ? "text-yellow-400" : ""} />
          </button>

          <div className="text-center animate-in zoom-in-95 duration-300">
            <p className={cn(
              "font-black uppercase tracking-[0.2em] mb-4",
              isFullscreen ? "text-yellow-400 text-6xl" : "text-primary text-2xl"
            )}>
              {currentItem.name}
            </p>
            
            <div className="flex flex-col items-center">
              <span className={cn(
                "font-black leading-none",
                isFullscreen ? "text-yellow-400 text-[18rem]" : "text-primary text-9xl"
              )}>
                ₹{mockRrp}
              </span>
              <span className={cn(
                "font-bold uppercase tracking-widest mt-4",
                isFullscreen ? "text-yellow-400/80 text-4xl" : "text-primary/80 text-xl"
              )}>
                per {currentItem.unit}
              </span>
            </div>
          </div>

          <button onClick={next} className="p-4 rounded-full hover:bg-white/10 text-primary transition-colors">
            <ChevronRight size={isFullscreen ? 64 : 32} className={isFullscreen ? "text-yellow-400" : ""} />
          </button>
        </div>

        {isFullscreen && (
          <div className="absolute bottom-12 text-yellow-400/40 font-bold tracking-widest text-xl">
             SANTE-PRICE INDEX • UPDATED DAILY
          </div>
        )}
      </div>

      {!isFullscreen && (
        <div className="grid grid-cols-4 gap-2">
          {mandiPrices.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1",
                currentIndex === idx 
                  ? "border-primary bg-primary/10" 
                  : "border-border bg-card opacity-50 hover:opacity-100"
              )}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[10px] font-bold uppercase truncate w-full text-center">
                {item.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}