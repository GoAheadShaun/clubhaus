const clubBoxes = document.querySelectorAll('.club-box');
clubBoxes.forEach((clubBox) => {
    clubBox.addEventListener('click', () => {
        window.location.href = 'club_page.html';
    });
});
