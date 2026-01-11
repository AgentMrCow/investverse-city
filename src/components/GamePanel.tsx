import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface GamePanelProps {
  title: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
}

export function GamePanel({
  title,
  description,
  trigger,
  children,
  contentClassName,
}: GamePanelProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="max-h-[92vh]">
          <DrawerHeader className="border-b border-border/60 bg-card/70 px-6 py-4 text-left">
            <DrawerTitle className="font-display text-xl font-semibold">{title}</DrawerTitle>
            {description && <DrawerDescription className="mt-2">{description}</DrawerDescription>}
          </DrawerHeader>
          <ScrollArea className="max-h-[70vh] px-6 pb-6">
            <div className={cn("pt-6 space-y-6", contentClassName)}>{children}</div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[95vw] max-w-5xl p-0 overflow-hidden">
        <DialogHeader className="border-b border-border/60 bg-card/70 px-6 py-4 text-left">
          <DialogTitle className="font-display text-xl font-semibold">{title}</DialogTitle>
          {description && <DialogDescription className="mt-2">{description}</DialogDescription>}
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] px-6 pb-6">
          <div className={cn("pt-6 space-y-6", contentClassName)}>{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

interface GameStationCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient?: string;
  label?: string;
}

export const GameStationCard = React.forwardRef<HTMLButtonElement, GameStationCardProps>(
  ({ title, description, icon: Icon, gradient, label, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "glass-card w-full p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_hsl(var(--primary)/0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "h-12 w-12 rounded-2xl bg-gradient-to-br text-background shadow-sm flex items-center justify-center",
            gradient ?? "from-primary to-neon-cyan",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-lg font-semibold">{title}</p>
            {label && (
              <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                {label}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="uppercase tracking-wider">Tap to open</span>
        <span className="text-primary font-semibold">Enter</span>
      </div>
    </button>
  ),
);

GameStationCard.displayName = "GameStationCard";
