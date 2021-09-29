import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from './context/theme';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Layout } from './Layout';
import { AuthProvider } from './context/auth';


function App() {
  return (
    <AuthProvider>
      <Router>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </Router>
    </AuthProvider >
  );
}

export default App;
