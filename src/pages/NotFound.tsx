import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="glass-card p-10 text-center max-w-xl mx-auto">
          <h1 className="font-display text-5xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-6">
            The page you requested does not exist. Head back to the dashboard to keep learning.
          </p>
          <Button variant="neon" asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
