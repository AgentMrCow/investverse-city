-- Demo identifiers
-- main profile: 11111111-1111-1111-1111-111111111111
-- club crypto kings: 22222222-2222-2222-2222-222222222222
-- club bull raiders: 33333333-3333-3333-3333-333333333333
-- portfolio: 44444444-4444-4444-4444-444444444444
-- contract challenge: 55555555-5555-5555-5555-555555555555

insert into regions (id, name, focus, theme, challenge, gradient, signals)
values
  ('hk', 'Hong Kong', 'Suitability checks, disclosure clarity, insurance coverage basics', 'Victoria Harbour skyline', 'Insurance contract loophole hunt', 'from-primary to-neon-cyan', array['Risk profiling','Policy summaries','Green finance']),
  ('sg', 'Singapore', 'Investor protection, product transparency, risk tolerance', 'Marina Bay city skin', 'Asset allocation vs. protection quiz', 'from-success to-emerald-400', array['Suitability rules','Disclosure check','ESG tilt']),
  ('eu', 'European Union', 'Risk disclosure, cost transparency, investor suitability', 'Continental capital hubs', 'PRIIP-style summary decoding', 'from-neon-purple to-neon-pink', array['Cost breakdowns','Risk labels','Sustainable funds']),
  ('us', 'United States', 'Risk profiling, product fit, insurance policy clarity', 'Downtown skyline', 'Coverage gap detection', 'from-accent to-warning', array['Risk tolerance','Disclosure rules','Long-term planning'])
on conflict (id) do update
set name = excluded.name,
    focus = excluded.focus,
    theme = excluded.theme,
    challenge = excluded.challenge,
    gradient = excluded.gradient,
    signals = excluded.signals;

insert into profiles (id, handle, display_name, avatar, region_id, level, gt_balance, daily_earned, streak_days, total_earned, quizzes_completed, global_rank)
values
  ('11111111-1111-1111-1111-111111111111', 'investverse_hero', 'You', 'Y', 'hk', 8, 12450, 85, 7, 12450, 147, 234)
on conflict (id) do update
set handle = excluded.handle,
    display_name = excluded.display_name,
    avatar = excluded.avatar,
    region_id = excluded.region_id,
    level = excluded.level,
    gt_balance = excluded.gt_balance,
    daily_earned = excluded.daily_earned,
    streak_days = excluded.streak_days,
    total_earned = excluded.total_earned,
    quizzes_completed = excluded.quizzes_completed,
    global_rank = excluded.global_rank;

insert into risk_profiles (id, profile_id, risk_score, risk_level, horizon, liquidity_need, loss_tolerance, experience, recommended_module)
values
  ('f9999999-9999-9999-9999-999999999999', '11111111-1111-1111-1111-111111111111', 11, 'Balanced', '3-7 years', 'Medium, some flexibility', 'Hold steady', 'Comfortable with strategies', 'Investment Foundations -> Diversification')
on conflict (profile_id) do update
set risk_score = excluded.risk_score,
    risk_level = excluded.risk_level,
    horizon = excluded.horizon,
    liquidity_need = excluded.liquidity_need,
    loss_tolerance = excluded.loss_tolerance,
    experience = excluded.experience,
    recommended_module = excluded.recommended_module;

insert into learning_tracks (id, title, focus, next_step, progress, icon, gradient)
values
  ('a1111111-1111-1111-1111-111111111111', 'Investment Foundations', 'Diversification, allocation, rebalancing', 'Sharpe ratio basics', 68, 'TrendingUp', 'from-neon-cyan to-primary'),
  ('a2222222-2222-2222-2222-222222222222', 'Insurance Essentials', 'Coverage types, exclusions, protection gaps', 'Deductibles & claims', 42, 'ShieldCheck', 'from-success to-emerald-400'),
  ('a3333333-3333-3333-3333-333333333333', 'Risk & Resilience', 'Risk tolerance, volatility, downside control', 'Hedging with options', 35, 'BarChart3', 'from-accent to-warning'),
  ('a4444444-4444-4444-4444-444444444444', 'ESG Strategy', 'ESG scoring, green dividends, impact', 'Green insurance incentives', 55, 'Leaf', 'from-success to-accent'),
  ('a5555555-5555-5555-5555-555555555555', 'Web3 Basics', 'Layer 2, tokens, governance', 'Smart contract rewards', 28, 'BookOpen', 'from-neon-purple to-neon-pink')
on conflict (id) do update
set title = excluded.title,
    focus = excluded.focus,
    next_step = excluded.next_step,
    progress = excluded.progress,
    icon = excluded.icon,
    gradient = excluded.gradient;

insert into practice_sessions (id, time_label, title, detail, reward)
values
  ('b1111111-1111-1111-1111-111111111111', '08:00', 'Daily Warm-up Q&A', 'Timed insurance + investment quizzes', '+10 GT'),
  ('b2222222-2222-2222-2222-222222222222', '12:30', 'Micro Simulation', '15-min portfolio rebalance drill', '+15 GT'),
  ('b3333333-3333-3333-3333-333333333333', '21:00', 'Club Practice', 'Team strategy + weapon planning', '+20 GT')
on conflict (id) do update
set time_label = excluded.time_label,
    title = excluded.title,
    detail = excluded.detail,
    reward = excluded.reward;

insert into skills (id, category, name, description, max_level)
values
  ('c1111111-1111-1111-1111-111111111111', 'investment', 'Portfolio Basics', 'Learn diversification fundamentals', 3),
  ('c2222222-2222-2222-2222-222222222222', 'investment', 'Stock Analysis', 'Understand growth vs value stocks', 5),
  ('c3333333-3333-3333-3333-333333333333', 'investment', 'Bond Mastery', 'Master fixed income investments', 4),
  ('c4444444-4444-4444-4444-444444444444', 'investment', 'Compounding Vaults', 'Model long-term growth', 3),
  ('c5555555-5555-5555-5555-555555555555', 'insurance', 'Insurance 101', 'Basics of risk protection', 3),
  ('c6666666-6666-6666-6666-666666666666', 'insurance', 'Claims & Deductibles', 'Understand claim scenarios', 4),
  ('c7777777-7777-7777-7777-777777777777', 'insurance', 'Disaster Coverage', 'Protection against shocks', 3),
  ('c8888888-8888-8888-8888-888888888888', 'web3', 'Blockchain Basics', 'Introduction to Web3', 5),
  ('c9999999-9999-9999-9999-999999999999', 'web3', 'Smart Contracts', 'Learn contract mechanics', 5),
  ('ca111111-1111-1111-1111-111111111111', 'web3', 'Token Economics', 'Non-transferable GT rules', 4),
  ('cbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'risk', 'Risk Assessment', 'Evaluate investment risks', 4),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'risk', 'Options Hedging', 'Learn put option shields', 3),
  ('cddddddd-dddd-dddd-dddd-dddddddddddd', 'esg', 'ESG Impact', 'Measure sustainability score', 4),
  ('ceeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'esg', 'Green Insurance', 'Eco-protection incentives', 3)
on conflict (id) do update
set category = excluded.category,
    name = excluded.name,
    description = excluded.description,
    max_level = excluded.max_level;

insert into player_skills (profile_id, skill_id, level, completed, unlocked)
values
  ('11111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 3, true, true),
  ('11111111-1111-1111-1111-111111111111', 'c2222222-2222-2222-2222-222222222222', 2, false, true),
  ('11111111-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333', 1, false, true),
  ('11111111-1111-1111-1111-111111111111', 'c4444444-4444-4444-4444-444444444444', 0, false, true),
  ('11111111-1111-1111-1111-111111111111', 'c5555555-5555-5555-5555-555555555555', 2, false, true),
  ('11111111-1111-1111-1111-111111111111', 'c6666666-6666-6666-6666-666666666666', 1, false, true),
  ('11111111-1111-1111-1111-111111111111', 'c7777777-7777-7777-7777-777777777777', 0, false, false),
  ('11111111-1111-1111-1111-111111111111', 'c8888888-8888-8888-8888-888888888888', 1, false, true),
  ('11111111-1111-1111-1111-111111111111', 'c9999999-9999-9999-9999-999999999999', 0, false, false),
  ('11111111-1111-1111-1111-111111111111', 'ca111111-1111-1111-1111-111111111111', 0, false, false),
  ('11111111-1111-1111-1111-111111111111', 'cbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1, false, true),
  ('11111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 0, false, false),
  ('11111111-1111-1111-1111-111111111111', 'cddddddd-dddd-dddd-dddd-dddddddddddd', 1, false, true),
  ('11111111-1111-1111-1111-111111111111', 'ceeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 0, false, false)
on conflict (profile_id, skill_id) do update
set level = excluded.level,
    completed = excluded.completed,
    unlocked = excluded.unlocked;

insert into questions (id, question, options, correct_index, difficulty, token_reward, category)
values
  ('d1111111-1111-1111-1111-111111111111', 'What is diversification in investment?', '["Putting all money in one stock","Spreading investments across different assets","Only investing in bonds","Buying gold exclusively"]'::jsonb, 1, 'easy', 10, 'investment'),
  ('d2222222-2222-2222-2222-222222222222', 'What does ESG stand for in investing?', '["Extra Stock Gains","Environmental, Social, Governance","Economic Strategy Guide","Equity Share Growth"]'::jsonb, 1, 'medium', 20, 'esg'),
  ('d3333333-3333-3333-3333-333333333333', 'What is the primary purpose of insurance?', '["To make money quickly","To protect against financial loss","To avoid taxes","To invest in stocks"]'::jsonb, 1, 'easy', 10, 'insurance'),
  ('d4444444-4444-4444-4444-444444444444', 'What does an insurance deductible represent?', '["The amount paid by the insurer before a claim","The amount you pay before coverage kicks in","The annual interest earned on premiums","The maximum claim payout"]'::jsonb, 1, 'medium', 20, 'insurance'),
  ('d5555555-5555-5555-5555-555555555555', 'Buying a put option in the game simulates what strategy?', '["Hedging against price drops","Doubling down on risky assets","Avoiding diversification","Guaranteeing profits"]'::jsonb, 0, 'hard', 30, 'risk')
on conflict (id) do update
set question = excluded.question,
    options = excluded.options,
    correct_index = excluded.correct_index,
    difficulty = excluded.difficulty,
    token_reward = excluded.token_reward,
    category = excluded.category;

insert into daily_challenge_questions (id, question_id, sequence, day)
values
  ('e1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 1, current_date),
  ('e2222222-2222-2222-2222-222222222222', 'd2222222-2222-2222-2222-222222222222', 2, current_date),
  ('e3333333-3333-3333-3333-333333333333', 'd3333333-3333-3333-3333-333333333333', 3, current_date),
  ('e4444444-4444-4444-4444-444444444444', 'd4444444-4444-4444-4444-444444444444', 4, current_date),
  ('e5555555-5555-5555-5555-555555555555', 'd5555555-5555-5555-5555-555555555555', 5, current_date)
on conflict (id) do update
set question_id = excluded.question_id,
    sequence = excluded.sequence,
    day = excluded.day;

insert into question_submissions (id, profile_id, title, status, reward, source, content)
values
  ('f1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Diversification vs. concentration', 'Approved', 30, 'Community', '{"question":"Which choice best describes diversification?","options":["All in one stock","Spread across asset classes","Only bonds","Only crypto"],"correct_index":1,"difficulty":"easy","category":"investment","rationale":"Diversification reduces risk by spreading exposure."}'::jsonb),
  ('f2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Insurance deductible basics', 'Approved', 10, 'Community', '{"question":"What does a deductible represent?","options":["Fee paid by insurer","Amount you pay before coverage","Annual premium","Maximum payout"],"correct_index":1,"difficulty":"medium","category":"insurance","rationale":"Deductible is the out-of-pocket amount before insurer pays."}'::jsonb),
  ('f3333333-3333-3333-3333-333333333333', null, 'Meme coin hype', 'Flagged', -10, 'Community', null)
on conflict (id) do update
set title = excluded.title,
    status = excluded.status,
    reward = excluded.reward,
    source = excluded.source,
    content = excluded.content;

insert into moderation_checks (id, label)
values
  ('a1111111-1111-1111-1111-111111111111', 'Investment/insurance relevance detection'),
  ('a2222222-2222-2222-2222-222222222222', 'Spam + foul language filters'),
  ('a3333333-3333-3333-3333-333333333333', 'Screenshot abuse warnings with penalties'),
  ('a4444444-4444-4444-4444-444444444444', 'Duplicate question detection')
on conflict (id) do update
set label = excluded.label;

insert into knowledge_gaps (id, title, summary, category, impact, confidence, evidence, recommended_action, recommended_module)
values
  ('e1111111-1111-1111-1111-111111111111', 'Risk tolerance vs. risk capacity', 'Learners equate higher income with higher risk capacity, ignoring time horizon and liquidity needs.', 'investment', 'High', 82, '["62% choose aggressive portfolios for 6-month goals","Simulation exits spike after volatility events"]'::jsonb, 'Gate advanced allocations behind a risk profile checkpoint.', 'Risk & Resilience -> Risk Assessment'),
  ('e2222222-2222-2222-2222-222222222222', 'Deductibles vs. coverage limits', 'Many users assume insurance pays the full loss and miss deductible math.', 'insurance', 'High', 77, '["Daily challenge: deductible question 41% correct","Claim simulator shows underinsured buildings"]'::jsonb, 'Walkthroughs for deductible math + coverage caps.', 'Insurance Essentials -> Claims & Deductibles'),
  ('e3333333-3333-3333-3333-333333333333', 'Crypto-heavy portfolios feel diversified', 'Players confuse number of tokens with diversification across asset classes.', 'investment', 'Medium', 69, '["Crypto allocation above 40% triggers crashes in sim lab","Low correlation score on 3-asset mixes"]'::jsonb, 'Introduce a diversification score and rebalance prompt.', 'Investment Foundations -> Diversification'),
  ('e4444444-4444-4444-4444-444444444444', 'ESG always lowers returns', 'A common belief is that ESG means sacrificing performance.', 'esg', 'Medium', 63, '["ESG quiz scores trail investment quiz scores by 18%","Users skip ESG fund cards in marketplace"]'::jsonb, 'Explain risk-adjusted outcomes and green dividend boosts.', 'ESG Strategy -> Impact Scoring')
on conflict (id) do update
set title = excluded.title,
    summary = excluded.summary,
    category = excluded.category,
    impact = excluded.impact,
    confidence = excluded.confidence,
    evidence = excluded.evidence,
    recommended_action = excluded.recommended_action,
    recommended_module = excluded.recommended_module;

insert into integrity_events (id, profile_id, event_type, severity, detail, action)
values
  ('e5555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'Screenshot detection', 'Warning', 'Screenshot detected during timed quiz.', 'First warning issued.'),
  ('e6666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'Idle timeout', 'Info', 'Player inactive during challenge.', 'Timer paused after 20s idle.'),
  ('e7777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Repeated hint usage', 'Penalty', 'Excessive hint usage on insurance quiz.', '-10 GT applied.')
on conflict (id) do update
set event_type = excluded.event_type,
    severity = excluded.severity,
    detail = excluded.detail,
    action = excluded.action;

insert into buildings (id, profile_id, type, name, level, value, growth_rate, insured)
values
  ('b1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'tech', 'AI Data Center', 3, 15000, 12.5, true),
  ('b2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'bank', 'Finance HQ', 2, 8500, 4.2, true),
  ('b3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'factory', 'Consumer Mall', 4, 22000, 8.1, false),
  ('b4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'infrastructure', 'Power Grid', 2, 5000, 2.8, true)
on conflict (id) do update
set name = excluded.name,
    level = excluded.level,
    value = excluded.value,
    growth_rate = excluded.growth_rate,
    insured = excluded.insured;

insert into portfolios (id, profile_id, name, virtual_funds)
values
  ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Core Portfolio', 25000)
on conflict (id) do update
set name = excluded.name,
    virtual_funds = excluded.virtual_funds;

insert into portfolio_allocations (id, portfolio_id, label, percent, change, gradient)
values
  ('c1111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'Global Equity', 35, '+4.2%', 'from-neon-cyan to-primary'),
  ('c2222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', 'Investment Grade Bonds', 25, '+1.1%', 'from-success to-emerald-400'),
  ('c3333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'ESG Funds', 20, '+2.8%', 'from-accent to-warning'),
  ('c4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'Crypto Basket', 12, '-3.4%', 'from-neon-purple to-neon-pink'),
  ('c5555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'Commodities', 8, '+0.6%', 'from-muted-foreground to-muted')
on conflict (id) do update
set label = excluded.label,
    percent = excluded.percent,
    change = excluded.change,
    gradient = excluded.gradient;

insert into simulation_scenarios (id, title, impact, lesson, priority)
values
  ('d1111111-1111-1111-1111-111111111111', 'Inflation Spike', 'Bonds -4%, equities +1%', 'Duration risk + rebalancing', 1),
  ('d2222222-2222-2222-2222-222222222222', 'Crypto Flash Crash', 'Crypto -15%, portfolio -2%', 'Concentration risk + hedging', 2),
  ('d3333333-3333-3333-3333-333333333333', 'Green Dividend Boost', 'ESG funds +3%', 'Sustainable investing trends', 3)
on conflict (id) do update
set impact = excluded.impact,
    lesson = excluded.lesson,
    priority = excluded.priority;

insert into simulation_timeline_events (id, date_label, title, impact, type)
values
  ('e1111111-1111-1111-1111-111111111111', 'Week 1', 'Rate hike announced', 'Bond prices drop, equities soften', 'macro'),
  ('e2222222-2222-2222-2222-222222222222', 'Week 2', 'ESG dividend boost', 'Green holdings +2.5%', 'esg'),
  ('e3333333-3333-3333-3333-333333333333', 'Week 3', 'Crypto shock', 'High volatility, portfolio -1.8%', 'risk')
on conflict (id) do update
set title = excluded.title,
    impact = excluded.impact,
    type = excluded.type;

insert into simulation_metrics (id, label, value, icon, tone)
values
  ('f1111111-1111-1111-1111-111111111111', 'Diversification', '72/100', 'BarChart3', 'text-success'),
  ('f2222222-2222-2222-2222-222222222222', 'Risk Guard', 'Insured', 'ShieldCheck', 'text-primary'),
  ('f3333333-3333-3333-3333-333333333333', 'ESG Score', '78', 'Leaf', 'text-accent')
on conflict (id) do update
set value = excluded.value,
    icon = excluded.icon,
    tone = excluded.tone;

insert into esg_scores (id, profile_id, score, volatility_shield, green_dividend)
values
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 78, 'Low', '+2.5%')
on conflict (id) do update
set score = excluded.score,
    volatility_shield = excluded.volatility_shield,
    green_dividend = excluded.green_dividend;

insert into insurance_coverages (id, profile_id, label, status, detail)
values
  ('b1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Property', 'Active', '80% loss cap'),
  ('b2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Health', 'Active', 'Critical illness cover'),
  ('b3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Disaster', 'Partial', 'Flood + typhoon')
on conflict (id) do update
set status = excluded.status,
    detail = excluded.detail;

insert into coverage_simulations (id, profile_id, asset_label, asset_value, deductible, coverage_limit, loss_amount, payout, out_of_pocket)
values
  ('f8888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 'AI Data Center', 15000, 500, 10000, 8000, 7500, 500),
  ('f7777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Consumer Mall', 22000, 1000, 12000, 18000, 12000, 6000)
on conflict (id) do update
set asset_label = excluded.asset_label,
    asset_value = excluded.asset_value,
    deductible = excluded.deductible,
    coverage_limit = excluded.coverage_limit,
    loss_amount = excluded.loss_amount,
    payout = excluded.payout,
    out_of_pocket = excluded.out_of_pocket;

insert into vault_options (id, term, apy, bonus, unlocks)
values
  ('c1111111-1111-1111-1111-111111111111', '30 days', '5-6%', '1.05x', 'Insurance basics'),
  ('c2222222-2222-2222-2222-222222222222', '90 days', '6-8%', '1.12x', '401(k) + IRA concepts'),
  ('c3333333-3333-3333-3333-333333333333', '180 days', '8-10%', '1.2x', 'Advanced rebalancing')
on conflict (id) do update
set term = excluded.term,
    apy = excluded.apy,
    bonus = excluded.bonus,
    unlocks = excluded.unlocks;

insert into token_rules (id, rule_type, label, detail)
values
  ('d1111111-1111-1111-1111-111111111111', 'earn', 'Daily login streaks', '1 GT'),
  ('d2222222-2222-2222-2222-222222222222', 'earn', 'Daily challenges', '10-50 GT'),
  ('d3333333-3333-3333-3333-333333333333', 'earn', 'Monthly competition', '300-2000 GT'),
  ('d4444444-4444-4444-4444-444444444444', 'earn', 'Club wars', 'Rewards tied to building value'),
  ('d5555555-5555-5555-5555-555555555555', 'earn', 'Question contributions', '10-50 GT'),
  ('d6666666-6666-6666-6666-666666666666', 'earn', 'Referrals', '100 GT (cap 5)'),
  ('d7777777-7777-7777-7777-777777777777', 'spend', 'Buildings + upgrades', '10-1000 GT items'),
  ('d8888888-8888-8888-8888-888888888888', 'spend', 'Insurance coverage', '2000 GT'),
  ('d9999999-9999-9999-9999-999999999999', 'spend', 'Skins + rare themes', '10,000 GT'),
  ('daaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'spend', 'Weapons + shields', '50-10,000 GT'),
  ('dbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'spend', 'Extra quiz attempts', '500 GT')
on conflict (id) do update
set rule_type = excluded.rule_type,
    label = excluded.label,
    detail = excluded.detail;

insert into clubs (id, name, description, primary_color)
values
  ('22222222-2222-2222-2222-222222222222', 'Crypto Kings', 'High-performance strategy guild', 'from-primary to-neon-cyan'),
  ('33333333-3333-3333-3333-333333333333', 'Bull Raiders', 'Aggressive growth challengers', 'from-neon-purple to-neon-pink')
on conflict (id) do update
set name = excluded.name,
    description = excluded.description,
    primary_color = excluded.primary_color;

insert into club_members (club_id, profile_id, role)
values
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Strategist')
on conflict (club_id, profile_id) do update
set role = excluded.role;

insert into club_wars (id, club_a_id, club_b_id, starts_at, ends_at, status, reward_pool, building_value, weapons_ready)
values
  ('e1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', now() + interval '2 hours', now() + interval '4 hours', 'upcoming', 12000, 45200, 12)
on conflict (id) do update
set starts_at = excluded.starts_at,
    ends_at = excluded.ends_at,
    status = excluded.status,
    reward_pool = excluded.reward_pool,
    building_value = excluded.building_value,
    weapons_ready = excluded.weapons_ready;

insert into club_war_loadouts (id, club_id, item, effect, cost)
values
  ('f1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Pulse Cannon', '+12% building damage', '1,500 GT'),
  ('f2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Defense Barrier', 'Reduce losses by 8%', '1,100 GT'),
  ('f3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Scout Drone', 'Reveal opponent allocation', '700 GT')
on conflict (id) do update
set effect = excluded.effect,
    cost = excluded.cost;

insert into governance_proposals (id, club_id, title, detail, status, vote_summary)
values
  ('a1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Reduce club war entry fee', 'Lower from 400 GT to 250 GT', 'Voting', '62% yes'),
  ('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Add green insurance bonus', '+5% reward for high ESG portfolios', 'Passed', 'Approved'),
  ('a3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Extend war window', 'Shift to 8PM - 11PM', 'Voting', '48% yes')
on conflict (id) do update
set detail = excluded.detail,
    status = excluded.status,
    vote_summary = excluded.vote_summary;

insert into store_items (id, name, detail, cost, category, rarity)
values
  ('b1111111-1111-1111-1111-111111111111', 'Neon City Skin', 'Rare theme for your skyline', '10,000 GT', 'cosmetic', 'rare'),
  ('b2222222-2222-2222-2222-222222222222', 'Insurance Booster', 'Instant coverage upgrade', '2,000 GT', 'utility', 'standard'),
  ('b3333333-3333-3333-3333-333333333333', 'Founder''s Emblem', 'Limited NFT badge', '4,500 GT', 'collectible', 'limited')
on conflict (id) do update
set detail = excluded.detail,
    cost = excluded.cost,
    category = excluded.category,
    rarity = excluded.rarity;

insert into reward_tiers (id, event, rank_label, reward)
values
  ('c1111111-1111-1111-1111-111111111111', 'monthly', '1st', '2,000 GT'),
  ('c2222222-2222-2222-2222-222222222222', 'monthly', '2nd', '1,500 GT'),
  ('c3333333-3333-3333-3333-333333333333', 'monthly', '3rd', '1,250 GT'),
  ('c4444444-4444-4444-4444-444444444444', 'monthly', '4th-10th', '1,000 GT'),
  ('c5555555-5555-5555-5555-555555555555', 'monthly', '11th-20th', '750 GT'),
  ('c6666666-6666-6666-6666-666666666666', 'monthly', '21st-50th', '500 GT'),
  ('c7777777-7777-7777-7777-777777777777', 'monthly', '51st-100th', '300 GT'),
  ('c8888888-8888-8888-8888-888888888888', 'daily', '1st', '50 GT'),
  ('c9999999-9999-9999-9999-999999999999', 'daily', '2nd', '30 GT'),
  ('caaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'daily', '3rd', '20 GT'),
  ('cbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'daily', '4th-10th', '10 GT')
on conflict (id) do update
set reward = excluded.reward;

insert into competition_events (id, cadence, title, detail)
values
  ('d1111111-1111-1111-1111-111111111111', 'Daily', 'Timed Q&A', '15-minute session every day'),
  ('d2222222-2222-2222-2222-222222222222', 'Weekly', 'Simulation Sprint', 'Portfolio performance challenge'),
  ('d3333333-3333-3333-3333-333333333333', 'Monthly', 'Global Leaderboard', 'Top 100 share GT rewards')
on conflict (id) do update
set detail = excluded.detail;

insert into partner_courses (id, name, detail, badge, icon)
values
  ('e1111111-1111-1111-1111-111111111111', 'Central Bank Learning Hub', 'Macro policy primers + inflation explainers', 'Certified', 'Landmark'),
  ('e2222222-2222-2222-2222-222222222222', 'Insurance Institute', 'Claims scenarios + contract walkthroughs', 'Verified', 'ShieldCheck'),
  ('e3333333-3333-3333-3333-333333333333', 'University Finance Lab', 'Portfolio labs + ESG research', 'Academic', 'School')
on conflict (id) do update
set detail = excluded.detail,
    badge = excluded.badge,
    icon = excluded.icon;

insert into contract_challenges (id, title, description, status, scenario)
values
  ('55555555-5555-5555-5555-555555555555', 'Contract Loophole Challenge', 'Analyze insurance clauses and flag coverage gaps for bonus GT.', 'Live', 'Typhoon warning issued')
on conflict (id) do update
set description = excluded.description,
    status = excluded.status,
    scenario = excluded.scenario;

insert into contract_clauses (id, challenge_id, title, detail, status)
values
  ('f1111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 'Coverage Scope', 'Property damage covered up to 80% replacement value.', 'Clear'),
  ('f2222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'Exclusions', 'Flood + cyber incidents excluded by default.', 'Gap'),
  ('f3333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555', 'Deductible', 'First 2% of losses paid by user.', 'Review')
on conflict (id) do update
set detail = excluded.detail,
    status = excluded.status;

insert into hedging_powerups (id, name, effect, unlock_level, cost)
values
  ('a1111111-1111-1111-1111-111111111111', 'Put Option Shield', 'Caps losses on crypto-heavy holdings', 12, '1,200 GT'),
  ('a2222222-2222-2222-2222-222222222222', 'Futures Lock', 'Fixes commodity prices for 7 days', 10, '900 GT'),
  ('a3333333-3333-3333-3333-333333333333', 'Insurance Overlay', 'Protects city assets during wars', 8, '2,000 GT')
on conflict (id) do update
set effect = excluded.effect,
    unlock_level = excluded.unlock_level,
    cost = excluded.cost;

insert into architecture_layers (id, title, description, icon, order_index)
values
  ('b1111111-1111-1111-1111-111111111111', 'Frontend', 'React UI + Tailwind. Learning, simulations, and city-building dashboards.', 'Network', 1),
  ('b2222222-2222-2222-2222-222222222222', 'Game Engine', 'Tracks progress, skill tree unlocks, and simulation outcomes.', 'Database', 2),
  ('b3333333-3333-3333-3333-333333333333', 'AI + Moderation', 'Generates scenarios, summarizes insurance terms, filters submissions.', 'Bot', 3),
  ('b4444444-4444-4444-4444-444444444444', 'Layer 2 Smart Contract', 'Non-transferable GT, rewards, NFTs, and club governance logic.', 'Layers', 4)
on conflict (id) do update
set description = excluded.description,
    icon = excluded.icon,
    order_index = excluded.order_index;

insert into leaderboard_entries (id, profile_id, rank, season, tokens, level, change, display_name, avatar)
values
  ('aa111111-1111-1111-1111-111111111111', null, 1, '2024-09', 125400, 42, 'same', 'CryptoMaster', '🏆'),
  ('aa222222-2222-2222-2222-222222222222', null, 2, '2024-09', 118200, 39, 'up', 'InvestQueen', '👑'),
  ('aa333333-3333-3333-3333-333333333333', null, 3, '2024-09', 112800, 38, 'down', 'BlockchainPro', '⚡'),
  ('aa444444-4444-4444-4444-444444444444', null, 4, '2024-09', 98500, 35, 'up', 'FinanceGuru', '📊'),
  ('aa555555-5555-5555-5555-555555555555', null, 5, '2024-09', 87200, 33, 'up', 'TokenTrader', '💎'),
  ('aa666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 234, '2024-09', 12450, 8, 'up', 'You', 'Y')
on conflict (id) do update
set rank = excluded.rank,
    tokens = excluded.tokens,
    level = excluded.level,
    change = excluded.change,
    display_name = excluded.display_name,
    avatar = excluded.avatar;
