# Innovate - EcoSphere: ESG Management Platform

## Problem Statement
Organizations need a way to measure, manage, and improve their Environmental, Social, and Governance (ESG) performance. While many systems collect operational data, ESG reporting is often manual, disconnected, and difficult to monitor in real-time.

## Challenge Statement
Build an ESG Management Platform that enables organizations to integrate operational data, employee participation, and compliance activities into a unified dashboard while encouraging sustainability through gamification.

## Core Modules & Implemented Database Models

### 1. Master Configuration
- **Department** (`esg.department`): Organizational hierarchy and ESG ownership.
- **Category** (`esg.category`): Shared categories for Social and Gamification modules.
- **Emission Factor** (`esg.emission.factor`): Values for carbon calculations.
- **Product ESG Profile** (`esg.product.profile`): ESG information linked to products.
- **Environmental Goal** (`esg.environment.goal`): Sustainability targets.
- **ESG Policy** (`esg.policy`): Governance policies.
- **Badge** (`esg.badge`): Employee achievements.
- **Reward** (`esg.reward`): Redeemable incentives.

### 2. Environmental
- **Carbon Transaction** (`esg.carbon.transaction`): Stores calculated emissions from operations.

### 3. Social
- **CSR Activity** (`esg.csr.activity`): Social initiatives organized by the company.
- **Employee Participation** (`esg.employee.participation`): Tracks employee involvement in CSR Activities.

### 4. Governance
- **Policy Acknowledgement** (`esg.policy.acknowledgement`): Employee policy acceptance.
- **Audit** (`esg.audit`): Governance audit records with severity and status tracking.
- **Compliance Issue** (`esg.compliance.issue`): Tracks governance violations, owners, and automatically computes overdue status based on due dates.
- **Department Score** (`esg.department.score`): Aggregates Environmental (40%), Social (30%), and Governance (30%) scores into a total department ESG score.

### 5. Gamification
- **Challenge** (`esg.challenge`): Sustainability challenges with difficulty and XP.
- **Challenge Participation** (`esg.challenge.participation`): Tracks employee progress. Automatically awards points and updates completion status when evidence is approved.
- **Reward Redemption** (`esg.reward.redemption`): Tracks reward redemptions. Ensures employee point balances and reward stock never drop below zero.

## Settings & Business Rules
- Auto Emission Calculation
- Evidence Requirements for Challenges/CSR
- Badge Auto-Award
- Notification System Integrations
