let API_KEY = localStorage.getItem('omdb_api_key') ||'';
let currentMovies = [];

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const moviesContainer = document.getElementById('moviesContainer');
const errorMessage = document.getElementById('errorMessage');
const typeFilter = document.getElementById('typeFilter');
const sortSelect = document.getElementById('sortSelect');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveKeyBtn = document.getElementById('saveKeyBtn');

if (API_KEY) {
    apiKeyInput.value = API_KEY;
}

saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        API_KEY = key;
        localStorage.setItem('omdb_api_key', key);
        alert('API key saved successfully!');
    } else {
        alert('Please enter a valid key');
    }
});

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

typeFilter.addEventListener('change', renderMovies);
sortSelect.addEventListener('change', renderMovies);

async function handleSearch() {
    const query = searchInput.value.trim();
    if (!API_KEY) {
        showError('Please enter and save your OMDb API key in the top right corner first.');
        return;
    }
    if (!query) {
        showError('Please enter a movie or series name to search.');
        return;
    }

    try {
        hideError();
        moviesContainer.innerHTML = '<div class="welcome-state"><p>⏳ Searching records...</p></div>';

        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.Response === 'True') {
            currentMovies = data.Search;
            renderMovies();
        } else {
            currentMovies = [];
            moviesContainer.innerHTML = '';
            showError(data.Error || 'No results found.');
        }

    } catch (error) {
        currentMovies = [];
        moviesContainer.innerHTML = '';
        showError('Failed to fetch data from API. Check your internet connection.');
        console.error('API Error:', error);
    }
}

function renderMovies() {
    let filtered = [...currentMovies];

    // Filter by type
    const typeVal = typeFilter.value;
    if (typeVal) {
        filtered = filtered.filter(m => m.Type === typeVal);
    }

    // Sort Options
    const sortVal = sortSelect.value;
    if (sortVal === 'year-desc') {
        filtered.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if  (sortVal === 'year-asc') {
        filtered.sort((a,b) => parseInt(a.Year) - parseInt(b.Year));
    } else if (sortVal === 'title') {
        filtered.sort((a, b) => a.Title.localeCompare(b.Title));
    }

    if (filtered.lenght === 0) {
        moviesContainer.innerHTML = 'div class="welcome-state"><p>No items match your selected filters.</p></div>';
        return;
    }

    moviesContainer.innerHTML = '';
    filtered.forEach(movie => {
        const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';

        const card = document.createElement('div');
        card.className = 'movie-card';
        card .innerHTML = `
            <img src="${poster}" alt="${movie.Title}">
            <div class="movie-info">
            <h3>${movie.Title}</h3>
            <div class="movie-meta">
            <span>${movie.Year}</span>
            <span class="type-badge">${movie.Type}</span>
            </div>
        </div>
            `;
            moviesContainer.appendChild(card);
    });
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}