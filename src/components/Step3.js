import React from "react";
import arrowR from "./../assets/arrowR.png";
import arrowL from "./../assets/arrowL.png";
import { workModes } from "./../teams";

const Step2 = ({
  setCurrentStep,
  setCurrentManagerIndex,
  selectedWorkMode,
  setSelectedWorkMode,
}) => {
  
  // Funzione per selezionare/deselezionare la modalità di lavoro 
  const toggleWorkModeSelection = (modeId) => {
    setSelectedWorkMode((prevMode) => (prevMode === modeId ? null : modeId));
  };

  return (
    <div>
      <h1 className="h1Config">Quale modalità di lavoro preferisci?</h1>
      <p className="subTitle">Come vuoi che lavoriamo per te?</p>

      {/* Sezione delle modalità di lavoro */}
      <div className="work-modes-grid">
        {workModes.map((mode) => (
          <div
            key={mode.id}
            className={`work-mode-card ${selectedWorkMode === mode.id ? "selected" : ""}`}
            onClick={() => toggleWorkModeSelection(mode.id)}
          >
            <div className="mode-header"></div>
            <div className="modeCerchio"><img src={mode.icon} alt={mode.title} /></div>
            <h3 className="modeTitle">{mode.title}</h3>
            <p className="modeDescription">{mode.description}</p>
          </div>
        ))}
      </div>

      {/* Sezione dei pulsanti di navigazione */}
      <div className="navigation-buttons button-container">
        <button
          onClick={() => {
            setCurrentStep(2);
            setCurrentManagerIndex(0);
          }}
        >
          <img src={arrowL} alt="Freccia sinistra" /> Indietro
        </button>

        {selectedWorkMode && (
          <button onClick={() => setCurrentStep(4)}>
            Avanti <img src={arrowR} alt="Freccia destra" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Step2;
