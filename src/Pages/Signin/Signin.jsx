// src/pages/Signin/Signin.js

import React, { useState } from 'react';
import { useAuth } from '../../Auth/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal';
import './Signin.css';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../Components/Loader/Loader';
import SweetAlert from '../../Components/Alerts/SweetAlert';
import AlertToast from '../../Components/Alerts/AlertToast';

export default function Signin() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', username: '', email: '', password: ''
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setFormData({ name: '', username: '', email: '', password: '' });
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    
    const endpoint = isLogin ? '/auth/login' : '/user/register';
    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;
    
    setLoading(true);
    try {
      const res = await axiosInstance.post(endpoint, payload);
      login(res.data.payload.user);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      AlertToast({icon: 'error', title: 'Erro ao autenticar. Verifique suas credenciais.'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {loading && <Loader />}
        
        <h2>{isLogin ? 'Login' : 'Crie sua conta'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text" name="name" placeholder="Nome completo"
                value={formData.name} onChange={handleChange} required
              />
              <input
                type="email" name="email" placeholder="E-mail"
                value={formData.email} onChange={handleChange} required
              />
            </>
          )}
          <input
            type="text" name="username" placeholder="Usuário"
            value={formData.username} onChange={handleChange} required
          />
          <input
            type="password" name="password" placeholder="Senha"
            value={formData.password} onChange={handleChange} required
          />
          <BotaoGlobal cor="primaria" width="100px" height="30px" type="submit" disabled={loading}>
            {isLogin ? 'Entrar' : 'Registrar'}
          </BotaoGlobal>
        </form>
        <p>
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
          <BotaoGlobal
            cor="secundaria" width="100px" height="30px"
            onClick={toggleMode}
            disabled={loading}
          >
            {isLogin ? 'Crie uma' : 'Faça login'}
          </BotaoGlobal>
        </p>
      </div>
    </div>
  );
}