import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <h1>Oi Mundo</h1>
  );
}

createRoot(document.querySelector('.root')).render(<App />);