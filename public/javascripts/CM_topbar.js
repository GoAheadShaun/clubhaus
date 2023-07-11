function handleSearch(event) {
    if (event.key === "Enter") {
        const searchTerm = event.target.value;
        window.location.href = `search_results.html?query=${searchTerm}`;
    }
}

const searchInput = document.querySelector('.search input');
searchInput.addEventListener('keydown', handleSearch);

document.addEventListener('DOMContentLoaded', function () {
    var logo = document.querySelector('.logo');
    logo.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
});

const loginButton = document.querySelector('.sign button:nth-child(2)');
loginButton.addEventListener('click', () => {
    window.location.href = 'club_page.html';
});
