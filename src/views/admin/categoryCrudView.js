/**
 * dark_mode_theme.css
 */
body.dark {
  --bg-main: #0f172a;
  --bg-card: #1e293b;
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --border-light: #334155;
  --primary: #fbbf24;
  --primary-dark: #f59e0b;
}

body.dark {
  background-color: var(--bg-main);
  color: var(--text-main);
}

body.dark .bg-white {
  background-color: var(--bg-card) !important;
}

body.dark .border-slate-200 {
  border-color: var(--border-light) !important;
}

body.dark .text-slate-800 {
  color: var(--text-main) !important;
}

body.dark .text-slate-500, body.dark .text-slate-400 {
  color: var(--text-muted) !important;
}

body.dark .bg-slate-50, body.dark .bg-slate-100 {
  background-color: #0f172a !important;
}

body.dark .crud-table tr:nth-child(even) {
  background: #1e293b;
}

body.dark .crud-table tr:hover {
  background: #334155;
}

body.dark .modal-content {
  background: var(--bg-card);
  color: var(--text-main);
}

body.dark .form-control {
  background: #0f172a;
  color: white;
  border-color: #334155;
}
