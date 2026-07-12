# Contributing to EcoSphere

Thank you for investing your time in contributing to our project!

## Getting Started

1. **Branching Strategy:** We use `main` for production releases and `develop` for active development. NEVER commit directly to `main`. Create a feature branch off of `develop`.
2. **Setup:** Ensure you have Odoo 17 installed. Install this module in your `addons` path.

## Development Guidelines

### 1. Architectural Integrity
EcoSphere is built with strict separation of concerns. 
- Do not introduce complex third-party dependencies unless absolutely necessary.
- Follow standard Odoo ORM practices.
- Avoid placing heavy business logic inside controllers; rely on model methods (`@api.model`, `@api.depends`, etc.).

### 2. Code Style
- **Python**: Follow PEP 8 guidelines. Use `flake8` for linting.
- **XML Views**: Format XML logically. Ensure every new field is properly represented in Form and Tree views.
- **Security**: Every new model MUST have a registered access control list (`ir.model.access.csv`).

### 3. Testing
All new computational fields and workflows must be covered by unit tests.
- Place tests in the `tests/` directory.
- Inherit from `odoo.tests.common.TransactionCase`.
- Run your tests locally before submitting a Pull Request.

## Submitting a Pull Request
1. Commit your changes logically (e.g., `feat: added notification model`).
2. Push your feature branch.
3. Open a PR targeting the `develop` branch.
4. Ensure your PR description explains *why* the change was made and *how* it was tested.
