'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, editNote } from '../store/notesSlice';
import { Note } from '../types/Note';
import styles from './NoteForm.module.scss';

interface NoteFormProps {
  note?: Note;
  onClose: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ note, onClose }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    const noteData: Note = {
      id: note?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: note?.createdAt || Date.now()
    };

    if (note) {
      dispatch(editNote(noteData));
    } else {
      dispatch(addNote(noteData));
    }

    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className={styles.input}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note content"
        className={styles.textarea}
      />
      <div className={styles.buttons}>
        <button type="submit" className={styles.saveButton}>
          {note ? 'Save Changes' : 'Add Note'}
        </button>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
}; 