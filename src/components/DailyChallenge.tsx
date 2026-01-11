import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Timer, Coins, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchDailyChallengeQuestions } from "@/lib/supabaseQueries";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
  tokenReward: number;
}

export function DailyChallenge() {
  const { data: challengeRows = [], isLoading } = useQuery({
    queryKey: ["daily-challenge"],
    queryFn: fetchDailyChallengeQuestions,
  });

  const questions: Question[] = useMemo(() => {
    return challengeRows
      .map((row) => row.question)
      .filter(Boolean)
      .map((question) => ({
        id: question.id,
        question: question.question,
        options: Array.isArray(question.options) ? question.options : [],
        correctAnswer: question.correct_index,
        difficulty: question.difficulty,
        tokenReward: question.token_reward,
      }));
  }, [challengeRows]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [tokensEarned, setTokensEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question?.correctAnswer;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === question.correctAnswer) {
      setScore(score + 1);
      setTokensEarned(tokensEarned + question.tokenReward);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    }
  };

  useEffect(() => {
    if (showResult) return;
    if (timeLeft <= 0) {
      setShowResult(true);
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [showResult, timeLeft]);

  const getDifficultyColor = (difficulty: Question["difficulty"]) => {
    switch (difficulty) {
      case "easy": return "text-success bg-success/10";
      case "medium": return "text-warning bg-warning/10";
      case "hard": return "text-destructive bg-destructive/10";
      default: return "text-muted-foreground bg-muted/30";
    }
  };

  const progress = questions.length ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-full flex flex-col">
        <p className="text-sm text-muted-foreground">Loading daily challenge...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="glass-card p-6 h-full flex flex-col">
        <p className="text-sm text-muted-foreground">No daily questions available yet.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Daily Challenge
          </h3>
          <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-accent">
            <Coins className="w-4 h-4" />
            <span className="font-display font-bold">+{tokensEarned} GT</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive">
            <Timer className="w-4 h-4" />
            <span className="font-mono font-bold">{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-neon-cyan transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">+{question.tokenReward} GT</span>
        </div>

        <h4 className="text-xl font-semibold mb-6">{question.question}</h4>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            let buttonClass = "w-full justify-start text-left h-auto py-4 px-4";
            
            if (showResult) {
              if (index === question.correctAnswer) {
                buttonClass += " border-success bg-success/10 text-success";
              } else if (index === selectedAnswer && !isCorrect) {
                buttonClass += " border-destructive bg-destructive/10 text-destructive";
              }
            } else if (selectedAnswer === index) {
              buttonClass += " border-primary bg-primary/10";
            }

            return (
              <Button
                key={index}
                variant="glass"
                className={buttonClass}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
              >
                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && index === question.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                )}
                {showResult && index === selectedAnswer && !isCorrect && (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Result & Next */}
      {showResult && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">Correct! +{question.tokenReward} GT earned</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" />
                  <span className="font-semibold">
                    {selectedAnswer === null
                      ? `Time's up. The correct answer was ${String.fromCharCode(65 + question.correctAnswer)}.`
                      : `Wrong answer. The correct answer was ${String.fromCharCode(65 + question.correctAnswer)}.`}
                  </span>
                </>
              )}
            </div>
          </div>
          
          {currentQuestion < questions.length - 1 ? (
            <Button variant="neon" className="w-full" onClick={nextQuestion}>
              Next Question
            </Button>
          ) : (
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-gradient-gold mb-2">
                Challenge Complete!
              </p>
              <p className="text-muted-foreground">
                Score: {score}/{questions.length} • Earned: {tokensEarned} GT
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
