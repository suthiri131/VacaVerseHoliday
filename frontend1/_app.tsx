// App.tsx or App.jsx
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import HomePage from './app/page'; // Import your HomePage component or adjust the import path

export default function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      {/* Your app here... */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* ... Other routes */}
      </Routes>
    </NextUIProvider>
  );
}