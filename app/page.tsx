'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { setSearchQuery } from './store/notesSlice';
import { Note } from './types/Note';
import styles from './page.module.scss';
import ClientOnly from './components/ClientOnly';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const dispatch = useDispatch();

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedNote(undefined);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Notes App</h1>
        <div className={styles.actions}>
          <input
            type="text"
            placeholder="Search notes..."
            className={styles.searchInput}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          <button
            onClick={() => setIsFormOpen(true)}
            className={styles.addButton}
          >
            Add Note
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <ClientOnly>
          {isFormOpen && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <NoteForm note={selectedNote} onClose={handleCloseForm} />
              </div>
            </div>
          )}
          <NoteList onEditNote={handleEditNote} />
        </ClientOnly>
      </main>
    </div>
  );
}
