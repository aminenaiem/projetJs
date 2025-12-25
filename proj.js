
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navigateTo(link.dataset.page);
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

let films = JSON.parse(localStorage.getItem("films")) || [];

function saveFilms() {
    localStorage.setItem("films", JSON.stringify(films));
}

function renderFilms() {
    const list = document.getElementById("filmList");
    list.innerHTML = "";

    films.forEach(film => {
        const card = document.createElement("div");
        card.className = "film-card";
        card.innerHTML = `
            <h3>${film.title}</h3>
            <p>${film.year} - ${film.genre}</p>
            <p>Note : ${film.rating}/10</p>
            <div class="film-actions">
                <button class="btn-edit" onclick="editFilm(${film.id})">Modifier</button>
                <button class="btn-delete" onclick="deleteFilm(${film.id})">Supprimer</button>
            </div>
        `;
        list.appendChild(card);
    });
}

document.getElementById("filmForm").addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const year = document.getElementById("year").value;
    const genre = document.getElementById("genre").value;
    const rating = document.getElementById("rating").value;

    const film = { id: Date.now(), title, year, genre, rating };
    films.push(film);
    saveFilms();
    renderFilms();
    e.target.reset();
});

function deleteFilm(id) {
    if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
        films = films.filter(f => f.id !== id);
        saveFilms();
        renderFilms();
    }
}

function editFilm(id) {
    const film = films.find(f => f.id === id);
    if (!film) return;

    // Remplir le formulaire avec les données du film
    document.getElementById("title").value = film.title;
    document.getElementById("year").value = film.year;
    document.getElementById("genre").value = film.genre;
    document.getElementById("rating").value = film.rating;

    // Supprimer l'ancien film pour le remplacer
    films = films.filter(f => f.id !== id);
    saveFilms();
    renderFilms();
}

// Recherche
document.getElementById("searchFilm").addEventListener("input", e => {
    const keyword = e.target.value.toLowerCase();
    const filtered = films.filter(f => f.title.toLowerCase().includes(keyword));
    const list = document.getElementById("filmList");
    list.innerHTML = "";
    filtered.forEach(film => {
        const card = document.createElement("div");
        card.className = "film-card";
        card.innerHTML = `<h3>${film.title}</h3><p>${film.year} - ${film.genre}</p><p>Note : ${film.rating}/10</p>`;
        list.appendChild(card);
    });
});

// Tri
document.getElementById("sortFilm").addEventListener("change", e => {
    const sortBy = e.target.value;
    if (sortBy) {
        films.sort((a, b) => {
            if (sortBy === "title") return a.title.localeCompare(b.title);
            if (sortBy === "year") return a.year - b.year;
            if (sortBy === "rating") return b.rating - a.rating;
        });
        renderFilms();
    }
});

renderFilms();
