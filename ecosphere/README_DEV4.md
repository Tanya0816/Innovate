# Developer 4 — Dashboard, AI & Core

## Folder structure (only the parts you own)

```
ecosphere/
├── controllers/
│   ├── __init__.py
│   ├── dashboard.py          # KPI, department table, notifications endpoints
│   └── ai_api.py             # assistant chat + recommendations endpoints
│
├── ai/
│   ├── __init__.py
│   ├── client.py             # public entrypoint other code calls
│   ├── provider.py           # ONLY file to change to switch AI vendor
│   ├── prompts/
│   │   ├── report_prompt.py
│   │   ├── recommendation_prompt.py
│   │   └── compliance_prompt.py
│   └── services/
│       ├── report_service.py
│       ├── recommendation_service.py
│       └── assistant_service.py
│
├── services/
│   ├── score/
│   │   ├── score_engine.py           # pure math, no ORM
│   │   ├── department_score.py       # ORM orchestration -> department.score
│   │   └── organization_score.py     # rollup for the executive dashboard
│   └── notification/
│       ├── notification_service.py   # create/query notifications
│       └── notification_dispatcher.py# delivery channels (bus/email)
│
├── models/
│   ├── notification.py       # ORM only
│   ├── department_score.py   # ORM only
│   └── settings.py           # res.config.settings extension (AI + weights)
│
├── views/
│   ├── dashboard/dashboard_views.xml
│   └── shared/shared_views.xml
│
├── security/
│   └── ir.model.access.csv   # rows to MERGE into the shared file
│
└── static/src/
    ├── owl/dashboard/executive_dashboard/   # main dashboard app
    └── owl/shared/                          # 11 reusable components:
        Button, Card, Chart, Gauge, ProgressBar,
        Table, StatCard, Modal, Notification, Badge, Loading
```

## Integration points with other developers

- **Developer 1** (`carbon.transaction`) — `department_score.py` reads
  `efficiency_score` off carbon transactions to build the Environment pillar.
- **Developer 2** (`employee.participation`) — feeds the Social pillar.
- **Developer 3** (`policy.acknowledgement`, `compliance.issue`) — feeds the
  Governance pillar, and `ai/services/report_service.py` is designed to be
  called from Developer 3's report builder to attach an AI narrative.
- **Everyone** — call `NotificationService(env).notify(user, title, message)`
  instead of writing to the `notification` model directly.

## Setup

1. Merge `security/ir.model.access.csv` rows into the module-wide file.
2. Add asset entries from `MANIFEST_ASSETS_SNIPPET.md` to `__manifest__.py`.
3. Go to Settings > EcoSphere and set an AI provider + API key
   (`ecosphere.ai_provider`, `ecosphere.ai_api_key`).
4. Executive Dashboard menu item appears under the "EcoSphere" root menu.
