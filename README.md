﻿# notes-application
Welcome to the Notes Application! This guide will walk you through the steps to set up and use the application, from registration to creating and managing your notes.

Features
User Authentication: Register and log in to securely access your notes.
Create Notes: Add new notes with titles, content, labels, and reminders.
Search Notes: Search through your notes for quick access.
Label View: View all notes tagged with a specific label.
Archived Notes: Archive notes you no longer need immediate access to.
Trash Notes: View and restore notes deleted within the last 30 days.
Note Background Colors: Toggle between different background colors for your notes.
Reminders: Set reminders for your notes and view all notes with upcoming due dates.
Setting Up the Application
Prerequisites
Node.js and npm installed on your machine.
MongoDB running on your local machine or accessible through a connection string.
Backend Setup
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd notes-application
Navigate to Backend Directory:

cd backend
Install Dependencies:

npm install
Create a .env File:
In the backend directory, create a .env file with the following content:


JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/notes-app
Start the Backend Server:

bash
Copy code
nodemon server.js
You should see messages indicating that the server is running on port 5000 and MongoDB is connected.

Frontend Setup
Navigate to Frontend Directory:

cd frontend
Open index.html in Your Browser:
Open the index.html file in your favorite web browser to access the application interface.

Using the Application
1. Register a New User
Click the Register button.
Enter a username and password when prompted.
2. Log In
Click the Login button.
Enter your username and password when prompted.
3. Create a New Note
Enter a title for your note in the "Title" field.
Enter the content of your note in the "Content" field.
Optionally, enter labels (comma-separated) in the "Labels" field.
Optionally, set a reminder date.
Click the Create Note button.
Your new note will appear in the notes section.

4. View and Manage Notes
View All Notes: All created notes will be displayed in the notes section.
Archive a Note: Click the Archive button on a note to move it to the archived section.
Trash a Note: Click the Trash button on a note to move it to the trash section.
5. Search Notes
Use the search bar to quickly find notes containing specific keywords.
6. View Notes by Label
Click on a label in the labels section to view all notes tagged with that label.
7. View Archived Notes
Navigate to the archived section to view all archived notes.
8. View Trashed Notes
Navigate to the trash section to view and restore notes deleted within the last 30 days.
9. Set Reminders
Set reminders for your notes, and view all notes with upcoming due dates in the reminders section.
Troubleshooting
Ensure MongoDB is running: Make sure MongoDB is running and accessible at the connection string specified in the .env file.
Check Browser Console: Open the browser's developer tools (F12) and check the console for any errors or messages.
Restart Server: If you make changes to the backend code, restart the server using nodemon.
By following this guide, you should be able to set up and use the Notes Application effectively. Enjoy managing your notes with ease!
