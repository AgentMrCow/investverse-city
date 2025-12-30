import { Button } from "./ui/button";
import { TokenWallet } from "./TokenWallet";
import { Menu, User, Settings, Trophy, Swords, BookOpen, Home } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: BookOpen, label: "Learn", href: "/learn" },
  { icon: Swords, label: "Club War", href: "/club-war" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-neon-cyan flex items-center justify-center neon-glow">
              <span className="font-display font-bold text-primary-foreground text-lg">FG</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg text-gradient-primary">FinGame</h1>
              <p className="text-xs text-muted-foreground">Learn • Invest • Earn</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Wallet & User */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <TokenWallet tokens={12450} dailyEarned={85} streak={7} />
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
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start gap-3"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <TokenWallet tokens={12450} dailyEarned={85} streak={7} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
