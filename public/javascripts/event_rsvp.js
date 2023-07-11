document.addEventListener('DOMContentLoaded', function () {
    const joinClubButton = document.querySelector('.join-button button');
    joinClubButton.addEventListener('click', function () {
        window.location.href = 'club_page.html';
    });
});
