import { BadgeCheck, Landmark, School, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchPartnerCourses } from "@/lib/supabaseQueries";

const iconMap = {
  Landmark,
  ShieldCheck,
  School,
};

export function PartnerCoursesPanel() {
  const { data: partners = [], isLoading } = useQuery({
    queryKey: ["partner-courses"],
    queryFn: fetchPartnerCourses,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading partner courses...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold">Partner Courses</h3>
          <p className="text-sm text-muted-foreground">
            Curated modules and certificates from trusted institutions.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BadgeCheck className="w-4 h-4" />
          Verified content
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {partners.map((partner) => {
          const Icon = iconMap[partner.icon as keyof typeof iconMap] ?? School;
          return (
          <div key={partner.id ?? partner.name} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-background/60 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{partner.name}</p>
                <p className="text-xs text-muted-foreground">{partner.detail}</p>
              </div>
            </div>
            <span className="mt-3 inline-flex items-center text-xs font-semibold text-success">
              {partner.badge}
            </span>
          </div>
        );
        })}
      </div>
    </div>
  );
}
