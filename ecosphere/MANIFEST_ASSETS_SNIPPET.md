# Manifest assets — add these to the shared `__manifest__.py`

The `__manifest__.py` is owned collectively (module root), so don't create
a new one — just add your entries to the existing `assets` dict under the
`web.assets_backend` bundle:

```python
'assets': {
    'web.assets_backend': [
        # Developer 4 — Core / Dashboard / AI
        'ecosphere/static/src/scss/dashboard.scss',

        'ecosphere/static/src/owl/shared/Button/button.js',
        'ecosphere/static/src/owl/shared/Button/button.xml',
        'ecosphere/static/src/owl/shared/Card/card.js',
        'ecosphere/static/src/owl/shared/Card/card.xml',
        'ecosphere/static/src/owl/shared/Chart/chart.js',
        'ecosphere/static/src/owl/shared/Chart/chart.xml',
        'ecosphere/static/src/owl/shared/Gauge/gauge.js',
        'ecosphere/static/src/owl/shared/Gauge/gauge.xml',
        'ecosphere/static/src/owl/shared/ProgressBar/progress_bar.js',
        'ecosphere/static/src/owl/shared/ProgressBar/progress_bar.xml',
        'ecosphere/static/src/owl/shared/Table/table.js',
        'ecosphere/static/src/owl/shared/Table/table.xml',
        'ecosphere/static/src/owl/shared/StatCard/stat_card.js',
        'ecosphere/static/src/owl/shared/StatCard/stat_card.xml',
        'ecosphere/static/src/owl/shared/Modal/modal.js',
        'ecosphere/static/src/owl/shared/Modal/modal.xml',
        'ecosphere/static/src/owl/shared/Notification/notification.js',
        'ecosphere/static/src/owl/shared/Notification/notification.xml',
        'ecosphere/static/src/owl/shared/Badge/badge.js',
        'ecosphere/static/src/owl/shared/Badge/badge.xml',
        'ecosphere/static/src/owl/shared/Loading/loading.js',
        'ecosphere/static/src/owl/shared/Loading/loading.xml',

        'ecosphere/static/src/owl/dashboard/executive_dashboard/executive_dashboard.js',
        'ecosphere/static/src/owl/dashboard/executive_dashboard/executive_dashboard.xml',
        'ecosphere/static/src/owl/dashboard/executive_dashboard/executive_dashboard.scss',

        # (append all *.scss files here too, or bundle via a single
        #  dashboard.scss that @imports them)
    ],
},
```


