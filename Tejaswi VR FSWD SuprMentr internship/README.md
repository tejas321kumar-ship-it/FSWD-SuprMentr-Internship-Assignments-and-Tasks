# Tejaswi VR FSWD SuprMentr Internship Assignments

This repository contains all internship assignments and tasks in one place.

## Requirements

- Node.js (LTS recommended)
- npm (comes with Node.js)
- Git

## Clone and Setup

1. Clone the repository:

    git clone https://github.com/tejas321kumar-ship-it/FSWD-SuprMentr-Internship-Assignments-and-Tasks.git

2. Open the cloned folder in VS Code.

3. For each project folder, follow the matching run steps below.

## Project Run Guide

### A) Plain HTML/CSS/JavaScript Projects

Run by opening the HTML file directly in browser.

Folders:
- Component Hunt
- Console Challenge
- Interactive Form
- Student Manager
- Task 8 - Custom Form Validation
- Task 9 - DOM Form Validation Page
- Task 10 - Responsive Navbar
- Responsive Hero Page

Commands (optional local server):

    # Example using VS Code Live Server extension
    # or just open index.html directly

### B) Plain HTML/CSS Project With Custom Entry File

Folder:
- my first website&make it beautiful

Run:
- Open ass.html in browser.

### C) Documentation-Only Folder

Folder:
- internet-explorer

Run:
- Open and read Client-server-Architecture.md

### D) React + Vite Projects

General steps for each folder:

    cd "FOLDER_NAME"
    npm install
    npm run dev

Vite/React folders:
- dynamic-list-app
- mood-tracker
- multi-page-app
- smart-signup-form
- weather-dashboard
- Task 4 - Dynamic Product Cart
- Task 5 - Mini E-Commerce
- Task 6 - Blog App
- Task 7 - Registration Form Validation
- Task 11 - Student ID Card Component
- Product Listing UI/client

Optional production build check:

    npm run build
    npm run preview

### E) Node/Express Backend Projects

General steps for each backend folder:

    cd "FOLDER_NAME"
    npm install
    npm start

Backend folders:
- Folder Architect
- Hello Server
- Task 1 - Build Student API Server
- Task 2 - Product API
- Task 3 - Mini Backend Website
- Task 12 - Build Student API
- Task 13 - Product MVC Project
- Product Listing UI/server

Note:
- Task 13 uses app.js as the startup file through npm start.
- Product Listing UI/server uses its own start script from package.json.

## Full Stack Project Note: Product Listing UI

Run backend first in one terminal:

    cd "Product Listing UI/server"
    npm install
    npm start

Run frontend in second terminal:

    cd "Product Listing UI/client"
    npm install
    npm run dev

1. Open a terminal in any target project folder.
2. Install dependencies using npm install (only for folders with package.json).
3. Start project using:
- npm run dev for Vite React projects
- npm start for Node backend projects
- open HTML file for plain frontend projects

## What Is Ignored in Git

This repository uses a root .gitignore so generated files are not pushed.

Main ignored items:
- node_modules/
- dist/
- build/
- .env and .env.*
- logs and OS/editor temp files

## Important

Do not push node_modules. Anyone cloning this repository should run npm install inside each Node/Vite project folder before running.
