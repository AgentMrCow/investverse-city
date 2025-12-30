import { Lock, CheckCircle2, Circle, Star } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  completed: boolean;
  category: "investment" | "insurance" | "web3" | "risk";
}

const skills: Skill[] = [
  { id: "1", name: "Portfolio Basics", description: "Learn diversification fundamentals", level: 3, maxLevel: 3, unlocked: true, completed: true, category: "investment" },
  { id: "2", name: "Stock Analysis", description: "Understand growth vs value stocks", level: 2, maxLevel: 5, unlocked: true, completed: false, category: "investment" },
  { id: "3", name: "Bond Mastery", description: "Master fixed income investments", level: 0, maxLevel: 4, unlocked: true, completed: false, category: "investment" },
  { id: "4", name: "Insurance 101", description: "Basics of risk protection", level: 2, maxLevel: 3, unlocked: true, completed: false, category: "insurance" },
  { id: "5", name: "Health Coverage", description: "Understanding health insurance", level: 0, maxLevel: 4, unlocked: false, completed: false, category: "insurance" },
  { id: "6", name: "Blockchain Basics", description: "Introduction to Web3", level: 1, maxLevel: 5, unlocked: true, completed: false, category: "web3" },
  { id: "7", name: "Smart Contracts", description: "Learn contract mechanics", level: 0, maxLevel: 5, unlocked: false, completed: false, category: "web3" },
  { id: "8", name: "Risk Assessment", description: "Evaluate investment risks", level: 1, maxLevel: 4, unlocked: true, completed: false, category: "risk" },
];

const categoryColors = {
  investment: "from-neon-cyan to-primary",
  insurance: "from-success to-emerald-400",
  web3: "from-neon-purple to-neon-pink",
  risk: "from-accent to-warning",
};

const categoryLabels = {
  investment: "Investment",
  insurance: "Insurance",
  web3: "Web3",
  risk: "Risk Management",
};

export function SkillTree() {
  const categories = ["investment", "insurance", "web3", "risk"] as const;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold">Learning Progress</h3>
          <p className="text-sm text-muted-foreground">Your financial literacy journey</p>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-accent" />
          <span className="font-display font-bold text-accent">Level 8</span>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category) => {
          const categorySkills = skills.filter(s => s.category === category);
          const completedSkills = categorySkills.filter(s => s.completed).length;
          const totalLevels = categorySkills.reduce((sum, s) => sum + s.level, 0);
          const maxLevels = categorySkills.reduce((sum, s) => sum + s.maxLevel, 0);

          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[category]}`} />
                  <span className="font-semibold text-sm">{categoryLabels[category]}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {totalLevels}/{maxLevels} levels
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`flex-shrink-0 w-36 p-3 rounded-lg border transition-all cursor-pointer ${
                      skill.completed 
                        ? 'bg-success/10 border-success/30' 
                        : skill.unlocked 
                          ? 'bg-muted/30 border-border hover:border-primary/50' 
                          : 'bg-muted/10 border-border/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      {skill.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : skill.unlocked ? (
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {skill.level}/{skill.maxLevel}
                      </span>
                    </div>
                    <p className="text-sm font-medium truncate">{skill.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{skill.description}</p>
                    
                    {/* Progress dots */}
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: skill.maxLevel }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < skill.level 
                              ? `bg-gradient-to-r ${categoryColors[category]}` 
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
