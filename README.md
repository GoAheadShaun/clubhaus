# Group Repository for COMP SCI 2207/7207 Web & Database Computing Web Application Project (2023 Semester 1)

Your group's shared repository for the WDC 2023 Web App Project.

Auto commit/push/sync to Github is disabled by default in this repository.
- Enable the GitDoc extension to use this fucntionality (either in your VSCode settings, or in the Dev Container settings)

See [HERE](https://myuni.adelaide.edu.au/courses/85266/pages/2023-web-application-group-project-specification) for the project specification.

We recommend using the 'Shared Repository Model (Branch & Pull)' to collaborate on your work in this single repostory.
- You can read more about collaborating on GitHub repositories [HERE](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)
- When working on the same file at the same time, the 'Live Share' feature in VSCode can also help.


Features:

Non-logged In User:
	- Home Page
	- Club Pages

Logged-In User:
	- Ability to register and log in with Google Authentication
	- Home Page
	- Club Pages
		- Ability to join club
		- Ability to update/alter email preferences
	- Club Event Page
		- Ability to RSVP
	- Event Details Page
		- Ability to RSVP
	- My Events
		- Show all events that a user is RSVP'd to
	- My Account
		- Users Personal Details
		- Clubs that user is a member of

Club Manager:
	- Club Manager Home Page
		- Ability to create events
		- Ability to view events
		- Ability to view RSVPs of events
		- Ability to view club members
		- Ability to write emails and send updates to all club members and singular club members

System Admin:
	- System Admin Home Page
		- View Personal Information
		- View Clubs
	- Club Pages
		- Ability to change club managers
		- Ability to create system admin
		- Ability to send email to all users or individual users