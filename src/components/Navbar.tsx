import { Button, buttonVariants } from "./ui/button";
import { TokenWallet } from "./TokenWallet";
import { Menu, User, Settings, Trophy, Swords, BookOpen, Home, LineChart, Coins } from "lucide-react";
import { useState } from "react";
import { NavLink } from "./NavLink";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/lib/supabaseQueries";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BookOpen, label: "Learn", href: "/learn" },
  { icon: LineChart, label: "Simulations", href: "/simulations" },
  { icon: Swords, label: "Club War", href: "/club-war" },
  { icon: Coins, label: "Economy", href: "/economy" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-neon-cyan flex items-center justify-center neon-glow">
              <span className="font-display font-bold text-primary-foreground text-lg">IC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg text-gradient-primary">Investverse City</h1>
              <p className="text-xs text-muted-foreground">Learn • Invest • Earn</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={buttonVariants({ variant: "ghost" })}
                activeClassName="bg-muted text-foreground"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Wallet & User */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <TokenWallet
                tokens={profile?.gt_balance ?? 0}
                dailyEarned={profile?.daily_earned ?? 0}
                streak={profile?.streak_days ?? 0}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={cn(buttonVariants({ variant: "ghost" }), "w-full justify-start gap-3")}
                  activeClassName="bg-muted text-foreground"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <TokenWallet
                tokens={profile?.gt_balance ?? 0}
                dailyEarned={profile?.daily_earned ?? 0}
                streak={profile?.streak_days ?? 0}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
