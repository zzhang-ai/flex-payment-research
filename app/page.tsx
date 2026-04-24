import Comments from "./comments";

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  const colors: Record<string, string> = {
    cherry: "bg-cherry-light text-cherry-dark",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
    slate: "bg-slate-100 text-slate-700",
  };
  return (
    <span
      className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${colors[color] ?? colors.slate}`}
    >
      {children}
    </span>
  );
}

function Finding({
  number,
  title,
  color,
  priority,
  quant,
  qual,
  takeaway,
}: {
  number: number;
  title: string;
  color: string;
  priority: string;
  quant: React.ReactNode;
  qual: React.ReactNode;
  takeaway: React.ReactNode;
}) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white text-base font-bold flex items-center justify-center">
            {number}
          </span>
          <h3 className="text-xl font-bold text-slate-900 leading-snug mt-1">{title}</h3>
        </div>
        <Badge color={color}>{priority}</Badge>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        <div className="p-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Quantitative Signal
          </p>
          <div className="text-base text-slate-700 leading-relaxed">{quant}</div>
        </div>
        <div className="p-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Qualitative Signal
          </p>
          <div className="text-base text-slate-700 leading-relaxed">{qual}</div>
        </div>
      </div>

      <div className="bg-slate-50 px-6 py-5 border-t border-slate-100">
        <p className="text-xs font-bold text-cherry uppercase tracking-widest mb-1.5">
          Takeaway
        </p>
        <p className="text-base text-slate-800 font-medium leading-relaxed">
          {takeaway}
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-16">
        <p className="text-sm font-bold text-cherry uppercase tracking-widest mb-3">
          Research Report
        </p>
        <h1 className="text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
          Flexible Payments:<br />Quant + Qual Triangulation
        </h1>
        <p className="text-xl text-slate-500 mt-4 leading-relaxed max-w-3xl">
          Combining behavioral data from <strong className="text-slate-700">371K payment configurations</strong> with
          qualitative interviews from <strong className="text-slate-700">4 Cherry borrowers</strong> to identify
          high-impact opportunities.
        </p>
        <p className="text-sm text-slate-400 mt-3">March 2025</p>
      </header>

      {/* Methods & Data Sources */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Methods & Data Sources
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Quantitative</p>
            <p className="text-base text-slate-700 leading-relaxed">
              <strong>371K</strong> flex payment configs from cpAnalytics (1.09M active loans), cross-tabulated by schedule type, autopay status, loan status, and flex amount vs. installment.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Qualitative</p>
            <p className="text-base text-slate-700 leading-relaxed">
              <strong>4</strong> moderated user interviews (15–20 min each) with think-aloud walkthroughs on prototype — tasks included making a payment, changing due date, and setting up recurring payments.
            </p>
          </div>
        </div>
      </section>

      {/* Current Experience */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Current Experience
        </h2>
        <p className="text-base text-slate-500 mb-5">
          To set up a recurring payment, users must tap {`"`}Make a Payment,{`"`} then discover the recurring option buried inside the payment flow. This is the primary UX issue identified in both quant and qual data.
        </p>
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-4">
          <img
            src="/current-experience.png"
            alt="Current payment flow: Payment Plan Details → Make a Payment → Recurring Payment option hidden inside payment flow"
            className="w-full rounded-lg"
          />
        </div>
      </section>

      {/* High-Level Findings */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          What We Found
        </h2>
        <div className="space-y-4">
          {[
            { num: 1, color: "bg-red-600", title: "Recurring payments feel like a threat to autopay", text: "Users avoid scheduling recurring payments because they think it will double-charge them. 29% of monthly recurring configs are from users who already have autopay on — they're using it as autopay, not alongside it.", quote: "\u201cI didn\u2019t really know how to navigate that or fix that.\u201d — Grace" },
            { num: 2, color: "bg-red-600", title: "Nobody can find recurring setup", text: "0 out of 4 users found the recurring payment option without help. It's buried inside \"Make a Payment\" — a label everyone associates with one-time actions. Only 13.3% of all configs are recurring.", quote: "\u201cIf I can\u2019t figure it out in a couple minutes, whatever, just leave it.\u201d — Grace" },
            { num: 3, color: "bg-blue-600", title: "Payday alignment matters more than frequency", text: "Every user wanted to pay on their payday. None had used the change-due-date feature — it's buried below the fold. Monthly users who align timing have a 9.4% late rate vs. 23.8% for one-time.", quote: "\u201cI get paid on the 5th so that\u2019s what works for me.\u201d — Sarah" },
            { num: 4, color: "bg-amber-600", title: "Recurring is too hard when you need it most", text: "Users who lose autopay need a structured payment path — but recurring setup asks them to pick frequency and amount manually. They don't know how much they owe or what schedule works, so they default to one-time payments. Cure rate: 68.7% vs. 79.1% for monthly recurring.", quote: "\u201cWhen I have stuff on auto pay, I don\u2019t need to check.\u201d — J Morales" },
            { num: 5, color: "bg-purple-600", title: "Underpayment predicts delinquency before it happens", text: "89–100% of late and delinquent users pay less than their installment — regardless of schedule type. This is the most consistent early warning signal in the data.", quote: "\u201cIf I need that extra money that I paid, I know you guys are not gonna give it back.\u201d — J Morales" },
          ].map((f) => (
            <div key={f.num} className="border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
              <span className={`flex-shrink-0 w-9 h-9 rounded-full ${f.color} text-white text-sm font-bold flex items-center justify-center mt-0.5`}>
                {f.num}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-slate-900 leading-snug">{f.title}</p>
                <p className="text-base text-slate-600 leading-relaxed mt-1">{f.text}</p>
                <p className="text-sm text-slate-400 italic mt-2">{f.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Findings */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Detailed Findings
        </h2>
        <div className="space-y-6">
          <Finding
            number={1}
            title="Recurring payments feel like a threat to autopay"
            color="red"
            priority="P1 — UX Critical"
            quant={
              <p>
                29% of monthly flex payment users appear to use it as their
                autopay. Among AP On + Current recurring users, a significant
                portion pay exactly or more than the installment — treating
                scheduled payments as their primary method, not a supplement.
              </p>
            }
            qual={
              <p>
                Grace set up a recurring payment thinking it would{" "}
                <em>replace</em> her autopay. She saw two payment tracks,{" "}
                <strong>panicked about being double-charged ($400)</strong>, and
                deleted the schedule entirely — reverting to a less optimal
                setup. {`"`}I didn{`'`}t really know how to navigate that or fix that.{`"`}
              </p>
            }
            takeaway="The current model asks users to understand the distinction between autopay and scheduled payments — but users don't see a distinction. They have one mental model: 'when and how much do I pay each month.' The system needs to match that model rather than exposing its internal complexity."
          />

          <Finding
            number={2}
            title="Nobody can find recurring setup"
            color="red"
            priority="P1 — High Impact"
            quant={
              <p>
                Only <strong>13.3% of all configs are recurring</strong>{" "}
                (49K of 371K). Meanwhile, recurring users have dramatically
                better outcomes across every metric — lower delinquency, higher
                payment adequacy, and faster cure rates.
              </p>
            }
            qual={
              <p>
                <strong>All 4 participants failed</strong> to find recurring
                payment setup without guidance. Grace: {`"`}if I can{`'`}t figure it
                out in a couple minutes, whatever, just leave it.{`"`} Users don
                {`'`}t expect a scheduling feature inside {`"`}Make a Payment.{`"`}
              </p>
            }
            takeaway="Recurring payment users have dramatically better outcomes, but the current flow hides this option behind 'Make a Payment' — a label users associate with one-time actions. The question isn't where to put a new button, but whether the payment model itself should default to recurring rather than treating it as an opt-in feature."
          />

          <Finding
            number={3}
            title="Payday alignment matters more than frequency"
            color="blue"
            priority="P1 — Low Effort"
            quant={
              <p>
                Twice/Month has 18.7% and Bi-Weekly 16.8% late/delinquent
                rates — better than one-time (23.8%) but worse than monthly
                (9.4%). <strong>Frequency alone doesn{`'`}t solve it</strong> —
                timing alignment is what matters.
              </p>
            }
            qual={
              <p>
                Sarah wanted the 5th, Grace the 1st or 16th, Pao the 5th — all{" "}
                <strong>payday-aligned</strong>. None had used the change due date feature.
                Grace tried but got confused and gave up. Pao couldn{`'`}t find it
                at all — it{`'`}s buried below the fold under quick actions.
              </p>
            }
            takeaway="Users think about payment timing in terms of 'when does money leave my account' — not contractual due dates. The fact that payment date and due date are separate concepts is a system distinction, not a user one. A unified model where changing when you pay also changes when you're due would eliminate this entire category of confusion."
          />

          <Finding
            number={4}
            title="Recurring is too hard when you need it most"
            color="amber"
            priority="P2 — Recovery"
            quant={
              <div>
                <p className="mb-3">
                  Users who lose autopay and fall back to one-time payments have the{" "}
                  <strong>lowest 90-day cure rate at 68.7%</strong> — over 10 points behind monthly (79.1%).
                  Meanwhile, 94% of delinquent AP Off users pay less than the installment.
                  The issue isn{`'`}t that one-time payments cause delinquency — it{`'`}s that delinquent users
                  default to them as a catch-up strategy, and this strategy recovers the slowest.
                </p>
                <div className="border border-slate-200 rounded-lg overflow-hidden mt-2">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-2.5 py-1.5 text-left font-semibold text-slate-500">Schedule</th>
                        <th className="px-2.5 py-1.5 text-right font-semibold text-slate-500">Loans</th>
                        <th className="px-2.5 py-1.5 text-right font-semibold text-slate-500">Cure @30d</th>
                        <th className="px-2.5 py-1.5 text-right font-semibold text-slate-500">Cure @60d</th>
                        <th className="px-2.5 py-1.5 text-right font-semibold text-slate-500">Cure @90d</th>
                        <th className="px-2.5 py-1.5 text-right font-semibold text-slate-500">CO @90d</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { s: "Monthly", loans: "1,968", c30: "68.7%", c60: "75.4%", c90: "79.1%", co: "0.3%", best: true },
                        { s: "Bi-Weekly", loans: "563", c30: "63.4%", c60: "74.7%", c90: "77.5%", co: "0.2%", best: false },
                        { s: "Twice/Month", loans: "516", c30: "53.7%", c60: "67.3%", c90: "74.8%", co: "0.4%", best: false },
                        { s: "Weekly", loans: "250", c30: "55.6%", c60: "67.2%", c90: "69.2%", co: "0.4%", best: false },
                        { s: "One-Time", loans: "24,041", c30: "60.5%", c60: "65.6%", c90: "68.7%", co: "0.2%", worst: true },
                      ].map((r) => (
                        <tr key={r.s} className={r.best ? "bg-emerald-50/50" : r.worst ? "bg-red-50/40" : ""}>
                          <td className={`px-2.5 py-1.5 ${r.best ? "font-medium text-emerald-700" : r.worst ? "font-medium text-red-700" : "text-slate-700"}`}>{r.s}</td>
                          <td className="px-2.5 py-1.5 text-right tabular-nums text-slate-600">{r.loans}</td>
                          <td className={`px-2.5 py-1.5 text-right tabular-nums font-medium ${r.best ? "text-emerald-600" : r.worst ? "text-red-600" : "text-slate-700"}`}>{r.c30}</td>
                          <td className={`px-2.5 py-1.5 text-right tabular-nums font-medium ${r.best ? "text-emerald-600" : r.worst ? "text-red-600" : "text-slate-700"}`}>{r.c60}</td>
                          <td className={`px-2.5 py-1.5 text-right tabular-nums font-medium ${r.best ? "text-emerald-600" : r.worst ? "text-red-600" : "text-slate-700"}`}>{r.c90}</td>
                          <td className="px-2.5 py-1.5 text-right tabular-nums text-slate-500">{r.co}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            }
            qual={
              <p>
                Grace accidentally turned off autopay when updating her debit
                card. J Morales: {`"`}when I have stuff on auto pay, I don{`'`}t need
                to check.{`"`} Users fall into AP Off status{" "}
                <strong>accidentally</strong> (lost card, payment method change),
                then attempt to catch up with ad-hoc one-time payments.
                Nudging these users toward re-enabling autopay or setting up a recurring
                schedule could significantly improve cure rates — monthly{`'`}s 79.1% vs.
                one-time{`'`}s 68.7% at 90 days.
              </p>
            }
            takeaway="One-time payments aren't the cause of delinquency — they're the symptom of a broken recovery path. Users who lose autopay (often accidentally) have no structured way back. The 10+ point gap in cure rates between monthly and one-time suggests the system should actively guide struggling users into a recurring cadence rather than leaving them to manage ad-hoc payments alone."
          />

          <Finding
            number={5}
            title="Underpayment predicts delinquency before it happens"
            color="purple"
            priority="P2 — Early Warning"
            quant={
              <p>
                Across ALL schedule types and autopay statuses,{" "}
                <strong>89-100% of late/delinquent users pay less than
                the installment</strong>. This pattern is strikingly consistent:
                One-Time Late 93%, Monthly Late 90%, Weekly Delinquent 100%.
              </p>
            }
            qual={
              <p>
                J Morales: {`"`}if I need that extra money that I paid, I know you
                guys are not gonna give it back{`"`} — suggesting some users are
                cash-flow constrained and making strategic partial payments.
              </p>
            }
            takeaway="Underpayment is a consistent leading indicator of delinquency across all schedule types. This pattern suggests an opportunity for earlier intervention — the system can detect risk before a user goes late, rather than reacting after the fact."
          />
        </div>
      </section>

      {/* Design Questions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Design Questions to Explore
        </h2>
        <p className="text-base text-slate-500 mb-6">
          These findings point to a systemic issue rather than isolated UX fixes. The core tension: the system exposes internal complexity (autopay vs. scheduled payments, due date vs. payment date) that users don{`'`}t recognize as separate concepts.
        </p>
        <div className="space-y-4">
          {[
            {
              question: "Should autopay, recurring payments, and payment scheduling be one unified concept?",
              context: "Users already treat them as the same thing. 29% of monthly flex users use recurring as autopay. Grace panicked when she saw two payment tracks. The data suggests the distinction creates more harm than clarity.",
              findings: "Findings 1, 2",
              icon: "🔗",
            },
            {
              question: "Should changing when you pay also change when you're due?",
              context: "Every interviewed user wanted to align payment with payday, but none understood the difference between 'autopay date' and 'due date.' A unified date model would match how users think about money — but has contractual and servicing implications.",
              findings: "Findings 1, 3",
              icon: "📅",
            },
            {
              question: "How should the system support users who fall off autopay?",
              context: "Users lose autopay accidentally (lost card, payment method change) and default to ad-hoc one-time payments — the least effective recovery path. Monthly recurring users cure at 79.1% vs. 68.7% for one-time. The system currently has no structured re-engagement path.",
              findings: "Findings 4, 5",
              icon: "🔄",
            },
            {
              question: "Should the default payment model be recurring rather than one-time?",
              context: "86.7% of configs are one-time, but recurring users have better outcomes across every metric. Is one-time the right default, or should the system guide users toward recurring from the start — with one-time as the exception?",
              findings: "Findings 2, 4",
              icon: "⚡",
            },
          ].map((q, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-6 bg-white hover:border-slate-300 transition-colors">
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{q.icon}</span>
                <div>
                  <p className="text-lg font-bold text-slate-900 mb-2 leading-snug">{q.question}</p>
                  <p className="text-base text-slate-600 leading-relaxed">{q.context}</p>
                  <p className="text-sm text-slate-400 mt-3 font-medium">Related: {q.findings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Proposal */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Design Proposal
        </h2>
        <p className="text-base text-slate-500 mb-6">
          Two flows that address the core issues: a unified AutoPay Settings screen for non-delinquent users, and a structured catch-up payment path for delinquent users.
        </p>
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 p-4">
          <img
            src="/design-proposal.png"
            alt="Design proposal: Non-delinquent flow shows Payment Plan with Pay Early and Change AutoPay Settings leading to a unified AutoPay Settings screen with frequency options and payment details. Delinquent flow shows Payment Past Due banner with Pay Now and Schedule Catch-Up Payments leading to structured catch-up options."
            className="w-full rounded-lg"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Non-Delinquent</p>
            <p className="text-base text-slate-700 leading-relaxed">
              Replaces the hidden recurring setup with a clear <strong>AutoPay Settings</strong> screen. Users pick frequency (monthly, twice/month, bi-weekly, weekly), set payment date, and manage method — all in one place. No more confusion between autopay and scheduled payments.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Delinquent</p>
            <p className="text-base text-slate-700 leading-relaxed">
              Surfaces a <strong>Payment Past Due</strong> banner and adds a dedicated <strong>Schedule Catch-Up Payments</strong> flow. Instead of defaulting to ad-hoc one-time payments, users choose structured options — one future payment, split into 2 or 4, or custom.
            </p>
          </div>
        </div>
      </section>

      {/* Appendix — Data Tables */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Appendix: Data Tables</h2>
        <p className="text-base text-slate-500 mb-8">Raw quantitative data used in this analysis.</p>

        {/* Table 1 */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            Table 1 — Schedule Type Overview
          </h3>
          <p className="text-xs text-slate-500 mb-3">371K total configurations</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3 font-semibold text-slate-600">Schedule</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">Configs</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { s: "One-Time", c: 321589, p: "86.7%" },
                  { s: "Monthly", c: 32296, p: "8.7%" },
                  { s: "Bi-Weekly", c: 8500, p: "2.3%" },
                  { s: "Twice/Month", c: 5003, p: "1.3%" },
                  { s: "Weekly", c: 3667, p: "1.0%" },
                ].map((r) => (
                  <tr key={r.s}>
                    <td className="px-5 py-2.5 text-slate-700">{r.s}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-slate-700">{r.c.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums font-medium text-slate-800">{r.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2 */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            Table 2 — AutoPay Status
          </h3>
          <p className="text-xs text-slate-500 mb-3">By schedule type</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3 font-semibold text-slate-600">Schedule</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">AP On</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">AP Off</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">% AP On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { s: "One-Time", on: 246529, off: 75060, p: "76.7%" },
                  { s: "Monthly", on: 25124, off: 7172, p: "77.8%" },
                  { s: "Bi-Weekly", on: 5956, off: 2544, p: "70.1%" },
                  { s: "Weekly", on: 2698, off: 969, p: "73.6%" },
                  { s: "Twice/Month", on: 3547, off: 1456, p: "70.9%" },
                ].map((r) => (
                  <tr key={r.s}>
                    <td className="px-5 py-2.5 text-slate-700">{r.s}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-slate-700">{r.on.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-slate-700">{r.off.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums font-medium text-slate-800">{r.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3 */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            Table 3 — Loan Status (Active Loans Only)
          </h3>
          <p className="text-xs text-slate-500 mb-3">By schedule type</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3 font-semibold text-slate-600">Schedule</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">Current</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">Late (1-29)</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">Delinquent (30+)</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">% Late/Delinq</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { s: "One-Time", cur: 150557, late: 33166, del: 13814, p: "23.8%" },
                  { s: "Monthly", cur: 19561, late: 1160, del: 877, p: "9.4%" },
                  { s: "Bi-Weekly", cur: 4293, late: 511, del: 358, p: "16.8%" },
                  { s: "Weekly", cur: 1894, late: 181, del: 167, p: "15.5%" },
                  { s: "Twice/Month", cur: 2330, late: 269, del: 266, p: "18.7%" },
                ].map((r) => (
                  <tr key={r.s}>
                    <td className="px-5 py-2.5 text-slate-700">{r.s}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-slate-700">{r.cur.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-amber-700">{r.late.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-red-700">{r.del.toLocaleString()}</td>
                    <td className={`px-5 py-2.5 text-right tabular-nums font-medium ${parseFloat(r.p) > 20 ? "text-red-600" : "text-slate-800"}`}>{r.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 4 */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            Table 4 — Flex Payment Amount vs. Amount Due
          </h3>
          <p className="text-xs text-slate-500 mb-3">Active loans with amount due only</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3 font-semibold text-slate-600">Schedule</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">&lt; Due</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">= Due</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">&gt; Due</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">% &lt; Due</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">% = Due</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">% &gt; Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { s: "One-Time", lt: 16835, eq: 20699, gt: 12714, pLt: "33.5%", pEq: "41.2%", pGt: "25.3%" },
                  { s: "Monthly", lt: 1037, eq: 410, gt: 723, pLt: "47.8%", pEq: "18.9%", pGt: "33.3%" },
                  { s: "Bi-Weekly", lt: 669, eq: 10, gt: 225, pLt: "74.0%", pEq: "1.1%", pGt: "24.9%" },
                  { s: "Weekly", lt: 302, eq: 1, gt: 49, pLt: "85.8%", pEq: "0.3%", pGt: "13.9%" },
                  { s: "Twice/Month", lt: 419, eq: 7, gt: 135, pLt: "74.7%", pEq: "1.2%", pGt: "24.1%" },
                ].map((r) => (
                  <tr key={r.s}>
                    <td className="px-5 py-2.5 text-slate-700">{r.s}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-slate-700">{r.lt.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-slate-700">{r.eq.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-slate-700">{r.gt.toLocaleString()}</td>
                    <td className={`px-5 py-2.5 text-right tabular-nums font-medium ${parseFloat(r.pLt) > 50 ? "text-red-600" : "text-slate-800"}`}>{r.pLt}</td>
                    <td className={`px-5 py-2.5 text-right tabular-nums font-medium ${parseFloat(r.pEq) > 30 ? "text-emerald-600" : "text-slate-800"}`}>{r.pEq}</td>
                    <td className={`px-5 py-2.5 text-right tabular-nums font-medium ${parseFloat(r.pGt) > 30 ? "text-blue-600" : "text-slate-800"}`}>{r.pGt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 5 — Cure Rates */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            Table 5 — Cure Rates by Schedule Type
          </h3>
          <p className="text-xs text-slate-500 mb-3">Delinquent loans, cure and charge-off rates at 30/60/90 days</p>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3 font-semibold text-slate-600">Schedule</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">Loans</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">Cure @30d</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">Cure @60d</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">Cure @90d</th>
                  <th className="px-5 py-3 font-semibold text-slate-600 text-right">CO @90d</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { s: "Monthly", loans: "1,968", c30: "68.7%", c60: "75.4%", c90: "79.1%", co: "0.3%", best: true },
                  { s: "Bi-Weekly", loans: "563", c30: "63.4%", c60: "74.7%", c90: "77.5%", co: "0.2%", best: false },
                  { s: "Twice/Month", loans: "516", c30: "53.7%", c60: "67.3%", c90: "74.8%", co: "0.4%", best: false },
                  { s: "Weekly", loans: "250", c30: "55.6%", c60: "67.2%", c90: "69.2%", co: "0.4%", best: false },
                  { s: "One-Time", loans: "24,041", c30: "60.5%", c60: "65.6%", c90: "68.7%", co: "0.2%", best: false },
                ].map((r) => (
                  <tr key={r.s} className={r.best ? "bg-emerald-50/50" : ""}>
                    <td className={`px-5 py-2.5 ${r.best ? "font-medium text-emerald-700" : "text-slate-700"}`}>{r.s}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-slate-700">{r.loans}</td>
                    <td className={`px-5 py-2.5 text-right tabular-nums font-medium ${r.best ? "text-emerald-600" : "text-slate-800"}`}>{r.c30}</td>
                    <td className={`px-5 py-2.5 text-right tabular-nums font-medium ${r.best ? "text-emerald-600" : "text-slate-800"}`}>{r.c60}</td>
                    <td className={`px-5 py-2.5 text-right tabular-nums font-medium ${r.best ? "text-emerald-600" : "text-slate-800"}`}>{r.c90}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-slate-500">{r.co}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 6 — Full Matrix */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            Table 6 — Flexible Payments Matrix
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Unique loans by Schedule Type &times; AutoPay &times; Loan Status &times; Flex Amount vs. Installment
          </p>

          {[
            {
              schedule: "One-Time",
              rows: [
                { ap: "AP On", status: "Current", lt: 19126, eq: 34907, gt: 12544, total: 66577, pLt: 29, pEq: 52, pGt: 19 },
                { ap: "", status: "Late (1-29)", lt: 8255, eq: 341, gt: 316, total: 8912, pLt: 93, pEq: 4, pGt: 4 },
                { ap: "", status: "Delinquent (30+)", lt: 2021, eq: 74, gt: 108, total: 2203, pLt: 92, pEq: 3, pGt: 5 },
                { ap: "AP Off", status: "Current", lt: 5656, eq: 3203, gt: 2584, total: 11444, pLt: 49, pEq: 28, pGt: 23 },
                { ap: "", status: "Late (1-29)", lt: 3813, eq: 210, gt: 280, total: 4303, pLt: 89, pEq: 5, pGt: 6 },
                { ap: "", status: "Delinquent (30+)", lt: 3844, eq: 85, gt: 147, total: 4076, pLt: 94, pEq: 2, pGt: 4 },
              ],
            },
            {
              schedule: "Monthly",
              rows: [
                { ap: "AP On", status: "Current", lt: 1714, eq: 7047, gt: 4035, total: 12796, pLt: 13, pEq: 55, pGt: 32 },
                { ap: "", status: "Late (1-29)", lt: 403, eq: 19, gt: 24, total: 446, pLt: 90, pEq: 4, pGt: 5 },
                { ap: "", status: "Delinquent (30+)", lt: 249, eq: 3, gt: 7, total: 259, pLt: 96, pEq: 1, pGt: 3 },
                { ap: "AP Off", status: "Current", lt: 635, eq: 1149, gt: 680, total: 2464, pLt: 26, pEq: 47, pGt: 28 },
                { ap: "", status: "Late (1-29)", lt: 384, eq: 15, gt: 22, total: 421, pLt: 91, pEq: 4, pGt: 5 },
                { ap: "", status: "Delinquent (30+)", lt: 424, eq: 7, gt: 20, total: 451, pLt: 94, pEq: 2, pGt: 4 },
              ],
            },
            {
              schedule: "Bi-Weekly",
              rows: [
                { ap: "AP On", status: "Current", lt: 1240, eq: 285, gt: 805, total: 2330, pLt: 53, pEq: 12, pGt: 34 },
                { ap: "", status: "Late (1-29)", lt: 158, eq: 3, gt: 7, total: 168, pLt: 94, pEq: 2, pGt: 4 },
                { ap: "", status: "Delinquent (30+)", lt: 91, eq: 0, gt: 4, total: 95, pLt: 96, pEq: 0, pGt: 4 },
                { ap: "AP Off", status: "Current", lt: 416, eq: 42, gt: 195, total: 653, pLt: 64, pEq: 6, pGt: 30 },
                { ap: "", status: "Late (1-29)", lt: 166, eq: 2, gt: 9, total: 177, pLt: 94, pEq: 1, pGt: 5 },
                { ap: "", status: "Delinquent (30+)", lt: 162, eq: 0, gt: 7, total: 169, pLt: 96, pEq: 0, pGt: 4 },
              ],
            },
            {
              schedule: "Weekly",
              rows: [
                { ap: "AP On", status: "Current", lt: 755, eq: 43, gt: 217, total: 1015, pLt: 74, pEq: 4, pGt: 21 },
                { ap: "", status: "Late (1-29)", lt: 57, eq: 1, gt: 2, total: 60, pLt: 95, pEq: 2, pGt: 3 },
                { ap: "", status: "Delinquent (30+)", lt: 43, eq: 0, gt: 1, total: 44, pLt: 98, pEq: 0, pGt: 2 },
                { ap: "AP Off", status: "Current", lt: 175, eq: 3, gt: 36, total: 214, pLt: 82, pEq: 1, pGt: 17 },
                { ap: "", status: "Late (1-29)", lt: 52, eq: 1, gt: 5, total: 58, pLt: 90, pEq: 2, pGt: 9 },
                { ap: "", status: "Delinquent (30+)", lt: 63, eq: 0, gt: 0, total: 63, pLt: 100, pEq: 0, pGt: 0 },
              ],
            },
            {
              schedule: "Twice/Month",
              rows: [
                { ap: "AP On", status: "Current", lt: 711, eq: 200, gt: 464, total: 1375, pLt: 52, pEq: 14, pGt: 34 },
                { ap: "", status: "Late (1-29)", lt: 83, eq: 2, gt: 3, total: 88, pLt: 94, pEq: 2, pGt: 3 },
                { ap: "", status: "Delinquent (30+)", lt: 81, eq: 1, gt: 0, total: 82, pLt: 99, pEq: 1, pGt: 0 },
                { ap: "AP Off", status: "Current", lt: 241, eq: 34, gt: 89, total: 364, pLt: 66, pEq: 9, pGt: 24 },
                { ap: "", status: "Late (1-29)", lt: 104, eq: 4, gt: 6, total: 114, pLt: 91, pEq: 4, pGt: 5 },
                { ap: "", status: "Delinquent (30+)", lt: 138, eq: 1, gt: 3, total: 142, pLt: 97, pEq: 1, pGt: 2 },
              ],
            },
          ].map((group) => (
            <div key={group.schedule} className="mb-6">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">
                {group.schedule}
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-3 py-2.5 font-semibold text-slate-500 w-16">AutoPay</th>
                      <th className="px-3 py-2.5 font-semibold text-slate-500 w-28">Loan Status</th>
                      <th className="px-3 py-2.5 font-semibold text-slate-500 text-right">&lt; Due</th>
                      <th className="px-3 py-2.5 font-semibold text-slate-500 text-right">= Due</th>
                      <th className="px-3 py-2.5 font-semibold text-slate-500 text-right">&gt; Due</th>
                      <th className="px-3 py-2.5 font-semibold text-slate-500 text-right">Total</th>
                      <th className="px-3 py-2.5 font-semibold text-slate-500 text-right">% &lt;</th>
                      <th className="px-3 py-2.5 font-semibold text-slate-500 text-right">% =</th>
                      <th className="px-3 py-2.5 font-semibold text-slate-500 text-right">% &gt;</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {group.rows.map((r, i) => {
                      const isLate = r.status.includes("Late") || r.status.includes("Delinquent");
                      return (
                        <tr key={i} className={isLate ? "bg-red-50/40" : ""}>
                          <td className="px-3 py-2 font-medium text-slate-700">{r.ap}</td>
                          <td className={`px-3 py-2 ${isLate ? "text-red-700" : "text-slate-600"}`}>{r.status}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-slate-700">{r.lt.toLocaleString()}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-slate-700">{r.eq.toLocaleString()}</td>
                          <td className="px-3 py-2 text-right tabular-nums text-slate-700">{r.gt.toLocaleString()}</td>
                          <td className="px-3 py-2 text-right tabular-nums font-medium text-slate-800">{r.total.toLocaleString()}</td>
                          <td className={`px-3 py-2 text-right tabular-nums font-medium ${r.pLt >= 85 ? "text-red-600" : "text-slate-600"}`}>{r.pLt}%</td>
                          <td className={`px-3 py-2 text-right tabular-nums font-medium ${r.pEq >= 40 ? "text-emerald-600" : "text-slate-600"}`}>{r.pEq}%</td>
                          <td className={`px-3 py-2 text-right tabular-nums font-medium ${r.pGt >= 30 ? "text-blue-600" : "text-slate-600"}`}>{r.pGt}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Comments />

      <footer className="text-center text-xs text-slate-400 border-t border-slate-100 pt-6">
        Cherry Consumer Portal &middot; Flexible Payments Research &middot;
        March 2025
      </footer>
    </div>
  );
}
