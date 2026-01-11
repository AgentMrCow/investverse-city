import { supabase } from "@/lib/supabaseClient";

export const DEMO_PROFILE_ID = "11111111-1111-1111-1111-111111111111";

const today = () => new Date().toISOString().slice(0, 10);

const handle = <T,>(data: T | null, error: { message: string } | null) => {
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export async function logIntegrityEvent(payload: {
  event_type: string;
  severity: "Warning" | "Penalty" | "Info";
  detail: string;
  action?: string | null;
  profile_id?: string;
}) {
  const { data, error } = await supabase
    .from("integrity_events")
    .insert({
      profile_id: payload.profile_id ?? DEMO_PROFILE_ID,
      event_type: payload.event_type,
      severity: payload.severity,
      detail: payload.detail,
      action: payload.action ?? null,
    })
    .select("*")
    .single();
  return handle(data, error);
}

export async function fetchProfile(profileId = DEMO_PROFILE_ID) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", profileId).single();
  return handle(data, error);
}

export async function fetchRiskProfile(profileId = DEMO_PROFILE_ID) {
  const { data, error } = await supabase
    .from("risk_profiles")
    .select("*")
    .eq("profile_id", profileId)
    .maybeSingle();
  return handle(data, error);
}

export async function submitRiskProfile(
  payload: {
    risk_score: number;
    risk_level: string;
    horizon: string;
    liquidity_need: string;
    loss_tolerance: string;
    experience: string;
    recommended_module: string;
  },
  profileId = DEMO_PROFILE_ID,
) {
  const { data, error } = await supabase
    .from("risk_profiles")
    .upsert(
      {
        profile_id: profileId,
        ...payload,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "profile_id" },
    )
    .select("*")
    .single();
  return handle(data, error);
}

export async function fetchRegions() {
  const { data, error } = await supabase.from("regions").select("*").order("name");
  return handle(data, error) ?? [];
}

export async function fetchLearningTracks() {
  const { data, error } = await supabase.from("learning_tracks").select("*").order("title");
  return handle(data, error) ?? [];
}

export async function fetchPracticeSessions() {
  const { data, error } = await supabase.from("practice_sessions").select("*").order("time_label");
  return handle(data, error) ?? [];
}

export async function fetchSkillsWithProgress(profileId = DEMO_PROFILE_ID) {
  const { data: skills, error: skillsError } = await supabase
    .from("skills")
    .select("id, category, name, description, max_level")
    .order("category");

  if (skillsError) {
    throw new Error(skillsError.message);
  }

  const { data: progress, error: progressError } = await supabase
    .from("player_skills")
    .select("skill_id, level, completed, unlocked")
    .eq("profile_id", profileId);

  if (progressError) {
    throw new Error(progressError.message);
  }

  const progressMap = new Map(
    (progress ?? []).map((item) => [item.skill_id, item]),
  );

  return (skills ?? []).map((skill) => {
    const skillProgress = progressMap.get(skill.id);
    return {
      id: skill.id,
      name: skill.name,
      description: skill.description,
      level: skillProgress?.level ?? 0,
      maxLevel: skill.max_level,
      unlocked: skillProgress?.unlocked ?? false,
      completed: skillProgress?.completed ?? false,
      category: skill.category,
    };
  });
}

export async function fetchDailyChallengeQuestions() {
  const { data, error } = await supabase
    .from("daily_challenge_questions")
    .select("sequence, questions ( id, question, options, correct_index, difficulty, token_reward )")
    .eq("day", today())
    .order("sequence");

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    const { data: latestDay, error: latestError } = await supabase
      .from("daily_challenge_questions")
      .select("day")
      .order("day", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestError) {
      throw new Error(latestError.message);
    }

    if (!latestDay?.day) {
      return [];
    }

    const { data: fallbackData, error: fallbackError } = await supabase
      .from("daily_challenge_questions")
      .select("sequence, questions ( id, question, options, correct_index, difficulty, token_reward )")
      .eq("day", latestDay.day)
      .order("sequence");

    if (fallbackError) {
      throw new Error(fallbackError.message);
    }

    return (fallbackData ?? []).map((entry) => ({
      sequence: entry.sequence,
      question: entry.questions,
    }));
  }

  return (data ?? []).map((entry) => ({
    sequence: entry.sequence,
    question: entry.questions,
  }));
}

export async function fetchQuestionSubmissions() {
  const { data, error } = await supabase
    .from("question_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  return handle(data, error) ?? [];
}

export async function submitQuestionSubmission(
  title: string,
  options: {
    profileId?: string;
    status?: string;
    reward?: number;
    source?: string;
    content?: unknown;
  } = {},
) {
  const {
    profileId = DEMO_PROFILE_ID,
    status = "Pending review",
    reward = 0,
    source = "Community",
    content = null,
  } = options;
  const { data, error } = await supabase
    .from("question_submissions")
    .insert({
      profile_id: profileId,
      title,
      status,
      reward,
      source,
      content,
    })
    .select("*")
    .single();
  return handle(data, error);
}

export async function updateQuestionSubmission(
  id: string,
  updates: {
    status?: string;
    reward?: number;
    source?: string;
    content?: unknown;
  },
) {
  const { data, error } = await supabase
    .from("question_submissions")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();
  return handle(data, error);
}

export async function fetchModerationChecks() {
  const { data, error } = await supabase.from("moderation_checks").select("*");
  return handle(data, error) ?? [];
}

export async function fetchKnowledgeGaps() {
  const { data, error } = await supabase
    .from("knowledge_gaps")
    .select("*")
    .order("confidence", { ascending: false });
  return handle(data, error) ?? [];
}

export async function fetchIntegrityEvents(profileId = DEMO_PROFILE_ID) {
  const { data, error } = await supabase
    .from("integrity_events")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });
  return handle(data, error) ?? [];
}

export async function fetchBuildings(profileId = DEMO_PROFILE_ID) {
  const { data, error } = await supabase
    .from("buildings")
    .select("*")
    .eq("profile_id", profileId)
    .order("value", { ascending: false });
  return handle(data, error) ?? [];
}

export async function fetchPortfolio(profileId = DEMO_PROFILE_ID) {
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("profile_id", profileId)
    .maybeSingle();
  return handle(data, error);
}

export async function fetchPortfolioAllocations(portfolioId: string) {
  const { data, error } = await supabase
    .from("portfolio_allocations")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("percent", { ascending: false });
  return handle(data, error) ?? [];
}

export async function fetchSimulationScenarios() {
  const { data, error } = await supabase.from("simulation_scenarios").select("*").order("priority");
  return handle(data, error) ?? [];
}

export async function createQuestion(payload: {
  question: string;
  options: string[];
  correct_index: number;
  difficulty?: string;
  token_reward?: number;
  category?: string;
}) {
  const { data, error } = await supabase
    .from("questions")
    .insert({
      question: payload.question,
      options: payload.options,
      correct_index: payload.correct_index,
      difficulty: payload.difficulty,
      token_reward: payload.token_reward ?? 0,
      category: payload.category,
      is_active: true,
    })
    .select("*")
    .single();
  return handle(data, error);
}

export async function createSimulationScenario(payload: {
  title: string;
  impact: string;
  lesson: string;
  priority?: number;
}) {
  const { data, error } = await supabase
    .from("simulation_scenarios")
    .insert({
      title: payload.title,
      impact: payload.impact,
      lesson: payload.lesson,
      priority: payload.priority ?? 4,
    })
    .select("*")
    .single();
  return handle(data, error);
}

export async function fetchSimulationTimelineEvents() {
  const { data, error } = await supabase.from("simulation_timeline_events").select("*");
  return handle(data, error) ?? [];
}

export async function fetchSimulationMetrics() {
  const { data, error } = await supabase.from("simulation_metrics").select("*");
  return handle(data, error) ?? [];
}

export async function fetchEsgScore(profileId = DEMO_PROFILE_ID) {
  const { data, error } = await supabase
    .from("esg_scores")
    .select("*")
    .eq("profile_id", profileId)
    .maybeSingle();
  return handle(data, error);
}

export async function fetchInsuranceCoverages(profileId = DEMO_PROFILE_ID) {
  const { data, error } = await supabase
    .from("insurance_coverages")
    .select("*")
    .eq("profile_id", profileId);
  return handle(data, error) ?? [];
}

export async function fetchCoverageSimulations(profileId = DEMO_PROFILE_ID) {
  const { data, error } = await supabase
    .from("coverage_simulations")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false })
    .limit(5);
  return handle(data, error) ?? [];
}

export async function submitCoverageSimulation(
  payload: {
    asset_label: string;
    asset_value: number;
    deductible: number;
    coverage_limit: number;
    loss_amount: number;
    payout: number;
    out_of_pocket: number;
  },
  profileId = DEMO_PROFILE_ID,
) {
  const { data, error } = await supabase
    .from("coverage_simulations")
    .insert({
      profile_id: profileId,
      ...payload,
    })
    .select("*")
    .single();
  return handle(data, error);
}

export async function fetchVaultOptions() {
  const { data, error } = await supabase.from("vault_options").select("*");
  return handle(data, error) ?? [];
}

export async function fetchTokenRules() {
  const { data, error } = await supabase.from("token_rules").select("*");
  return handle(data, error) ?? [];
}

export async function fetchClubs() {
  const { data, error } = await supabase.from("clubs").select("*");
  return handle(data, error) ?? [];
}

export async function fetchClubWar() {
  const { data, error } = await supabase
    .from("club_wars")
    .select("*")
    .order("starts_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return handle(data, error);
}

export async function fetchClubMemberCount(clubId: string) {
  const { count, error } = await supabase
    .from("club_members")
    .select("profile_id", { count: "exact", head: true })
    .eq("club_id", clubId);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

export async function fetchClubLoadout(clubId: string) {
  const { data, error } = await supabase
    .from("club_war_loadouts")
    .select("*")
    .eq("club_id", clubId);
  return handle(data, error) ?? [];
}

export async function fetchGovernanceProposals(clubId: string) {
  const { data, error } = await supabase
    .from("governance_proposals")
    .select("*")
    .eq("club_id", clubId);
  return handle(data, error) ?? [];
}

export async function fetchStoreItems() {
  const { data, error } = await supabase.from("store_items").select("*");
  return handle(data, error) ?? [];
}

export async function fetchRewardTiers() {
  const { data, error } = await supabase.from("reward_tiers").select("*");
  return handle(data, error) ?? [];
}

export async function fetchCompetitionEvents() {
  const { data, error } = await supabase.from("competition_events").select("*");
  return handle(data, error) ?? [];
}

export async function fetchPartnerCourses() {
  const { data, error } = await supabase.from("partner_courses").select("*");
  return handle(data, error) ?? [];
}

export async function fetchContractChallenge() {
  const { data, error } = await supabase.from("contract_challenges").select("*").maybeSingle();
  return handle(data, error);
}

export async function fetchContractClauses(challengeId: string) {
  const { data, error } = await supabase
    .from("contract_clauses")
    .select("*")
    .eq("challenge_id", challengeId);
  return handle(data, error) ?? [];
}

export async function fetchHedgingPowerups() {
  const { data, error } = await supabase.from("hedging_powerups").select("*");
  return handle(data, error) ?? [];
}

export async function fetchArchitectureLayers() {
  const { data, error } = await supabase.from("architecture_layers").select("*").order("order_index");
  return handle(data, error) ?? [];
}

export async function fetchLeaderboardEntries() {
  const { data, error } = await supabase.from("leaderboard_entries").select("*").order("rank");
  return handle(data, error) ?? [];
}
