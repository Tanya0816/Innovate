# EcoSphere Database Architecture

This document describes the database layer architecture for the EcoSphere ESG Management Platform. The architecture strictly follows Odoo MVC patterns with normalized relational tables.

## 1. Master Configuration Data
These entities serve as lookup tables and central configurations for transactional data:

- **Department (`esg.department`)**: Core organizational units.
- **Category (`esg.category`)**: Classifications applied across social and gamification modules.
- **Emission Factor (`esg.emission.factor`)**: Multipliers for converting source metrics into carbon emissions.
- **Product ESG Profile (`esg.product.profile`)**: Sustainability data tied to products.
- **Goal (`esg.environment.goal`)**: Environmental objectives.
- **Policy (`esg.policy`)**: Internal governance rules.
- **Badge (`esg.badge`)**: Reward badges for employee gamification.
- **Reward (`esg.reward`)**: Items that can be redeemed using points.
- **Challenge (`esg.challenge`)**: Time-bound sustainability initiatives.

## 2. Transactional Data
These records track real-time ESG events:

- **Carbon Transaction (`esg.carbon.transaction`)**: Automatically computes final emission footprint (`quantity * factor`).
- **CSR Activity (`esg.csr.activity`)**: Corporate social responsibility events.
- **Audit (`esg.audit`)**: Records of internal governance audits.

## 3. Employee Participations & Records
These models link standard HR employees to the ESG ecosystem:

- **Employee Participation (`esg.employee.participation`)**: Links `hr.employee` to CSR Activities. Requires proof before points are awarded.
- **Challenge Participation (`esg.challenge.participation`)**: Links `hr.employee` to Challenges. Includes workflow for approval.
- **Reward Redemption (`esg.reward.redemption`)**: Deducts points from employee and reduces `esg.reward` stock.
- **Compliance Issue (`esg.compliance.issue`)**: Links `hr.employee` to audit violations. Auto-computes `Overdue` flags based on due dates.
- **Policy Acknowledgement (`esg.policy.acknowledgement`)**: Records when an employee signs an ESG policy.

## 4. Analytics
- **Department Score (`esg.department.score`)**: Computed entity that aggregates and weighs environmental (40%), social (30%), and governance (30%) performance.

## Key Design Principles
- **No Redundancy**: Strict use of `Many2one` and `One2many` relations.
- **Integrity**: Heavy use of `@api.constrains` and `_sql_constraints`.
- **Computation over Storage**: Metrics like total scores and carbon emissions are computed dynamically.
