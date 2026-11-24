# ScreenVibe

**ScreenVibe** is a web application built with HTML, CSS, and JavaScript for discovering, searching, and tracking movies and series using the OMDb API. Developed for the African Leadership University (ALU) *Playing Around with APIs* assignment, it is deployed across a load-balanced Nginx infrastructure.

## Demo Video & Live Access

- **Demo Video (≤ 2 minutes):** https://youtu.be/OZBJzcZbmRw
- **Deployed Application (Load Balancer):** http://13.40.32.164
- **GitHub Repository:** https://github.com/bouattara-cpu/ScreenVibe.git

## Features & User Interaction

- **Dynamic Search:** Search movies and series by title via button click or the `Enter` key.
- **Filtering & Sorting:** Filter results by media type and sort items in a responsive interface.
- **Secure API Key Management:** Users enter their OMDb API key in the interface. It is stored locally in the browser using `localStorage` under `omdb_api_key`, rather than being hardcoded in the repository.
- **Error Handling:** Clear feedback when the API key is missing, the search query is empty, or an API request fails.

## API Attribution & Documentation

This project uses the **OMDb API (The Open Movie Database)** to retrieve movie and series data.

- **Official Website & Documentation:** https://www.omdbapi.com/
- **API Key Page:** https://www.omdbapi.com/apikey.aspx
- **Credit:** All movie and series metadata is provided by the OMDb API developers and contributors.

## Project Structure

```text
ScreenVibe/
├── codevibe-reports/   # Exported CodeVibe assignment report (*.report.json)
├── index.html          # Application markup and UI containers
├── style.css           # Styling and responsive layout
├── app.js              # OMDb API calls, filtering, sorting, error handling, and DOM rendering
├── .gitignore          # Excludes sensitive, system, and temporary files
└── README.md           # Project documentation, deployment guide, and credits
```

## Running Locally

1. Clone the repository:

```bash
git clone https://github.com/bouattara-cpu/ScreenVibe.git
cd ScreenVibe
```

2. Serve the project locally using a static server:

```bash
python3 -m http.server 8000
```

3. Open http://localhost:8000 in your browser, paste your OMDb API key into the interface, and save it.

## Infrastructure & Deployment Guide

The application is hosted on Ubuntu 20.04 servers provisioned through ALU's web infrastructure.

| Role | Hostname | IP Address | Web Server Role |
| :--- | :--- | :--- | :--- |
| **Web Server 01** | `7385-web-01` | `3.9.115.18` | Serves static application files from `/var/www/screenvibe` via Nginx |
| **Web Server 02** | `7385-web-02` | `16.60.12.11` | Serves static application files from `/var/www/screenvibe` via Nginx |
| **Load Balancer** | `7385-lb-01` | `13.40.32.164` | Distributes incoming HTTP traffic across `web-01` and `web-02` via Nginx `upstream` |

### 1. Deploy to Web01 and Web02

On both `7385-web-01` (`3.9.115.18`) and `7385-web-02` (`16.60.12.11`):

```bash
sudo apt-get update
sudo apt-get install -y nginx
sudo mkdir -p /var/www/screenvibe
git clone https://github.com/bouattara-cpu/ScreenVibe.git /tmp/screenvibe_repo
sudo cp /tmp/screenvibe_repo/index.html /tmp/screenvibe_repo/style.css /tmp/screenvibe_repo/app.js /var/www/screenvibe/
```

Configure Nginx (`/etc/nginx/sites-available/default`) so that the `root` points to `/var/www/screenvibe` and `index` serves `index.html`.

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 2. Configure the Load Balancer (LB01)

On `7385-lb-01` (`13.40.32.164`), configure Nginx with an `upstream` block referencing both backend web servers (`3.9.115.18` and `16.60.12.11`) and proxy incoming requests using `proxy_pass http://...;`.

Test and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Verify load balancing and check for a `200 OK` response:

```bash
curl -I http://13.40.32.164
```

## Challenges & Solutions

- **Securing the OMDb API Key:** Instead of exposing an API key in source files or GitHub, key management was handled through the UI and persisted in browser `localStorage`.
- **Configuring Multi-Server Load Balancing:** Verified Nginx syntax using `nginx -t`, reloaded services cleanly on `web-01`, `web-02`, and `lb-01`, and confirmed traffic distribution across both backend servers.
- **Meeting CodeVibe Authorship & Review Rules:** Monitored AI usage and file review activity carefully and exported the final `.report.json` report into `codevibe-reports/`.

## Author

**Billy Mellika Assita Ouattara**

GitHub: https://github.com/bouattara-cpu
