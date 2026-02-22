import './ResetPassword.css';
import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal';
import Loader from '../../Components/Loader/Loader';
import AlertToast from '../../Components/Alerts/AlertToast';
import SigninImageJPG from '../../assets/icons/signin.jpg';
import useResetPassword from '../../Hooks/ResetPasswordManager/useResetPassword';
import { CheckCircle2, Shield, XCircle } from 'lucide-react';

function getPasswordState(password) {
  const pwd = (password ?? '').normalize?.('NFKC') ?? String(password ?? '');
  const len = pwd.length;
  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasDigit = /\d/.test(pwd);
  const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
  const categories = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;
  const minLenOk = len >= 8;
  const longPassphrase = len >= 16;
  const complexityOk = longPassphrase ? true : categories >= 3;
  const lengthScore = Math.min(60, Math.round((Math.min(len, 24) / 24) * 60));
  const categoryScore = categories * 10;
  const bonus = longPassphrase ? 10 : 0;
  const score = Math.min(100, lengthScore + categoryScore + bonus);
  const label = score >= 80 ? 'Forte' : score >= 55 ? 'Boa' : score >= 35 ? 'Ok' : 'Fraca';
  const overallOk = minLenOk && complexityOk && len <= 128;

  return {
    len,
    score,
    label,
    overallOk,
    minLenOk,
    longPassphrase,
    complexityOk,
    hasLower,
    hasUpper,
    hasDigit,
    hasSymbol,
  };
}

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
  const [passwordTouched, setPasswordTouched] = useState(false);
  const {loading, resetPassword } = useResetPassword();

  const pwdState = useMemo(() => getPasswordState(newPassword), [newPassword]);
  const confirmOk = newPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || token.trim().length < 20) {
      AlertToast({ icon: 'error', title: 'Link inválido. Solicite uma nova redefinição.' });
      return;
    }

    if (!pwdState.overallOk) {
      setPasswordTouched(true);
      AlertToast({ icon: 'error', title: 'Sua senha ainda não atende aos requisitos.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      AlertToast({ icon: 'error', title: 'As senhas não conferem.' });
      return;
    }
    const ok = await resetPassword(token, newPassword);
    if (ok !== false) setDone(true);
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
                  onBlur={() => setPasswordTouched(true)}
                  required
                />
              </div>

              {(passwordTouched || newPassword.length > 0) && (
                <div className="pwd-card" aria-live="polite">
                  <div className="pwd-header">
                    <div className="pwd-title">
                      <Shield className="pwd-icon" />
                      Força da senha: <strong>{pwdState.label}</strong>
                    </div>
                    <div className="pwd-meta">{pwdState.len} caracteres</div>
                  </div>

                  <div
                    className="pwd-meter"
                    role="progressbar"
                    aria-valuenow={pwdState.score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="pwd-meter-bar" style={{ width: `${pwdState.score}%` }} />
                  </div>

                  <ul className="pwd-rules">
                    <li className={pwdState.minLenOk ? 'ok' : 'bad'}>
                      {pwdState.minLenOk ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      Pelo menos <strong>8</strong> caracteres
                    </li>
                    <li className={pwdState.complexityOk ? 'ok' : 'bad'}>
                      {pwdState.complexityOk ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      Ter <strong>3 de 4</strong> (minúscula, maiúscula, número, símbolo)
                      <span className="pwd-hint"> — ou <strong>16+</strong> caracteres</span>
                    </li>
                    <li className={pwdState.hasLower ? 'ok' : 'neutral'}>
                      {pwdState.hasLower ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      Minúscula (a-z)
                    </li>
                    <li className={pwdState.hasUpper ? 'ok' : 'neutral'}>
                      {pwdState.hasUpper ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      Maiúscula (A-Z)
                    </li>
                    <li className={pwdState.hasDigit ? 'ok' : 'neutral'}>
                      {pwdState.hasDigit ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      Número (0-9)
                    </li>
                    <li className={pwdState.hasSymbol ? 'ok' : 'neutral'}>
                      {pwdState.hasSymbol ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      Símbolo / espaço
                    </li>
                  </ul>
                </div>
              )}

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
                {confirmPassword.length > 0 && !confirmOk && (
                  <div className="field-hint bad">As senhas não conferem.</div>
                )}
                {confirmOk && (
                  <div className="field-hint ok">Senhas conferem ✅</div>
                )}
              </div>

              <BotaoGlobal
                cor="roxo"
                width="100%"
                height="45px"
                disabled={loading || !pwdState.overallOk || !confirmOk}
              >
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