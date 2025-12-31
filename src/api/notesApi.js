const API_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchNotesFromAPI() {
  try {
    const response = await fetch(`${API_URL}/posts?_limit=5`);
    const data = await response.json();
    
    return data.map((post, index) => ({
      id: post.id.toString(),
      title: post.title.substring(0, 30),
      description: post.body,
      imageUri: null,
      createdAt: new Date(Date.now() - index * 86400000).toISOString(),
    }));
  } catch (error) {
    console.log('Błąd pobierania z API:', error);
    return getMockNotes();
  }
}

export async function saveNoteToAPI(note) {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: note.title,
        body: note.description,
        userId: 1,
      }),
    });
    const data = await response.json();
    console.log('Zapisano do API:', data);
    return data;
  } catch (error) {
    console.log('Błąd zapisu do API:', error);
    return note;
  }
}

function getMockNotes() {
  return [
    {
      id: '1',
      title: 'Wycieczka w góry',
      description: 'Piękny widok na szczycie. Pogoda była idealna do zdjęć.',
      imageUri: null,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Spotkanie z przyjaciółmi',
      description: 'Świetny wieczór w nowej restauracji w centrum miasta.',
      imageUri: null,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
}

