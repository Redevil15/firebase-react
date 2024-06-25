// src/App.js
import React from 'react';
import SendCode from './components/sendCode';
import VerifyCode from './components/verifyCode';

const App = () => {
  return (
    <div>
      <h1>Autenticación con Teléfono usando Firebase</h1>
      <SendCode />
      <VerifyCode />
    </div>
  );
};

export default App;