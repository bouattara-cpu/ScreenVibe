# ScreenVibe — Movies & Series Explorer

ScreenVibe is a responsive web application for searching, filtering, and sorting movies and series using the **OMDb API**. Built with vanilla HTML5, CSS3, and JavaScript, it allows users to save their OMDb API key locally in the browser and explore results smoothly.

## Features

- **API Key Management (`localStorage`)**: Enter and save an OMDb API key directly in the interface, with validation when the input is empty.
- **Instant Search**: Search for movies and series by title using the search button or the `Enter` key.
- **Filtering & Sorting**: Filter results by type (`All`, `movie`, `series`, etc.) and sort displayed items.
- **Error & Empty State Handling**: Clear feedback when no API key is provided, when no matching movie/series is found, or when a network/API error occurs.
- **Responsive UI**: Styled with custom CSS3 and the **Poppins** font.

## Tech Stack

- **HTML5** (`index.html`)
- **CSS3** (`style.css`)
- **JavaScript (ES6+)** (`app.js`)
- **OMDb API** (`https://www.omdbapi.com/`)

## Project Structure

```text
ScreenVibe/
├── index.html              # Main application markup and layout
├── style.css               # Styling and responsive design
├── app.js                  # API requests, localStorage handling, filtering, sorting, and DOM rendering
└── codepause-ScreenVibe.json # Activity/authorship tracking export
