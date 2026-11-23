# ScreenVibe

**ScreenVibe** is a web application built with HTML, CSS, and JavaScript for discovering, searching, and tracking movies and books using external APIs. Developed for the African Leadership University (ALU) *Playing Around with APIs* project, it is deployed across a two-tier load-balanced Nginx infrastructure.

## Overview & Features

* **API-Driven Discovery**: Fetch, search, and browse movies and books dynamically through external APIs.
* **Interactive Filtering & Tracking**: Filter results, inspect details, and track titles in a responsive user interface.
* **High-Availability Deployment**: Served over Nginx across two web servers (`7385-web-01` and `7385-web-02`) behind a reverse proxy load balancer (`7385-lb-01`).

## Project Structure

```text
ScreenVibe/
├── index.html      # Application structure and UI containers
├── style.css       # Layout, styling, and responsive design
├── app.js          # API requests, search/filter state, and DOM rendering
├── .gitignore      # Ignores sensitive/system/log files (.env, .DS_Store, Thumbs.db, *.log)
└── README.md       # Project documentation and infrastructure details
