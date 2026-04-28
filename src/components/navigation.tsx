"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calculator, Monitor, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: LayoutDashboard },
    { name: 'Calculator', href: '/calculator', icon: Calculator },
    { name: 'Price Board', href: '/slate', icon: Monitor },
    { name: 'Trends', href: '/trends', icon: TrendingUp },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:top-0 md:bottom-auto md:border-b md:border-t-0 h-16 flex items-center justify-around px-4">
      <div className="hidden md:flex items-center gap-2 mr-auto">
        <span className="text-primary font-bold text-xl tracking-tight">SANTE PRICE INDEX</span>
      </div>
      <div className="flex w-full md:w-auto justify-around md:gap-8 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col md:flex-row items-center gap-1 transition-colors px-3 py-1 rounded-md",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] md:text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}