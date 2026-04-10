import { useEffect, useMemo, useState } from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import styles from './Appointments.module.css';
import useAppointmentsManager from '../../Hooks/AppointmentsManager/useAppointmentsManager';
import AlertConfirm from '../../Components/Alerts/AlertConfirm';
import AlertToast from '../../Components/Alerts/AlertToast';
import { Recurrence } from '../../enum/recurrence.enum';
import Loader from '../../Components/Loader/Loader';
import useHasModule from '../../Hooks/useHasModule/useHasModule';
import { Module } from '../../enum/module.enum';

const RECURRENCE_OPTIONS = [
  { value: Recurrence.EVERY_15_MIN, label: 'A cada 15 minutos' },
  { value: Recurrence.HOURLY, label: 'De hora em hora' },
  { value: Recurrence.DAILY_08, label: 'Diariamente às 08:00' },
  { value: Recurrence.WEEKDAYS_08, label: 'Dias úteis às 08:00' },
  { value: Recurrence.WEEKLY_MON_09, label: 'Semanal (seg) às 09:00' },
];


const tz =
  (Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone) ||
  'UTC';

const Appointments = () => {
  const { hasModule: hasBilling } = useHasModule(Module.BILLING);
  const {
    appointments,
    loading,
    activateAppointment,
    updateAppointmentRecurrence,
  } = useAppointmentsManager();

  const initialRecurrence = useMemo(() => {
    return Object.fromEntries(
      (appointments ?? []).map((a) => [
        a.id,
        (a.recurrence) || Recurrence.WEEKLY_MON_09,
      ]),
    );
  }, [appointments]);

  const [recurrence, setRecurrence] = useState({});

  useEffect(() => {
    setRecurrence(initialRecurrence);
  }, [initialRecurrence]);

  const getCurrentRec = (appointmentId) =>
    (recurrence?.[appointmentId]) ??
    Recurrence.WEEKLY_MON_09;

  const toggleEnabled = async (appointment) => {
    const willEnable = !Boolean(appointment.isActive);
    const actionText = willEnable ? 'Habilitar' : 'Desabilitar';

    const result = await AlertConfirm({
      title: `${actionText} agendamento`,
      text: `Você deseja ${actionText.toLowerCase()} este agendamento?`,
      confirmButtonText: `Sim, ${actionText.toLowerCase()}!`,
      cancelButtonText: `Não ${actionText.toLowerCase()}`,
    });

    if (!result.isConfirmed) return;

    const rec = getCurrentRec(appointment.id);

    const ok = await activateAppointment({
      id: appointment.id,
      isActive: willEnable,
      recurrence: rec,
      tz,
    });

    if (ok) {
      AlertToast({
        icon: 'success',
        title: `Agendamento ${
          willEnable ? 'habilitado' : 'desabilitado'
        }!`,
      });
    }
  };

  const onChangeRecurrence = async (
    appointment,
    value,
  ) => {
    const rec = value;
    setRecurrence((prev) => ({ ...prev, [appointment.id]: rec }));

    if (appointment.isActive) {
      const resultConfirm = await AlertConfirm({
        title: 'Alterar recorrência',
        text: 'Deseja realmente alterar a recorrência do agendamento?',
        confirmButtonText: 'Sim, alterar',
        cancelButtonText: 'Não alterar',
      });

      if (!resultConfirm.isConfirmed) return;

      const ok = await updateAppointmentRecurrence({
        id: appointment.id,
        recurrence: rec,
        tz,
      });
      if (ok) {
        AlertToast({
          icon: 'success',
          title: 'Recorrência atualizada!',
        });
      }
    }
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <span className={globalStyles['title-items-span']}>
                Agendamentos
              </span>
            </div>
          </div>
        </div>

        <div className={globalStyles['card-appointments']}>
          {loading && (
            <Loader />
          )}
          <div className={styles.AppointmentsGrid}>
            {(appointments ?? []).map((appointment) => {
              if (appointment.name === 'Expiração de cobranças' && !hasBilling) return;
              const isEnabled = Boolean(appointment.isActive);
              const currentRec = getCurrentRec(appointment.id);

              return (
                <div
                  key={appointment.id}
                  className={styles.appointmentsCardWrapper}
                >
                  <button
                    type="button"
                    className={styles.appointmentCard}
                    onClick={() => toggleEnabled(appointment)}
                    aria-pressed={isEnabled}
                  >
                    <div className={styles.cardInfo}>
                      <h3>{appointment.name}</h3>
                      {appointment.description && (
                        <p className={styles.description}>
                          {appointment.description}
                        </p>
                      )}

                      <div className={styles.controlsRow}>
                        <div
                          className={styles.statusChip}
                          data-active={isEnabled}
                        >
                          {isEnabled ? 'Ativo' : 'Inativo'}
                        </div>

                        <label className={styles.recurrenceGroup}>
                          <span className={styles.recurrenceLabel}>
                            Recorrência:
                          </span>
                          <select
                            className={styles.recurrenceSelect}
                            value={currentRec}
                            onChange={(e) =>
                              onChangeRecurrence(
                                appointment,
                                e.target.value,
                              )
                            }
                            onClick={(e) => e.stopPropagation()}
                          >
                            {RECURRENCE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label
                          className={styles.toggle}
                          onClick={(e) => e.stopPropagation()}
                          title={isEnabled ? 'Desativar' : 'Ativar'}
                        >
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={() => toggleEnabled(appointment)}
                          />
                          <span className={styles.slider} />
                        </label>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
