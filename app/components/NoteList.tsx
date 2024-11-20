'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteNote } from '../store/notesSlice';
import { Note } from '../types/Note';
import styles from './NoteList.module.scss';

interface NoteListProps {
  onEditNote: (note: Note) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ onEditNote }) => {
  const { notes, searchQuery } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.noteList}>
      {filteredNotes.map(note => (
        <div key={note.id} className={styles.noteItem}>
          <h3 className={styles.noteTitle}>{note.title}</h3>
          <p className={styles.noteContent}>{note.content}</p>
          <div className={styles.noteActions}>
            <button
              onClick={() => onEditNote(note)}
              className={styles.editButton}
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteNote(note.id))}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 