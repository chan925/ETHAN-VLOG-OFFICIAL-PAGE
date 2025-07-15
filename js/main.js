document.addEventListener('DOMContentLoaded', () => {
  const genres = ["Action", "Drama", "Comedy", "Horror", "Romance"];
  const genreFilter = document.getElementById("genreFilter");
  const searchInput = document.getElementById("searchInput");
  const movieGallery = document.getElementById("movieGallery");

  genres.forEach(g => {
    const option = document.createElement("option");
    option.value = g;
    option.textContent = g;
    genreFilter.appendChild(option);
  });

  function renderMovies(filterGenre = "all", search = "") {
    const movies = JSON.parse(localStorage.getItem("movies") || "[]");
    movieGallery.innerHTML = "";

    movies
      .filter(m => (filterGenre === "all" || m.genre === filterGenre) && m.title.toLowerCase().includes(search.toLowerCase()))
      .forEach(m => {
        const div = document.createElement("div");
        div.className = "movie-card";
        div.innerHTML = `
          <img src="\${m.cover}" alt="\${m.title}">
          <h3>\${m.title}</h3>
          <p>\${m.genre}</p>
        `;
        movieGallery.appendChild(div);
      });
  }

  genreFilter.addEventListener("change", () => renderMovies(genreFilter.value, searchInput.value));
  searchInput.addEventListener("input", () => renderMovies(genreFilter.value, searchInput.value));

  renderMovies();
});
