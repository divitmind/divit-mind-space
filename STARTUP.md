# Project Startup Guide

To start working on a new task in this repository, you can use the automated script:

### 1. Automated Setup (Recommended)
Run the following command in PowerShell:
```powershell
./start-task.ps1 -BranchName "your-branch-name"
```
*This script will: Switch to main, pull updates, create your branch, install dependencies, and start the dev server.*

---

### 2. Manual Setup
If you prefer manual steps:

1. **Switch to a clean state:**
   ```bash
   git checkout main
   git pull
   ```

2. **Create a new task branch:**
   ```bash
   git checkout -b <branch-name>
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

4. **Start the development environment:**
   ```bash
   pnpm dev
   ```
   * This starts both the **Website** (at `http://localhost:3000` or the next available port) and the **Sanity Studio** (at `http://localhost:3000/studio`).

---
*Note: This file and the automation script were created to streamline the environment setup process.*
