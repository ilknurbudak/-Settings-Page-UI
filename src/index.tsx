// @ts-nocheck
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SettingsPage from './SettingsPage';

// Make sure we have a root element in the DOM
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <SettingsPage />
  </React.StrictMode>
); 