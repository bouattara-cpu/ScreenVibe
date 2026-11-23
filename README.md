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
## Infrastructure & Deployment Architecture

The application is deployed on Ubuntu 20.04 servers provisioned through ALU's web infrastructure:

| Role | Hostname | IP Address | Web Server Role |
| :--- | :--- | :--- | :--- |
| **Web Server 01** | `7385-web-01` | `3.9.115.18` | Serves static files from `/var/www/screenvibe` via Nginx |
| **Web Server 02** | `7385-web-02` | `16.60.12.11` | Serves static files from `/var/www/screenvibe` via Nginx |
| **Load Balancer** | `7385-lb-01` | `13.40.32.164` | Distributes HTTP traffic across `web-01` and `web-02` using Nginx `upstream` |

## Live Access

* **Load Balancer URL**: `[http://13.40.32.164](http://13.40.32.164)`
* **GitHub Repository**: `[https://github.com/bouattara-cpu/ScreenVibe.git](https://github.com/bouattara-cpu/ScreenVibe.git)`

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/bouattara-cpu/ScreenVibe.git
   cd ScreenVibe
