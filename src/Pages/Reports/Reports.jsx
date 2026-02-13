import { Link } from 'react-router-dom';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { useEffect, useRef, useState } from 'react';
import Loader from '../../Components/Loader/Loader';
import axiosInstance from '../../api/axiosInstance';

const getErrorMessage = (err) => {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.message) return err.message;
  return 'Erro ao buscar os relatórios.';
};

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchReportDataModule = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      setLoading(true);
      try {
        const { data: response, status } = await axiosInstance.get('/client-modules');

        if (response && status >= 200 && status <= 204) {
          const groups = response?.payload?.modules?.layouts?.reports ?? [];
          setReportData(groups);
          return;
        }

        throw new Error('Erro ao buscar os relatórios.');
      } catch (err) {
        const msg = getErrorMessage(err);
        console.error(err);
        AlertToast?.({ icon: 'error', title: msg });
      } finally {
        setLoading(false);
      }
    };

    fetchReportDataModule();
  }, []);

  return (
    <div className={globalStyles.container}>
      {loading && <Loader />}

      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <span className={globalStyles['title-items-span']}>Relatórios</span>
            </div>
          </div>
        </div>

        <div className={globalStyles['card-reports']}>
          <div className={globalStyles.row}>
            {reportData.map((group) => (
              <div key={group.title} className={globalStyles['card-r']}>
                <div className={globalStyles['card-r-title']}>
                  <span className={globalStyles['title-items-span-middle']}>
                    {group.title}
                  </span>
                </div>

                <div className={globalStyles['card-r-content']}>
                  <ul>
                    {(group.items ?? []).map((item) => {
                      const label = (item.displayName || '').trim() || item.name;

                      return (
                        <li key={item.key}>
                          {item.route ? (
                            <Link to={item.route} className={globalStyles['clickableItem']}>
                              {label}
                            </Link>
                          ) : (
                            <span title="Sem rota configurada">{label}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reports;
