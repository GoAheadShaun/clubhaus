document.addEventListener('DOMContentLoaded', function () {
    const rsvpButtons = document.querySelectorAll('.rsvp-button');
    const upcomingButton = document.querySelector(".club-event-upcoming-past-buttons button:first-child");
    const pastButton = document.querySelector(".club-event-upcoming-past-buttons button:last-child");

    rsvpButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            window.location.href = 'event_rsvp.html';
        });
    });

    upcomingButton.addEventListener("click", function () {
        // TBD
    });

    pastButton.addEventListener("click", function () {
        window.location.href = "club_events_past.html";
    });
});


function renderEvents() {
    var xhttp = new XMLHttpRequest();
    let clubid = 1;
    let tense = "Upcoming";
    const data = {
        ClubId: clubid,
        Tense: tense
    };
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let eventList = document.querySelector('ul');
            let parentElement = eventList.parentNode;
            while (eventList.firstChild) {
                eventList.removeChild(eventList.firstChild);
            }
            let events = JSON.parse(this.responseText);
            for (let i = 0; i < events.length; i++) {
                let li = document.createElement('li');
                li.textContent = events[i];
                eventList.appendChild(li);
            }
        }
    };
    xhttp.open("POST", '/renderEvents', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
}
