import './Signin.css';
import React, { useState } from 'react';
import { useAuth } from '../../Auth/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../Components/Loader/Loader';
import AlertToast from '../../Components/Alerts/AlertToast';
import SigninImageJPG from '../../assets/icons/signin.jpg';
import { LogInIcon } from 'lucide-react';
import { Role } from '../../enum/roles.enum';

export default function Signin() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
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

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setFormData(initialState); 
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    const endpoint = isLogin ? '/auth/login' : '/management/register-user';
    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : formData;
    
    setLoading(true);
    try {
      const res = await axiosInstance.post(endpoint, payload);
      login(res.data.payload.user);
      if (res.data.payload.user.role === Role.SUPER_ADMIN) {
        navigate('/tenants');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      AlertToast({icon: 'error', title: 'Erro. Verifique seus dados.'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <div className={`auth-box ${!isLogin ? 'register-mode' : ''}`}>
        <h2 className="auth-title">{isLogin ? 'Login' : 'Crie sua conta'}</h2>
          {loading && <Loader />}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <label htmlFor="name">Nome completo</label>
                  <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="document">CPF</label>
                  <input id="document" type="text" name="document" value={formData.document} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label htmlFor="address">Endereço</label>
                  <input id="address" type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="input-group-row">
                  <div className="input-group">
                    <label htmlFor="number">Número</label>
                    <input id="number" type="text" name="number" value={formData.number} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="complement">Complemento</label>
                    <input id="complement" type="text" name="complement" value={formData.complement} onChange={handleChange} />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="neighborhood">Bairro</label>
                  <input id="neighborhood" type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
                </div>
                <div className="input-group-row">
                  <div className="input-group">
                    <label htmlFor="city">Cidade</label>
                    <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label htmlFor="state">Estado</label>
                    <input id="state" type="text" name="state" value={formData.state} onChange={handleChange} required />
                  </div>
                  <div className="input-group">
                    <label htmlFor='zipCode'>CEP</label>
                    <input id='zipCode' type='text' name='zipCode' value={formData.zipCode} onChange={handleChange} required />
                  </div>
                </div>
              </>
            )}

            <div className="input-group">
              <label htmlFor="username">Usuário</label>
              <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            
            <BotaoGlobal cor="roxo" width="100%" height="45px" type="submit" disabled={loading}>
              {isLogin ? <div className='log-in'>Entrar <LogInIcon className="w-4 h-4" /> </div> : 'Registrar'}
            </BotaoGlobal>
          </form>
          
          <div className="toggle-auth">
            <p>{isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}</p>
            <button className="toggle-button" onClick={toggleMode} disabled={loading}>
              {isLogin ? 'Crie uma' : 'Faça login'}
            </button>
          </div>
        </div>
      </div>

      <div className="image-section">
        <div className="app-name">
          Plenna
        </div>
        <img src={SigninImageJPG} alt="Paisagem com montanhas e um lago alpino" />
      </div>

    </div>
  );
}