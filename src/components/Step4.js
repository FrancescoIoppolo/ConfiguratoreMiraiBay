import React, { useState } from "react";
import arrowR from "./../assets/arrowR.png";
import arrowL from "./../assets/arrowL.png";
import iconSrc from "./../assets/icon.png";
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    PolarRadiusAxis,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";

const Step4 = ({ selectedManagers, setCurrentStep, prepareChartData, answers, workModes, selectedWorkMode, setCurrentManagerIndex, resetSelection}) => {

  const [hoveredManager, setHoveredManager] = useState(null);


  return (
    <div className="step4-container">
      <h1 className="h1Config">La tua Priority Matrix</h1>
      <p className="subTitle">Ecco il risultato delle tue scelte</p>

      <div className="summary-container">
        {/* Radar Chart */}
        <div className="chart-container">
          <ResponsiveContainer height={650}>
            <RadarChart cx="50%" cy="50%" outerRadius="50%" data={prepareChartData(selectedManagers, answers)}>
              <PolarGrid radialLines={false} stroke="white" strokeWidth={2} />

              <PolarAngleAxis
                dataKey="question"
                tick={({ payload, x, y, cx, cy }) => {
                  const radius = 80;
                  const angle = Math.atan2(y - cy, x - cx);
                  const newX = x + Math.cos(angle) * radius + 25;
                  const newY = y + Math.sin(angle) * radius;

                  const iconSize = 20;
                  const textOffset = 50;

                  // Funzione per dividere il testo in più righe
                  const splitText = (text, maxCharsPerLine = 12) => {
                    const words = text.split(" ");
                    const lines = [];
                    let currentLine = "";

                    words.forEach((word) => {
                      if ((currentLine + word).length > maxCharsPerLine) {
                        lines.push(currentLine.trim());
                        currentLine = word + " ";
                      } else {
                        currentLine += word + " ";
                      }
                    });

                    if (currentLine.trim()) {
                      lines.push(currentLine.trim());
                    }

                    return lines;
                  };

                  const lines = splitText(payload.value, 10);

                  return (
                    <>
                      {/* Icona PNG accanto al testo */}
                      <image
                        href={iconSrc}
                        x={newX - textOffset - iconSize - 8}
                        y={newY - iconSize / 3}
                        width={iconSize}
                        height={iconSize}
                      />
                      {/* Testo con spaziatura */}
                      <text className="label" x={newX} y={newY} textAnchor="start">
                        {lines.map((line, index) => (
                          <tspan key={index} x={newX - textOffset} dy={index === 0 ? "0" : "1.5em"}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </>
                  );
                }}
              />

              {selectedManagers.map((manager) => {
                const isHovered = hoveredManager === manager.id;
                
                return (
                  <Radar
                    key={manager.id}
                    name={manager.name}
                    dataKey={manager.id}
                    stroke={manager.color}
                    fill={manager.color}
                    fillOpacity={isHovered ? 0.9 : 0.5}    // Se hover, più opaco
                    animationDuration={1000}
                  />
                );
              })}



              <PolarRadiusAxis
                angle={0}
                domain={[0, 10]}
                stroke="#D3D3D3"
                strokeWidth={1}
                tickCount={6}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <text
                      x={x}
                      y={y - 5}
                      fill="#D3D3D3"
                      fontSize={14}
                      fontWeight="bold"
                      textAnchor="top"
                      transform={`rotate(0, ${x}, ${y})`}
                    >
                      {payload.value}
                    </text>
                  );
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>


        <div className="chart-container-bar bar-chart">
        <ResponsiveContainer > 
          {selectedManagers.map((manager, index) => {
            // Filtra solo le domande di questo manager
            const managerData = prepareChartData(selectedManagers, answers)
  .map((item) => ({
    question: item.question,
    value: item[manager.id] || 0, // Assicura che prenda solo il valore del manager
  }))
  .filter((item) => manager.questions.includes(item.question));

            return (
              <div key={manager.id} className="manager-chart-block">
                {/* Nome del manager sopra il suo blocco */}
                <img className="managerCardGrafico" src={manager.images.card} alt={manager.role} />
                <BarChart
                className="no-hover"
                  data={managerData}
                  layout="vertical"
                  width={350}
                  height={managerData.length * 70} // Aumenta la spaziatura tra le domande
                >
                  {/* Asse X per i valori */}
                  <XAxis 
                      type="number" 
                      domain={[0, 10]} 
                      stroke="white" 
                      tick={{ fontSize: "10px" }} 
                      tickCount={11}
                      />

                  {/* Asse Y per le domande con massimo una riga di interruzione */}
                  <YAxis
                    dataKey="question"
                    type="category"
                    width={150}
                    stroke="white"
                    tick={(props) => {
                      const { x, y, payload } = props;

                      // Funzione per spezzare il testo su massimo due righe
                      const splitText = (text, maxCharsPerLine = 20) => {
                        if (text.length <= maxCharsPerLine) return [text];

                        const index = text.lastIndexOf(" ", maxCharsPerLine);
                        if (index === -1) return [text]; // Se non c'è spazio, restituisce tutto il testo su una riga
                        
                        return [text.slice(0, index), text.slice(index + 1)];
                      };

                      const lines = splitText(payload.value);

                      return (
                        <text x={x} y={y} fill="white" fontSize="14" textAnchor="end">
                          {lines.map((line, index) => (
                            <tspan key={index} x={x} dy={index === 0 ? "0" : "1.5em"}>
                              {line}
                            </tspan>
                          ))}
                        </text>
                      );
                    }}
                  />


                  {/* Barre colorate in base al manager */}
          
                  <Bar
                      dataKey="value"
                      barSize={20}
                      shape={(props) => {
                          const { x, y, width, height, payload } = props;
                          const offset = 10;

                          return (
                          <rect 
                              x={x + offset} 
                              y={y} 
                              width={width} 
                              height={height} 
                              fill={manager.color} 
                              rx="5" ry="5" 
                              pointerEvents="none" 
                          />
                          );
                      }}
                      />

                </BarChart>

                {/* Spazio extra tra un manager e l'altro */}
                {index < selectedManagers.length - 1 && <div className="manager-separator"></div>}
              </div>
            );
          })}
        </ResponsiveContainer>
      </div>

        {/* Box laterale con le info selezionate */}
        <div className="summary-sidebar">
          <h3>I tuoi manager di reparto scelti</h3>
          {selectedManagers.map((manager) => (
            <div
              key={manager.id}
              className="manager-banner"
              onMouseEnter={() => setHoveredManager(manager.id)}
              onMouseLeave={() => setHoveredManager(null)}
            >
              <img src={manager.images.card} alt={manager.name} />
            </div>
          ))}


        <div className="summaryWork">
        <h3 className="modalitaLavoro">Modalità di lavoro</h3>
        <div className="work-modes-grid">
          <div className="work-mode-card-risultati">
            {workModes.find((mode) => mode.id === selectedWorkMode) && (
              <div className="modeTitle">
                <div className="modeCerchio">
                  <img
                    src={workModes.find((mode) => mode.id === selectedWorkMode)?.icon}
                    alt={workModes.find((mode) => mode.id === selectedWorkMode)?.title}
                  />
                </div>
                {workModes.find((mode) => mode.id === selectedWorkMode)?.title}
              </div>
            )}
          </div>
        </div>
      </div>

        </div>
      </div>

    
      

      {/* Pulsanti di navigazione */}
      <div className="navigation-buttons button-container">
        <button
          onClick={() => {
            setCurrentStep(3);
            setCurrentManagerIndex(0);
          }}
        >
          <img src={arrowL} alt="Freccia left" /> Indietro
        </button>
        <button onClick={resetSelection}>Reset</button>
        <button onClick={() => setCurrentStep(5)}>
          Avanti <img src={arrowR} alt="Freccia right" />
        </button>
      </div>
    </div>
  );
};

export default Step4;
