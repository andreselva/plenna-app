import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

export default function usePasswordReset() {
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ userId, password, oldPassword }) => {
    setLoading(true);
    try {
      const { data, status } = await axiosInstance.patch(
        `/management/users/reset-password/${userId}`,
        { password, oldPassword }
      );

      if (status >= 200 && status <= 204) {
        return { ok: true, data };
      }

      return { ok: false, error: 'Falha ao redefinir senha.' };
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || 'Erro ao redefinir senha.';
      return { ok: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { resetLoading: loading, resetPassword };
}
