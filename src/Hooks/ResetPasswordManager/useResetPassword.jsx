import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

export default function useResetPassword() {
  const [loading, setLoading] = useState(false);

  /**
   * Solicita envio do link de redefinição
   */
  const requestReset = async (email) => {
    if (!email) return false;

    setLoading(true);
    try {
      await axiosInstance.post('/reset-password/request', {
        email: email.trim().toLowerCase(),
      });

      return true;
    } catch (error) {
      console.error('Erro ao solicitar redefinição:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Envia nova senha com token
   */
  const resetPassword = async (token, newPassword) => {
    if (!token || !newPassword) return false;

    setLoading(true);
    try {
      await axiosInstance.post('/reset-password/reset', {
        token,
        newPassword,
      });

      return true;
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    requestReset,
    resetPassword,
  };
}