document.addEventListener('DOMContentLoaded', () => {
  const genres = ["Action", "Drama", "Comedy", "Horror", "Romance"];
  const genreSelect = document.getElementById("genreSelect");
  const uploadForm = document.getElementById("uploadForm");

  genres.forEach(g => {
    const option = document.createElement("option");
    option.value = g;
    option.textContent = g;
    genreSelect.appendChild(option);
  });

  uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const genre = genreSelect.value;
    const coverFile = document.getElementById("cover").files[0];
    const movieFile = document.getElementById("movieFile").files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const movies = JSON.parse(localStorage.getItem("movies") || "[]");
      movies.push({
        title,
        genre,
        cover: reader.result,
        file: movieFile.name
      });
      localStorage.setItem("movies", JSON.stringify(movies));
      alert("Movie uploaded!");
      uploadForm.reset();
    };
    reader.readAsDataURL(coverFile);
  });
});

