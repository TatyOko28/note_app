'use client';

import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';

let storeInstance: ReturnType<typeof initializeStore>;

function initializeStore() {
  // Function to get initial state from localStorage
  const loadState = () => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    try {
      const serializedState = localStorage.getItem('notes');
      if (serializedState === null) {
        return undefined;
      }
      return {
        notes: {
          notes: JSON.parse(serializedState),
          searchQuery: ''
        }
      };
    } catch (err) {
      return undefined;
    }
  };

  const store = configureStore({
    reducer: {
      notes: notesReducer
    },
    preloadedState: loadState()
  });

  // Save state to localStorage whenever store changes
  if (typeof window !== 'undefined') {
    store.subscribe(() => {
      try {
        const state = store.getState();
        localStorage.setItem('notes', JSON.stringify(state.notes.notes));
      } catch (err) {
        console.log('Error saving state:', err);
      }
    });
  }

  return store;
}

export function getStore() {
  if (typeof window === 'undefined') {
    return initializeStore();
  }

  if (!storeInstance) {
    storeInstance = initializeStore();
  }

  return storeInstance;
}

export const store = getStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 