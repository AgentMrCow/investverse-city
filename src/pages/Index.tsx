import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsOverview } from "@/components/StatsOverview";
import { CityVisualization } from "@/components/CityVisualization";
import { DailyChallenge } from "@/components/DailyChallenge";
import { SkillTree } from "@/components/SkillTree";
import { ClubWarPreview } from "@/components/ClubWarPreview";
import { Leaderboard } from "@/components/Leaderboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-12 space-y-8">
        {/* Stats Overview */}
        <section>
          <StatsOverview />
        </section>

        {/* Main Grid */}
        <section className="grid lg:grid-cols-2 gap-8">
          {/* City Visualization */}
          <CityVisualization />
          
          {/* Daily Challenge */}
          <DailyChallenge />
        </section>

        {/* Secondary Grid */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* Skill Tree - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SkillTree />
          </div>
          
          {/* Club War Preview */}
          <ClubWarPreview />
        </section>

        {/* Leaderboard */}
        <section>
          <Leaderboard />
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-gradient-primary">FinGame</span> Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Master financial literacy through an immersive gaming experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Learn & Quiz",
                description: "Complete interactive modules on investment, insurance, and Web3. Answer daily challenges to test your knowledge.",
                gradient: "from-primary to-neon-cyan",
              },
              {
                step: "02",
                title: "Build Your City",
                description: "Invest your earned tokens in virtual assets. Watch your portfolio grow as buildings in your city.",
                gradient: "from-accent to-warning",
              },
              {
                step: "03",
                title: "Compete & Earn",
                description: "Join clubs, participate in wars, climb the leaderboard. The more you learn, the more you earn.",
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

        {/* CTA Section */}
        <section className="glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-neon-purple/10 to-accent/10" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join thousands of players learning about finance while having fun. 
              Your financial future starts with a game.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary">
                Create Free Account
              </button>
              <button className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-neon-cyan flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground">FG</span>
              </div>
              <div>
                <p className="font-display font-bold">FinGame</p>
                <p className="text-xs text-muted-foreground">Enhancing Financial Knowledge</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 FinGame. Learn • Invest • Earn
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
