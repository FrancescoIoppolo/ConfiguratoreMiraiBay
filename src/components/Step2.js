import React from "react";
import arrowR from "./../assets/arrowR.png";
import arrowL from "./../assets/arrowL.png";

const Step2 = ({
  currentManagerIndex,
  answers,
  handleRangeChange,
  selectedManagers,
  setCurrentStep,
  setCurrentManagerIndex,
}) => {
  const currentManager = selectedManagers[currentManagerIndex];

  const rangeSteps = [0,1,2,3,4,5,6,7,8,9,10];

  return (
    <div>
      {/* Sezione intestazione manager */}
      <div
        className="manager-header"
        style={{ borderColor: currentManager.color }}
      >
        <img
          src={currentManager.images.card}
          alt={currentManager.name}
          className="bannerManager"
        />
      </div>

      <h1>Cos’è importante per te?</h1>
      <p className="subTitle">Vota gli obiettivi di reparto in base alle tue esigenze</p>

      {/* Mappatura delle domande per il manager attuale */}
      {currentManager.questions.map((question, index) => (
        <div
          key={index}
          className="question-container"
          style={{ borderColor: currentManager.color, padding: "20px",}}
        >
          <div className="question-text">{question}</div>
          <div className="range-wrapper">
            
            {/* Numeri sopra la barra */}
            <div className="numberOverRange">
              {rangeSteps.map((step) => (
                <span key={step} style={{ textAlign: "center", width: "20px" }}>
                  {step}
                </span>
              ))}
            </div>

            {/* Barra Range */}
            <input
              className="inputRange"
              type="range"
              min="0"
              max="10"
              step="1"
              value={answers[currentManager.id]?.[question] || 5}
              onChange={(e) =>
                handleRangeChange(currentManager.id, question, e.target.value)
              }
              style={{
                width: "100%",
                accentColor: currentManager.color
                
              }}
            />

          
          </div>
        </div>
      ))}

      {/* Sezione dei pulsanti di navigazione */}
      <div className="navigation-buttons button-container">
        <button onClick={() => setCurrentStep(1)}>
          <img src={arrowL} alt="Freccia sinistra" /> Indietro
        </button>

        {currentManagerIndex < selectedManagers.length - 1 ? (
          <button onClick={() => setCurrentManagerIndex((prev) => prev + 1)}>
            Avanti <img src={arrowR} alt="Freccia destra" />
          </button>
        ) : (
          <button onClick={() => setCurrentStep(3)}>
            Avanti <img src={arrowR} alt="Freccia destra" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Step2;
