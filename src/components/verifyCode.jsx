import React, { useState } from 'react';

const VerifyCode = () => {
  const [code, setCode] = useState('');

  const verifyCode = () => {
    console.log("Verification code:", code);
    window.confirmationResult.confirm(code)
      .then((result) => {
        console.log("User authenticated:", result.user);
        alert('Código verificado, usuario autenticado!');
      })
      .catch((error) => {
        console.error('Error al verificar el código:', error);
        alert('Error al verificar el código');
      });
  };

  return (
    <div>
      <h3>Verificar Código</h3>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Código de verificación"
      />
      <button onClick={verifyCode}>Verificar Código</button>
    </div>
  );
};

export default VerifyCode;