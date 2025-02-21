import React, { useState, useEffect } from "react";
import { workModes, managersData } from "./teams";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";

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



  useEffect(() => {
    if (currentStep === 8) { // Appena prima della pagina "Grazie!"
      // Otteniamo tutte le domande possibili per ogni manager
      const allQuestions = [...new Set(managersData.flatMap(manager => manager.questions))];
  
      // Struttura le risposte, includendo tutte le domande anche se non risposte
      const formattedAnswers = selectedManagers.reduce((acc, manager) => {
        acc[manager.id] = allQuestions.map(question => ({
          question,
          percentage: answers[manager.id]?.[question] !== undefined
            ? `${answers[manager.id][question]}%`
            : 5 // Se la domanda non è stata modificata, segniamo come "Default"
        }));
        return acc;
      }, {});
  
      // Dati finali da inviare
      const finalResults = {
        selectedManagers: selectedManagers.map(manager => ({
          id: manager.id,
          name: manager.name
        })),
        answers: formattedAnswers,
        selectedWorkMode,
        userData: {
          name: answers.name || "Non specificato",
          email: answers.mail || "Non specificato",
          telefono: answers.tel || "Non specificato",
          attivita: answers.attivita || "Non specificato",
          sitoWeb: answers.sito || "Non specificato"
        }
      };
  
      console.log("Risultati finali:", finalResults);
  
      // Invia i dati al file PHP
      fetch("tuo_file.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalResults)
      })
        .then(response => response.json())
        .then(data => console.log("Risposta dal server:", data))
        .catch(error => console.error("Errore nell'invio dei dati:", error));
    }
  }, [currentStep]); // Si attiva solo quando currentStep diventa 8
  
  


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
      <Step5
          setCurrentStep={setCurrentStep}
          answers={answers}
          currentStep={currentStep}
          resetSelection={resetSelection}
          setAnswers={setAnswers}
        />

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
