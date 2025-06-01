import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [snippet, setSnippet] = useState('');
  const [snippets, setSnippets] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track index of snippet being edited
  const [editText, setEditText] = useState('');

  // Load snippets from localStorage on initial render
  useEffect(() => {
    const storedSnippets = JSON.parse(localStorage.getItem('snippets'));
    if (storedSnippets) {
      setSnippets(storedSnippets);
    }
  }, []);

  // Save snippets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('snippets', JSON.stringify(snippets));
  }, [snippets]);

  const handleSave = () => {
    if (snippet.trim() !== '') {
      setSnippets([...snippets, snippet]);
      setSnippet('');
    }
  };

  const handleDelete = (index) => {
    const updatedSnippets = snippets.filter((_, i) => i !== index);
    setSnippets(updatedSnippets);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(snippets[index]);
  };

  const handleUpdate = (index) => {
    const updatedSnippets = [...snippets];
    updatedSnippets[index] = editText;
    setSnippets(updatedSnippets);
    setEditIndex(null);
    setEditText('');
  };

  return (
    <div className="container">
      <h1>SnippetHub</h1>
      <textarea
        value={snippet}
        onChange={(e) => setSnippet(e.target.value)}
        placeholder="Write your snippet here..."
        rows={4}
      ></textarea>
      <br />
      <button onClick={handleSave}>Save Snippet</button>

      <h2>Saved Snippets</h2>
      <ul>
        {snippets.map((s, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={2}
                  style={{ width: '100%' }}
                ></textarea>
                <button onClick={() => handleUpdate(index)}>Update</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                {s}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
