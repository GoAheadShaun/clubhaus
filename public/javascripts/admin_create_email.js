const vueinst = new Vue({
    el: '#test',
    data: {
        selectAllManagers: false,
        selectedRecipients: []
    },
    mounted() {
        this.populateRecipientsDropdown();
    },
    methods: {
        toggleSelectAllUsers() {
            if (this.selectAllManagers) {
                this.populateRecipientsDropdown();
            } else {
                this.selectedRecipients = [];
            }
        },
        populateRecipientsDropdown() {
            const xhttp = new XMLHttpRequest();
            const self = this;

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    const emails = JSON.parse(this.responseText);

                    self.selectedRecipients = emails;

                    const recipientsDropdown = document.getElementById('recipients');
                    recipientsDropdown.innerHTML = '';

                    emails.forEach(function (email) {
                        const option = document.createElement('option');
                        option.value = email;
                        option.text = email;
                        recipientsDropdown.appendChild(option);
                    });
                }
            };

            xhttp.open('GET', '/getManagers', true);
            xhttp.send();
        },
        sendEmail() {
            const heading = document.getElementById('event-name').value;
            const recipients = this.selectedRecipients;
            const description = document.getElementById('textbox-description').value;

            const formData = {
                heading: heading,
                recipients: recipients,
                description: description
            };

            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        alert('Email sent successfully');
                    } else {
                        alert('Failed to send email');
                    }
                }
            };
            xhttp.open('POST', '/sendEmail', true);
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.send(JSON.stringify(formData));
        }
    }
});
