// ---------------------------
// ROUTER SPA
// ---------------------------
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navigateTo(link.dataset.page);
    });
});

// ---------------------------
// MODULE FILMS (Semaine 1)
// ---------------------------
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
        `;
        list.appendChild(card);
    });
}

document.getElementById("filmForm").addEventListener("submit", e => {
    e.preventDefault();

    const film = {
        id: Date.now(),
        title: title.value,
        year: year.value,
        genre: genre.value,
        rating: rating.value
    };

    films.push(film);
    saveFilms();
    renderFilms();
    e.target.reset();
});

renderFilms();
