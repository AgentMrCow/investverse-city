export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-neon-cyan flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground">IC</span>
            </div>
            <div>
              <p className="font-display font-bold">Investverse City</p>
              <p className="text-xs text-muted-foreground">Enhancing Financial Knowledge</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Investverse City. Learn • Invest • Protect
          </p>
        </div>
      </div>
    </footer>
  );
}
