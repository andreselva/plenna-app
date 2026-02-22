import './Signin.css';
import React, { useMemo, useState } from 'react';
import { useAuth } from '../../Auth/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../Components/Loader/Loader';
import AlertToast from '../../Components/Alerts/AlertToast';
import SigninImageJPG from '../../assets/icons/signin.jpg';
import { CheckCircle2, LogInIcon, Shield, XCircle } from 'lucide-react';
import { Role } from '../../enum/roles.enum';

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
  const categoryScore = categories * 10; // 0..40
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
    categories,
  };
}

export default function Signin() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const initialState = {
    name: '',
    username: '',
    email: '',
    password: '',
    document: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  };

  const [formData, setFormData] = useState(initialState);
  const { login } = useAuth();
  const navigate = useNavigate();

  const pwdState = useMemo(() => getPasswordState(formData.password), [formData.password]);

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setFormData(initialState);
    setPasswordTouched(false);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (loading) return;

    if (!isLogin && !pwdState.overallOk) {
      setPasswordTouched(true);
      AlertToast({
        icon: 'error',
        title: 'Sua senha ainda não atende aos requisitos.'
      });
      return;
    }

    const endpoint = isLogin ? '/auth/login' : '/management/register-user';

    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;

    setLoading(true);

    try {
      const res = await axiosInstance.post(endpoint, payload);

      if (isLogin) {
        login(res.data.payload.user);

        if (res.data.payload.user.role === Role.SUPER_ADMIN) {
          navigate('/tenants');
        } else {
          navigate('/dashboard');
        }
      } else {
        AlertToast({
          icon: 'success',
          title: 'Conta criada com sucesso! Faça login.'
        });

        setIsLogin(true);
        setFormData(initialState);
      }

    } catch (err) {
      console.error(err);

      const message =
        err?.response?.data?.message ||
        'Erro. Verifique seus dados.';

      AlertToast({
        icon: 'error',
        title: message
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <div className={`auth-box ${!isLogin ? 'register-mode' : ''}`}>
          <h2 className="auth-title">
            {isLogin ? 'Login' : 'Crie sua conta'}
          </h2>

          {loading && <Loader />}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <label htmlFor="name">Nome completo</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="document">CPF</label>
                  <input
                    id="document"
                    type="text"
                    name="document"
                    value={formData.document}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="address">Endereço</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group-row">
                  <div className="input-group">
                    <label htmlFor="number">Número</label>
                    <input
                      id="number"
                      type="text"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="complement">Complemento</label>
                    <input
                      id="complement"
                      type="text"
                      name="complement"
                      value={formData.complement}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="neighborhood">Bairro</label>
                  <input
                    id="neighborhood"
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group-row">
                  <div className="input-group">
                    <label htmlFor="city">Cidade</label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="state">Estado</label>
                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="zipCode">CEP</label>
                    <input
                      id="zipCode"
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="input-group">
              <label htmlFor="username">Usuário</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => setPasswordTouched(true)}
                required
              />
            </div>

            {!isLogin && (passwordTouched || formData.password.length > 0) && (
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

            <BotaoGlobal
              cor="roxo"
              width="100%"
              height="45px"
              type="submit"
              disabled={loading || (!isLogin && !pwdState.overallOk)}
            >
              {isLogin
                ? <div className="log-in">Entrar <LogInIcon className="w-4 h-4" /></div>
                : 'Registrar'}
            </BotaoGlobal>
          </form>

          <div className="toggle-auth">
            <p>{isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}</p>

            <button
              className="toggle-button"
              onClick={toggleMode}
              disabled={loading}
            >
              {isLogin ? 'Crie uma' : 'Faça login'}
            </button>

            {isLogin && (
              <button
                className="toggle-button forgot-link"
                onClick={() => navigate('/forgot-password')}
                disabled={loading}
                type="button"
              >
                Esqueci minha senha
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="image-section">
        <div className="app-name">Plenna</div>
        <img
          src={SigninImageJPG}
          alt="Paisagem com montanhas e um lago alpino"
        />
      </div>
    </div>
  );
}