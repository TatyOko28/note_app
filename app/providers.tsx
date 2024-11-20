'use client';

import { Provider } from 'react-redux';
import { store } from './store/store';
import ClientOnly from './components/ClientOnly';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ClientOnly>{children}</ClientOnly>
    </Provider>
  );
} 