"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex items-center gap-1 rounded-full p-1 border border-[var(--line-subtle)] bg-[var(--surface-1)] ${className}`}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className = "", children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer text-[var(--text-2)] hover:text-[var(--text-1)] data-[state=active]:bg-[var(--surface-3)] data-[state=active]:text-[var(--text-1)] data-[state=active]:shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${className}`}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`mt-4 focus-visible:outline-none ${className}`}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
