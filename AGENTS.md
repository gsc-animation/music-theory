# Agent Instructions

## 1. Port Configuration & Handling

- **Default Port**: The project is configured to run on port `5504`.
- **Conflict Handling**: If port `5504` is already in use:
  1.  **Stop**: Do not auto-increment to another port (e.g., 5505).
  2.  **Kill**: Identify and kill the process occupying port `5504`.
      - Example command: `lsof -t -i:5504 | xargs kill -9` (or equivalent for the OS).
  3.  **Restart**: Run `npm run dev` again on the correct port.

## 2. Documentation Structure

Agents must respect the existing directory structure in `./docs` to maintain project organization.

### Directory Reference

- **./docs/active/**: Current work-in-progress, active roadmaps, and immediate tasks.
- **./docs/context/**: System architecture, high-level context, and design patterns.
- **./docs/specs/**: Detailed feature specifications and requirements.
- **./docs/records/**: Logs, meeting notes, and historical records.
- **./docs/reviews/**: Code review notes and audit artifacts.
- **./docs/archive/**: Obsolete or completed documentation.

### Documentation Workflow

- **Before Implementation**: Read `./docs/active/` to understand the current task status.
- **During Implementation**: Update status in the relevant documents.
- **After Implementation**: Update documentation to reflect the new state (e.g., mark specifications as "Completed", update "Current Status" in roadmaps).

## 3. Post-Implementation Workflow

After completing code changes, the agent MUST run the following verification steps in order:

1.  **Build Check**:

    ```bash
    npm run build
    ```

    - **Requirement**: Must complete with **zero errors**.

2.  **E2E Testing**:

    ```bash
    npm run test:e2e
    ```

    - **Requirement**: All end-to-end tests must pass.

3.  **Documentation Handover**:
    - Update relevant files in `./docs`.
    - Ensure the documentation reflects the _new_ current state for the next step of implementation.
