import React, { useState } from "react";
import arrowR from "./../assets/arrowR.png";
import arrowL from "./../assets/arrowL.png";

const Step1 = ({ setCurrentStep, answers, setAnswers, currentStep, resetSelection }) => {
  const [errors, setErrors] = useState({});

  // Funzione per validare i campi richiesti
  const validateStep = (step) => {
    let newErrors = {};

    if (step === 5) {
      if (!answers.name) newErrors.name = "Campo obbligatorio";
    } else if (step === 6) {
      if (!answers.mail) {
        newErrors.mail = "Campo obbligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.mail)) {
        newErrors.mail = "Inserisci un'email valida";
      }
      if (!answers.tel) newErrors.tel = "Campo obbligatorio";
    } else if (step === 7) {
      if (!answers.attivita) newErrors.attivita = "Campo obbligatorio";
      if (!answers.sito) newErrors.sito = "Campo obbligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True se non ci sono errori
  };

  // Funzione per avanzare di step con validazione
  const goToNextStep = (nextStep) => {
    if (validateStep(currentStep)) {
      setCurrentStep(nextStep);
    }
  };

  // Funzione per avanzare premendo Invio
  const handleEnter = (event, nextStep) => {
    if (event.key === "Enter") {
      goToNextStep(nextStep);
    }
  };

  return (
    <>
      {currentStep === 5 && (
        <div className="step-container">
          <h1 className="h1Config">Conosciamoci</h1>
          <p className="subTitle">Dicci di più su di te e la tua attività</p>

          <div className="form-container">
            <input
              type="text"
              placeholder="Scrivi il tuo nome e cognome"
              value={answers.name || ""}
              autoComplete="off" // Disabilita auto-complete
              onChange={(e) => setAnswers((prev) => ({ ...prev, name: e.target.value }))}
              onKeyDown={(e) => handleEnter(e, 6)} // Premendo "Enter" va avanti
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="navigation-buttons button-container">
            <button onClick={() => setCurrentStep(4)}>
              <img src={arrowL} alt="Freccia left" /> Indietro
            </button>
            <button onClick={() => goToNextStep(6)}>
              Avanti <img src={arrowR} alt="Freccia right" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 6 && (
        <div className="step-container">
          <h1 className="h1Config">Conosciamoci</h1>
          <p className="subTitle">Dicci di più su di te e la tua attività</p>

          <div className="form-container">
            <input
              type="text"
              placeholder="La tua email di riferimento"
              value={answers.mail || ""}
              autoComplete="off"
              onChange={(e) => setAnswers((prev) => ({ ...prev, mail: e.target.value }))}
              onKeyDown={(e) => handleEnter(e, 7)}
            />
            {errors.mail && <p className="error-message">{errors.mail}</p>}
            <input
              type="text"
              placeholder="Il tuo numero di telefono /cellulare"
              value={answers.tel || ""}
              autoComplete="off"
              onChange={(e) => setAnswers((prev) => ({ ...prev, tel: e.target.value }))}
              onKeyDown={(e) => handleEnter(e, 7)}
            />
            {errors.tel && <p className="error-message">{errors.tel}</p>}
          </div>

          <div className="navigation-buttons button-container">
            <button onClick={() => setCurrentStep(5)}>
              <img src={arrowL} alt="Freccia left" /> Indietro
            </button>
            <button onClick={() => goToNextStep(7)}>
              Avanti <img src={arrowR} alt="Freccia right" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 7 && (
        <div className="step-container">
          <h1 className="h1Config">Conosciamoci</h1>
          <p className="subTitle">Dicci di più su di te e la tua attività</p>

          <div className="form-container">
            <input
              type="text"
              placeholder="Il nome della tua azienda o attività?"
              value={answers.attivita || ""}
              autoComplete="off"
              onChange={(e) => setAnswers((prev) => ({ ...prev, attivita: e.target.value }))}
              onKeyDown={(e) => handleEnter(e, 8)}
            />
            {errors.attivita && <p className="error-message">{errors.attivita}</p>}
            <input
              type="text"
              placeholder="Il tuo sito web"
              value={answers.sito || ""}
              autoComplete="off"
              onChange={(e) => setAnswers((prev) => ({ ...prev, sito: e.target.value }))}
              onKeyDown={(e) => handleEnter(e, 8)}
            />
            {errors.sito && <p className="error-message">{errors.sito}</p>}
          </div>

          <div className="navigation-buttons button-container">
            <button onClick={() => setCurrentStep(6)}>
              <img src={arrowL} alt="Freccia left" /> Indietro
            </button>
            <button onClick={() => goToNextStep(8)}>
              Avanti <img src={arrowR} alt="Freccia right" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 8 && (
        <div className="step-container">
          <h1 className="h1Config">Grazie!</h1>
          <p className="subTitle">Abbiamo ricevuto le tue informazioni. Ti contatteremo presto.</p>
          <div className="navigation-buttons button-container">
            <button onClick={resetSelection}>Ricomincia</button>
            {/* <button onClick={() => setCurrentStep(7)}>
              <img src={arrowL} alt="Freccia left" /> Indietro
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Step1;
