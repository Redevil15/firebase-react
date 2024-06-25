import React, { useState } from 'react';

const VerifyCode = () => {
  const [code, setCode] = useState('');

  const verifyCode = async () => {
    console.log("Verification code:", code);
    try {
      const confirmationResult = window.confirmationResult;
      const result = await confirmationResult.confirm(code);
      console.log("User authenticated:", result.user);

      // Obtén el ID token del usuario autenticado
      const idToken = await result.user.getIdToken();
      console.log("ID Token:", idToken);

      // Envía el ID token al backend para recibir un JWT personalizado
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('JWT recibido del backend:', data.access_token);
        alert('Código verificado, usuario autenticado!');
        // Guarda el JWT y úsalo para futuras peticiones
        localStorage.setItem('jwt', data.access_token);
      } else {
        console.error('Error al obtener el JWT:', data);
        alert('Error al obtener el JWT');
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
      alert('Error al verificar el código');
    }
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