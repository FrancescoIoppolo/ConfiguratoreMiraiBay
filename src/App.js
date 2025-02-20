import React, { useState, useEffect } from "react";
import { workModes, managersData } from "./teams";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";


import arrowR from "./assets/arrowR.png";
import arrowL from "./assets/arrowL.png";

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
const allTags = shuffleArray(
  managersData.flatMap(manager =>
    manager.tag.map(tag => ({ ...tag, managerId: manager.id }))
  )
);

const TeamConfigurator = () => {

  const [hoveredManager, setHoveredManager] = useState(null);
  const [currentManagerIndex, setCurrentManagerIndex] = useState(0);
  const [selectedManagers, setSelectedManagers] = useState(
    JSON.parse(localStorage.getItem("selectedManagers")) || []
  );

  const [currentStep, setCurrentStep] = useState(
    JSON.parse(localStorage.getItem("currentStep")) || 1
  );

  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers")) || {}
  );

  const [selectedWorkMode, setSelectedWorkMode] = useState(
    JSON.parse(localStorage.getItem("selectedWorkMode")) || null
  );


  // Salvo i dati nel Local Storage quando cambiano
  useEffect(() => {
    localStorage.setItem("selectedManagers", JSON.stringify(selectedManagers));
    localStorage.setItem("currentStep", JSON.stringify(currentStep));
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("selectedWorkMode", JSON.stringify(selectedWorkMode));
  }, [selectedManagers, currentStep, answers, selectedWorkMode]);
  

  // Funzione per trasformare i dati in un formato adatto al grafico
  const prepareChartData = (selectedManagers, answers) => {
    // Ottieni tutte le domande possibili
    const allQuestions = [...new Set(managersData.flatMap(manager => manager.questions))];
  
    return allQuestions.map(question => {
      // Trova tutti i valori reali inseriti dai manager
      const values = selectedManagers
        .map(manager => answers[manager.id]?.[question])
        .filter(value => value !== undefined); // Rimuove quelli non definiti
  
      // Se almeno un manager ha risposto, calcola la media
      const avgValue = values.length > 0 
        ? values.reduce((sum, value) => sum + parseFloat(value), 0) / values.length 
        : 5; // Se nessun manager ha risposto, imposta a 0
  
      return { question, value: avgValue };
    });
  };
  

  // Funzione per aggiornare le risposte
  const handleRangeChange = (managerId, question, value) => {
    setAnswers(prev => {
      const updatedAnswers = {
        ...prev,
        [managerId]: {
          ...prev[managerId],
          [question]: value
        }
      };
      localStorage.setItem("answers", JSON.stringify(updatedAnswers)); // Salva nel Local Storage
      return updatedAnswers;
    });
  };
  

  // Funzione per selezionare/deselezionare manager
  const toggleManagerSelection = (manager) => {
    setSelectedManagers((prev) => {
      if (prev.some((m) => m.id === manager.id)) {
        return prev.filter((m) => m.id !== manager.id);
      } else {
        return [...prev, manager];
      }
    });
  };


  

  // Resetta il Local Storage e lo stato
  const resetSelection = () => {
    localStorage.removeItem("selectedManagers");
    localStorage.removeItem("currentStep");
    localStorage.removeItem("answers");
    setSelectedManagers([]);
    setCurrentStep(1);
    setAnswers({});
    setCurrentManagerIndex(0);
  };


  
  return (
    <div className="team-configurator">
      
      {/* Step 1 - Selezione Manager */}
      {currentStep === 1 && (
        <Step1
          setCurrentStep={setCurrentStep}
          selectedManagers={selectedManagers}
          managersData={managersData}
          hoveredManager={hoveredManager}
          setHoveredManager={setHoveredManager}
          toggleManagerSelection={toggleManagerSelection}
          arrowR="➡️"
        />
      )}

      {/* Step 2 - Domande per ogni manager selezionato */}
      {currentStep === 2 && selectedManagers.length > 0 && (
         <Step2
         currentManagerIndex = {currentManagerIndex}
         handleRangeChange = {handleRangeChange}
         answers = {answers}
         setCurrentManagerIndex = {setCurrentManagerIndex}
         setCurrentStep= {setCurrentStep}
         selectedManagers= {selectedManagers}
       />       
      )}
  
      {/* Step 3 - Selezione modalità di lavoro */}
      {currentStep === 3 && (
         <Step3
         setCurrentManagerIndex = {setCurrentManagerIndex}
         setCurrentStep= {setCurrentStep}
         selectedWorkMode = {selectedWorkMode}
         setSelectedWorkMode = {setSelectedWorkMode}
       /> 
      )}
  
      {/* Step 4 - La tua Priority Matrix */}   
      {currentStep === 4 && (
      <Step4
      selectedManagers= {selectedManagers}
      setCurrentStep= {setCurrentStep}
      prepareChartData = {prepareChartData}
      answers = {answers}
      workModes = {workModes}
      selectedWorkMode = {selectedWorkMode}
      setCurrentManagerIndex = {setCurrentManagerIndex}
      resetSelection = {resetSelection}

    /> 
        )}





{/* Step 5 - Inserimento dati utente */}
{currentStep === 5 && (
  <div className="step-container">
    <h1>Conosciamoci</h1>
    <p className="subTitle">Dicci di più su di te e la tua attività</p>

    <div className="form-container">
      <input
        type="text"
        placeholder="Scrivi il tuo nome e cognome"
        value={answers.name || ""}
        onChange={(e) => setAnswers((prev) => ({ ...prev, name: e.target.value }))}
      />
    </div>
    <div className="navigation-buttons button-container">
      <button onClick={() => setCurrentStep(4)}>
        <img src={arrowL} alt="Freccia left" /> Indietro
      </button>
      <button onClick={() => setCurrentStep(6)}>
        Avanti <img src={arrowR} alt="Freccia right" />
      </button>
    </div>
  </div>
)}

{/* Step 6 - Inserimento dati utente */}
{currentStep === 6  && (
  <div className="step-container">
    <h1>Conosciamoci</h1>
    <p className="subTitle">Dicci di più su di te e la tua attività</p>

    <div className="form-container">
      <input
        type="text"
        placeholder="La tua email di riferimento"
        value={answers.mail || ""}
        onChange={(e) => setAnswers((prev) => ({ ...prev, mail: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Il tuo numero di telefono /cellulare"
        value={answers.tel || ""}
        onChange={(e) => setAnswers((prev) => ({ ...prev, tel: e.target.value }))}
      />
    </div>

    <div className="navigation-buttons button-container">
      <button onClick={() => setCurrentStep(5)}>
        <img src={arrowL} alt="Freccia left" /> Indietro
      </button>
      <button onClick={() => setCurrentStep(7)}>
        Avanti <img src={arrowR} alt="Freccia right" />
      </button>
    </div>
  </div>
)}



{/* Step 7 - Inserimento dati utente */}
{currentStep === 7  && (
  <div className="step-container">
    <h1>Conosciamoci</h1>
    <p className="subTitle">Dicci di più su di te e la tua attività</p>

    <div className="form-container">
      <input
        type="text"
        placeholder="Il nome della tua azienda o attività?"
        value={answers.attivita || ""}
        onChange={(e) => setAnswers((prev) => ({ ...prev, attivita: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Il tuo sito web"
        value={answers.sito || ""}
        onChange={(e) => setAnswers((prev) => ({ ...prev, sito: e.target.value }))}
      />
    </div>

    <div className="navigation-buttons button-container">
      <button onClick={() => setCurrentStep(6)}>
        <img src={arrowL} alt="Freccia left" /> Indietro
      </button>
      <button onClick={() => setCurrentStep(8)}>
        Avanti <img src={arrowR} alt="Freccia right" />
      </button>
    </div>
  </div>
)}

{/* Step 8 - Riepilogo finale */}
{currentStep === 8 && (
  <div className="step-container">
    <h1>Grazie!</h1>
    <p className="subTitle">Abbiamo ricevuto le tue informazioni. Ti contatteremo presto.</p>
    <div className="navigation-buttons button-container">

      <button onClick={resetSelection}>Ricomincia</button>
    </div>
  </div>
)}
      {/* Sezione TAG SEMPRE VISIBILE */}
      {currentStep != 8 && ( <div className="tags-section">
        <div className="tags-wrapper">
          {[0, 1, 2].map((rowIndex) => (
            <div key={rowIndex} className={`tags-row row-${rowIndex + 1}`}>
              <div className="tags-content">
                {allTags
                  .filter((_, index) => index % 3 === rowIndex)
                  .map((tag, index) => {
                    const manager = selectedManagers.find((m) => m.id === tag.managerId);
                    const isHighlighted = !!manager;
                    const tagColor = manager ? manager.color : "transparent";
  
                    return (
                      <div
                        key={index}
                        className={`tag-card ${isHighlighted ? "highlighted" : ""}`}
                        style={isHighlighted ? { "--tag-color": tagColor } : {}}
                      >
                        <img src={tag.image} alt={tag.role} className="tag-image" />
                        <p className="tag-text">{tag.role}</p>
                      </div>
                    );
                  })}
                {/* Duplicato per un effetto infinito */}
                {allTags
                  .filter((_, index) => index % 3 === rowIndex)
                  .map((tag, index) => {
                    const manager = selectedManagers.find((m) => m.id === tag.managerId);
                    const isHighlighted = !!manager;
                    const tagColor = manager ? manager.color : "transparent";
  
                    return (
                      <div
                        key={`dup-${index}`}
                        className={`tag-card ${isHighlighted ? "highlighted" : ""}`}
                        style={isHighlighted ? { "--tag-color": tagColor } : {}}
                      >
                        <img src={tag.image} alt={tag.role} className="tag-image" />
                        <p className="tag-text">{tag.role}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
  
    </div>
  );
  
};

export default TeamConfigurator;
