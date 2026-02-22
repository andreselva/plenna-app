import './ResetPassword.css';
import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal';
import Loader from '../../Components/Loader/Loader';
import AlertToast from '../../Components/Alerts/AlertToast';
import SigninImageJPG from '../../assets/icons/signin.jpg';
import useResetPassword from '../../Hooks/ResetPasswordManager/useResetPassword';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const query = useQuery();

  const token = query.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [done, setDone] = useState(false);
  const {loading, resetPassword } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || token.trim().length < 20) {
      AlertToast({ icon: 'error', title: 'Link inválido. Solicite uma nova redefinição.' });
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      AlertToast({ icon: 'error', title: 'A senha deve ter pelo menos 8 caracteres.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      AlertToast({ icon: 'error', title: 'As senhas não conferem.' });
      return;
    }

    try {
      const success = await resetPassword(token, newPassword);

      if (success) {
        setDone(true);
        AlertToast({
          icon: 'success',
          title: 'Senha alterada com sucesso.'
        });
      } else {
        AlertToast({
          icon: 'error',
          title: 'Token inválido ou expirado.'
        });
      }
      AlertToast({ icon: 'success', title: 'Senha alterada com sucesso.' });
    } catch (err) {
      console.error(err);
      AlertToast({ icon: 'error', title: 'Token inválido ou expirado. Solicite um novo link.' });
    } 
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <div className="auth-box">
          <h2 className="auth-title">Criar nova senha</h2>
          <p className="auth-subtitle">
            Digite uma nova senha para sua conta.
          </p>

          {loading && <Loader />}

          {!token ? (
            <>
              <div className="info-box">
                <strong>Link inválido.</strong>
                <div style={{ marginTop: '8px' }}>
                  Volte e solicite um novo link de redefinição.
                </div>
              </div>

              <div className="helper-row" style={{ marginTop: '18px' }}>
                <button className="link-button" type="button" onClick={() => navigate('/forgot-password')}>
                  Solicitar novo link
                </button>
                <button className="link-button" type="button" onClick={() => navigate('/login')}>
                  Ir para o login
                </button>
              </div>
            </>
          ) : done ? (
            <>
              <div className="info-box">
                <strong>Senha atualizada.</strong>
                <div style={{ marginTop: '8px' }}>
                  Agora você pode fazer login com sua nova senha.
                </div>
              </div>

              <div className="helper-row" style={{ marginTop: '18px' }}>
                <button className="link-button" type="button" onClick={() => navigate('/login')}>
                  Ir para o login
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="newPassword">Nova senha</label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Confirmar nova senha</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <BotaoGlobal cor="roxo" width="100%" height="45px">
                Alterar senha
              </BotaoGlobal>

              <div className="helper-row">
                <button
                  className="link-button"
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  disabled={loading}
                >
                  Solicitar novo link
                </button>
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