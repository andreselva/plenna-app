import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';
import { Recurrence } from '../../enum/recurrence.enum';

const endpoint = '/appointments';

// mapeia o enum para o config aceito pelo backend (BullMQ v2)
function buildConfig(recurrence, tz) {
  const timeZone = tz || 'UTC';

  switch (recurrence) {
    case Recurrence.EVERY_15_MIN:
      return {
        // repeat.every → 15 min
        every: 15 * 60 * 1000,
        days: 0, // compat opcional
        tz: timeZone,
      };
    case Recurrence.HOURLY:
      return {
        // repeat.every → 1 hora
        every: 60 * 60 * 1000,
        days: 0,
        tz: timeZone,
      };
    case Recurrence.DAILY_08:
      return {
        // todo dia às 08:00
        pattern: '0 8 * * *',
        tz: timeZone,
        days: 1, // compat opcional
      };
    case Recurrence.WEEKDAYS_08:
      return {
        // seg–sex às 08:00
        pattern: '0 8 * * 1-5',
        tz: timeZone,
        days: 1,
      };
    case Recurrence.WEEKLY_MON_09:
    default:
      return {
        // seg 09:00
        pattern: '0 9 * * 1',
        tz: timeZone,
        days: 7,
      };
  }
}

const useAppointmentsManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.get(endpoint);
      if (response && status >= 200 && status <= 204) {
        setAppointments(response.payload?.appointments);
        return true;
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || 'Erro ao buscar agendamentos';
      AlertToast({ icon: 'error', title: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const activateAppointment = async ({ id, isActive, recurrence, tz }) => {
    setLoading(true);
    try {
      const payload = {
        isActive,
        config: buildConfig(recurrence, tz),
      };

      const { data: response, status } = await axiosInstance.put(
        `${endpoint}/${id}/status`,
        payload,
      );

      if (response && status >= 200 && status <= 204) {
        setAppointments((prev) =>
          prev.map((a) =>
            a.id === id ? { ...a, isActive, recurrence } : a,
          ),
        );
        return true;
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || 'Erro ao atualizar agendamento';
      AlertToast({ icon: 'error', title: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentRecurrence = async ({ id, recurrence, tz }) => {
    setLoading(true);
    try {
      const current = appointments.find((a) => a.id === id);
      const isActive = Boolean(current?.isActive);

      const payload = {
        isActive,
        config: buildConfig(recurrence, tz),
      };

      const { data: response, status } = await axiosInstance.put(
        `${endpoint}/${id}/status`,
        payload,
      );

      if (response && status >= 200 && status <= 204) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, recurrence } : a)),
        );
        return true;
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || 'Erro ao alterar recorrência';
      AlertToast({ icon: 'error', title: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    activateAppointment,
    updateAppointmentRecurrence,
  };
};

export default useAppointmentsManager;
