import './ForgotPassword.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal';
import Loader from '../../Components/Loader/Loader';
import AlertToast from '../../Components/Alerts/AlertToast';
import SigninImageJPG from '../../assets/icons/signin.jpg';
import useResetPassword from '../../Hooks/ResetPasswordManager/useResetPassword';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { loading, requestReset } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email?.trim()) {
      AlertToast({ icon: 'error', title: 'Informe seu e-mail.' });
      return;
    }

    try {
        const success = await requestReset(email);

        if (success) {
            setSent(true);
            AlertToast({
            icon: 'success',
            title: 'Se o e-mail estiver cadastrado, enviaremos as instruções.'
            });
        } else {
            AlertToast({
            icon: 'error',
            title: 'Não foi possível enviar agora.'
            });
        }
    } catch (err) {
      console.error(err);
      AlertToast({ icon: 'error', title: 'Não foi possível enviar agora. Tente novamente.' });
    } 
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <div className="auth-box">
          <h2 className="auth-title">Redefinir senha</h2>
          <p className="auth-subtitle">
            Informe seu e-mail e enviaremos um link para você criar uma nova senha.
          </p>

          {loading && <Loader />}

          {!sent ? (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <BotaoGlobal cor="roxo" width="100%" height="45px">
                Enviar link
              </BotaoGlobal>

              <div className="helper-row">
                <button
                  className="link-button"
                  type="button"
                  onClick={() => navigate('/login')}
                  disabled={loading}
                >
                  Voltar para o login
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="info-box">
                <strong>Pronto.</strong>
                <div style={{ marginTop: '8px' }}>
                  Se este e-mail estiver cadastrado, você receberá uma mensagem com o link de redefinição.
                </div>
                <div style={{ marginTop: '8px' }}>
                  Verifique também a caixa de spam.
                </div>
              </div>

              <div className="helper-row" style={{ marginTop: '18px' }}>
                <button
                  className="link-button"
                  type="button"
                  onClick={() => setSent(false)}
                  disabled={loading}
                >
                  Enviar novamente
                </button>

                <button
                  className="link-button"
                  type="button"
                  onClick={() => navigate('/login')}
                  disabled={loading}
                >
                  Ir para o login
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="image-section">
        <div className="app-name">Plenna</div>
        <img src={SigninImageJPG} alt="Paisagem com montanhas e um lago alpino" />
      </div>
    </div>
  );
}