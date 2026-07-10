import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from '@lumina/data-access';
createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(AuthProvider, { children: _jsx(App, {}) }) }));
