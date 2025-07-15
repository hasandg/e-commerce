import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Container, 
  Alert,
  Box,
  Typography
} from '@mui/material';
import Home from './components/Home';
import Header from './components/layout/Header';
import './App.css';
import { AuthContext } from "react-oauth2-code-pkce";

function App() {
  const { token, tokenData } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      console.log("Token available: ", token);
      console.log("Token data: ", tokenData);
    }
  }, [token, tokenData]);

  return (
    <div className="App">
      <Header />     

      {/* Not authenticated message */}
      {!token && (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Alert severity="info">
            Please login to access your account information.
          </Alert>
        </Container>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App; 