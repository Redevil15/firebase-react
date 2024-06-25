// src/components/SendCode.jsx
import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const SendCode = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('reCAPTCHA solved', response);
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log('reCAPTCHA expired');
        }
      });

      // Render the reCAPTCHA
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
    }
    console.log('RecaptchaVerifier initialized:', window.recaptchaVerifier);
  }, []);

  const formatPhoneNumber = (number) => {
    // Add country code if not present
    if (!number.startsWith("+52")) {
      number = "+52" + number;
    }
    return number;
  };

  const sendVerificationCode = () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    console.log("Formatted phone number:", formattedPhoneNumber);

    signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("Confirmation result:", confirmationResult);
        alert('Código de verificación enviado!');
      }).catch((error) => {
        console.error('Error enviando el código de verificación:', error);
        alert('Error enviando el código de verificación');
        // Reset the reCAPTCHA
        window.recaptchaVerifier.render().then((widgetId) => {
          grecaptcha.reset(widgetId);
        });
      });
  };

  return (
    <div>
      <h3>Enviar Código de Verificación</h3>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Número de teléfono"
      />
      <button id="sign-in-button" onClick={sendVerificationCode}>Enviar Código</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SendCode;