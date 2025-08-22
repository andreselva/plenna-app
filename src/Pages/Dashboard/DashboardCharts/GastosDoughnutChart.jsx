import { Doughnut } from "react-chartjs-2";

const GastosDoughnutChart = ({ data, options, plugins }) => {
  const labels = data.labels || [];
  const colors = data.datasets?.[0]?.backgroundColor || [];

  return (
    // Um container para o gráfico e a legenda
    <div className="chart-wrapper">
      <div className="chart-container">
        <Doughnut 
          data={data} 
          options={options} 
          plugins={plugins}
        />
      </div>
      
      {/* NOSSA NOVA LEGENDA CUSTOMIZADA */}
      <ul className="custom-legend">
        {labels.map((label, index) => (
          <li key={index} className="legend-item">
            <span 
              className="legend-color-dot" 
              style={{ backgroundColor: colors[index] }}
            ></span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GastosDoughnutChart;
