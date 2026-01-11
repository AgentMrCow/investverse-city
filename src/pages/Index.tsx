import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LobbyModeSelect } from "@/components/LobbyModeSelect";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      <main className="container mx-auto px-4 py-12 space-y-12">
        <LobbyModeSelect />
        <section className="py-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              The Learn-to-Earn Loop
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A step-by-step journey that turns financial knowledge into real confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Personalize & Learn",
                description: "Set your region, follow a skill tree, and unlock modules on investment and insurance.",
                gradient: "from-primary to-neon-cyan",
              },
              {
                step: "02",
                title: "Simulate & Protect",
                description: "Run market scenarios, diversify portfolios, and apply insurance to protect city assets.",
                gradient: "from-accent to-warning",
              },
              {
                step: "03",
                title: "Compete & Grow",
                description: "Join club wars, earn GT rewards, and reinvest through compounding vaults.",
                gradient: "from-neon-purple to-neon-pink",
              },
            ].map((feature, index) => (
              <div
                key={feature.step}
                className="glass-card p-8 relative group hover:scale-105 transition-transform duration-300"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-t-xl`} />
                <span className={`font-display text-6xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent opacity-20`}>
                  {feature.step}
                </span>
                <h3 className="font-display text-xl font-semibold mt-4 mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-neon-purple/10 to-accent/10" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Join the Prototype
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Help us validate a smarter way to learn investment and insurance. 
              Your feedback shapes the next build.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="neon" asChild>
                <Link to="/learn">Request Access</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/simulations">Explore Simulations</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
