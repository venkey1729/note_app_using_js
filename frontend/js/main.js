document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
    }
  
    const createNoteButton = document.getElementById('create-note');
    createNoteButton.addEventListener('click', createNote);
  
    const searchNotesButton = document.getElementById('search-notes');
    searchNotesButton.addEventListener('click', searchNotes);
  
    const archivedNotesButton = document.getElementById('archived-notes');
    archivedNotesButton.addEventListener('click', loadArchivedNotes);
  
    const trashNotesButton = document.getElementById('trash-notes');
    trashNotesButton.addEventListener('click', loadTrashNotes);
  
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  
    // Load Notes
    loadNotes();
  
    async function createNote() {
      const title = prompt('Enter note title');
      const content = prompt('Enter note content');
      const tags = prompt('Enter tags (comma separated)').split(',');
  
      const note = {
        title,
        content,
        tags,
        backgroundColor: '#ffffff',
      };
  
      try {
        const response = await fetch('http://localhost:5000/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(note),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Note created', data);
          loadNotes();
        } else {
          console.error('Error creating note:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    async function searchNotes() {
      const query = prompt('Enter search query');
  
      try {
        const response = await fetch(`http://localhost:5000/api/notes/search?query=${query}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          displayNotes(data);
        } else {
          console.error('Error searching notes:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    async function loadArchivedNotes() {
      try {
        const response = await fetch('http://localhost:5000/api/notes/archived', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          displayNotes(data);
        } else {
          console.error('Error loading archived notes:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    async function loadTrashNotes() {
      try {
        const response = await fetch('http://localhost:5000/api/notes/trash', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          displayNotes(data);
        } else {
          console.error('Error loading trash notes:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    async function loadNotes() {
      try {
        const response = await fetch('http://localhost:5000/api/notes', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          displayNotes(data);
        } else {
          console.error('Error loading notes:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    function displayNotes(notes) {
      if (!Array.isArray(notes)) {
        console.error('Expected an array of notes');
        return;
      }
      const notesSection = document.getElementById('notes-section');
      notesSection.innerHTML = '';
  
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
  
        noteElement.innerHTML = `
          <div class="note-header">
            <h3 >${note.title}</h3>
            <button class=note-button onclick="deleteNote('${note._id}')">Delete</button>
          </div>
          <div class="note-tags">
            ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div class="note-content">
            <p>${note.content}</p>
          </div>
          <div class="note-footer">
            <button class=note-button note-center onclick="toggleArchive('${note._id}', ${note.archived})">
              ${note.archived ? 'Unarchive' : 'Archive'}
            </button>
            <button class=note-button onclick="changeBackgroundColor('${note._id}', '${note.backgroundColor}')">Change Background</button>
          </div>
        `;
  
        notesSection.appendChild(noteElement);
      });
    }
  
    window.deleteNote = async function (noteId) {
      try {
        const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Note deleted', data);
          loadNotes();
        } else {
          console.error('Error deleting note:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    window.toggleArchive = async function (noteId, archived) {
      try {
        const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ archived: !archived }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Note updated', data);
          loadNotes();
        } else {
          console.error('Error updating note:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    window.changeBackgroundColor = async function (noteId, currentColor) {
      const newColor = prompt('Enter new background color', currentColor);
  
      try {
        const response = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ backgroundColor: newColor }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log('Background color changed', data);
          loadNotes();
        } else {
          console.error('Error changing background color:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  });
  