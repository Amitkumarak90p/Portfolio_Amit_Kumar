/**
 * Architecture Inspection Content & Modals for Flagship Projects
 */

export const projectArchitectures = {
  neurosync: {
    title: 'NEUROSYNC AI // OFFLINE-FIRST ARCHITECTURAL SPECIFICATION',
    content: `
      <div class="arch-doc">
        <div class="arch-badge-row">
          <span class="micro-badge">Stack: React Native</span>
          <span class="micro-badge">Redux Toolkit</span>
          <span class="micro-badge">AsyncStorage</span>
          <span class="micro-badge">Local Notifications</span>
        </div>

        <h4 style="color: #00f0ff; margin: 1.25rem 0 0.5rem 0; font-family: 'Space Grotesk';">1. Storage Engine Decision Matrix</h4>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6;">
          During initial system evaluation, SQLite vs. AsyncStorage was benchmarked for client key-value productivity data.
          Given that journaling entries, Pomodoro logs, and user preference state required zero complex relational JOINs, 
          <strong>AsyncStorage</strong> with serialized JSON slices provided lower memory overhead, zero native C-binding complications, and instant read/write cycles on budget Android devices.
        </p>

        <h4 style="color: #00f0ff; margin: 1.25rem 0 0.5rem 0; font-family: 'Space Grotesk';">2. Offline-First State Machine</h4>
        <div style="background: rgba(4, 10, 26, 0.85); border: 1px solid rgba(0, 240, 255, 0.2); padding: 1rem; border-radius: 8px; font-family: 'JetBrains Mono'; font-size: 0.8rem; color: #38bdf8; margin: 0.75rem 0;">
          [USER_INPUT] ➔ [Redux Slice Action] ➔ [Optimistic UI Update (0ms)]<br />
          &nbsp;&nbsp;&nbsp;&nbsp;↳ [AsyncStorage Background Flush] ➔ [Local Storage Confirmed]<br />
          &nbsp;&nbsp;&nbsp;&nbsp;↳ [Local Notification Trigger] ➔ [Android AlarmManager Engine]
        </div>

        <h4 style="color: #00f0ff; margin: 1.25rem 0 0.5rem 0; font-family: 'Space Grotesk';">3. 35% Modular Codebase Reduction</h4>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6;">
          Created composite generic cards, interval timers, and status badges shared across the Journaling, Task Tracker, and Pomodoro views. This DRY architecture reduced duplicate JSX and reducer logic by approximately 35%, significantly improving maintainability.
        </p>
      </div>
    `
  },
  phytier: {
    title: 'PHYTIER // FULL-STACK FITNESS & HABIT TRACKING ARCHITECTURE',
    content: `
      <div class="arch-doc">
        <div class="arch-badge-row">
          <span class="micro-badge">React Native Client</span>
          <span class="micro-badge">Node.js Express API</span>
          <span class="micro-badge">PostgreSQL</span>
          <span class="micro-badge">JWT Security</span>
        </div>

        <h4 style="color: #00f0ff; margin: 1.25rem 0 0.5rem 0; font-family: 'Space Grotesk';">1. Normalized Relational Database Modeling</h4>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6;">
          Designed 3NF normalized PostgreSQL relational schemas separating user credentials, workout activity streams, habit frequencies, and progression milestones. Indexed high-query columns (user_id, timestamp, habit_id) ensuring sub-10ms query latency under load.
        </p>

        <h4 style="color: #00f0ff; margin: 1.25rem 0 0.5rem 0; font-family: 'Space Grotesk';">2. JWT Authentication &amp; Route Guard Flow</h4>
        <div style="background: rgba(4, 10, 26, 0.85); border: 1px solid rgba(0, 240, 255, 0.2); padding: 1rem; border-radius: 8px; font-family: 'JetBrains Mono'; font-size: 0.8rem; color: #38bdf8; margin: 0.75rem 0;">
          [Client Request] ➔ [Bearer Token Header] ➔ [Express Auth Guard Middleware]<br />
          &nbsp;&nbsp;&nbsp;&nbsp;↳ [JWT Verification & Signature Check]<br />
          &nbsp;&nbsp;&nbsp;&nbsp;↳ [Protected Controller Execution] ➔ [PostgreSQL Query via Pool]<br />
          &nbsp;&nbsp;&nbsp;&nbsp;↳ [JSON Payload Response with Milestone Progression]
        </div>

        <h4 style="color: #00f0ff; margin: 1.25rem 0 0.5rem 0; font-family: 'Space Grotesk';">3. Mobile Frontend Dynamic Milestone Progression</h4>
        <p style="color: #cbd5e1; font-size: 0.92rem; line-height: 1.6;">
          Built animated progress meters and milestone unlock algorithms in React Native that update dynamically as users complete habit goals, complete with skeleton placeholders and optimistic local rollback handling on network disconnects.
        </p>
      </div>
    `
  }
};
