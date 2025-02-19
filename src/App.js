import React, { useState, useEffect } from "react";
import "./style/style.css";
import { workModes, managersData } from "./teams";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import iconSrc from "./assets/icon.png";
import arrowR from "./assets/ArrowR.png";
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
  const [isChartReady, setIsChartReady] = useState(false);


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
    localStorage.setItem("selectedWorkMode", JSON.stringify(selectedWorkMode)); // Aggiunto
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


  const toggleWorkModeSelection = (modeId) => {
    setSelectedWorkMode(prevMode => prevMode === modeId ? null : modeId);
  };
  

  // Resetta il Local Storage e lo stato**
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
        <div>
          <h1>Crea il tuo team marketing</h1>
          <p className="subTitle">Clicca e scegli i tuoi manager di reparto.</p>
          <p className="selezionati">Selezionati {selectedManagers.length} di {managersData.length}</p>
          <div className="managers-grid">
            {managersData.map((manager) => {
              const isSelected = selectedManagers.some((m) => m.id === manager.id);
              const isHovered = hoveredManager === manager.id;
              const imageSrc = isSelected
                ? manager.images.active
                : isHovered
                ? manager.images.hover
                : manager.images.default;
  
              return (
                <div
                  key={manager.id}
                  className={`manager-card ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleManagerSelection(manager)}
                  onMouseOver={() => setHoveredManager(manager.id)}
                >
                  <img 
                    src={imageSrc} 
                    alt={manager.name} 
                    className={`manager-image ${isSelected ? "selected-image" : ""}`}
                  />
                </div>
              );
            })}
          </div>
          {selectedManagers.length > 0 && <div className="button-container"><button onClick={() => setCurrentStep(2)}>Avanti   <img src={arrowR} alt="Freccia destra" /></button></div>}
        </div>
      )}
  
      {/* Step 2 - Domande per ogni manager selezionato */}
      {currentStep === 2 && selectedManagers.length > 0 && (
        <div>
          <h1>Cos’è importante per te?</h1>
          <p className="subTitle">Vota gli obiettivi di reparto in base alle tue esigenze</p>
  
          <div className="manager-header" style={{ borderColor: selectedManagers[currentManagerIndex].color }}>
            <img src={selectedManagers[currentManagerIndex].images.card} alt={selectedManagers[currentManagerIndex].name} className="bannerManager" />
          </div>
  
          {selectedManagers[currentManagerIndex].questions.map((question, index) => (
            <div key={index} className="question-container">
              <p className="question-text">{question}</p>
              <div className="range-wrapper">
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  step="2"
                  value={answers[selectedManagers[currentManagerIndex].id]?.[question] || 5}
                  onChange={(e) => handleRangeChange(selectedManagers[currentManagerIndex].id, question, e.target.value)}
                />
              </div>
            </div>
          ))}
  
          <div className="navigation-buttons button-container" >
            <button onClick={() => setCurrentStep(1)}><img src={arrowL} alt="Freccia left" /> Indietro </button>
            {currentManagerIndex < selectedManagers.length - 1 ? (
              <button onClick={() => setCurrentManagerIndex((prev) => prev + 1)}>Avanti <img src={arrowR} alt="Freccia right" /></button>
            ) : (
              <button onClick={() => setCurrentStep(3)}>Avanti <img src={arrowR} alt="Freccia right" /></button>
            )}
          </div>

        </div>
      )}
  
      {/* Step 3 - Selezione modalità di lavoro */}
      {currentStep === 3 && (
        <div>
          <h1>Quale modalità di lavoro preferisci?</h1>
          <p className="subTitle">Come vuoi che lavoriamo per te?</p>
          
          <div className="work-modes-grid">
            {workModes.map((mode) => (
              <div
                key={mode.id}
                className={`work-mode-card ${selectedWorkMode === mode.id ? "selected" : ""}`}
                onClick={() => toggleWorkModeSelection(mode.id)}
              >
                <div className="mode-header"></div>
                <div className="modeCerchio"></div>
                <h3 className="modeTitle">{mode.title}</h3>
                <p className="modeDescription">{mode.description}</p>
              </div>
            ))}
          </div>
  
          <div className="navigation-buttons  button-container">
            <button onClick={() => {
              setCurrentStep(2);
              setCurrentManagerIndex(0); 
            }}>
               <img src={arrowL} alt="Freccia left" /> Indietro
            </button>
  
            {selectedWorkMode && <button onClick={() => setCurrentStep(4)}>Avanti  <img src={arrowR} alt="Freccia right" /></button>}
          </div>
        </div>
      )}
  
      {/* Step 4 - La tua Priority Matrix */}   
      {currentStep === 4 && (
  <div className="">
    <h1>La tua Priority Matrix</h1>
    <p className="subTitle">Ecco il risultato delle tue scelte</p>
    <div className="summary-container">
    <div className="chart-container">
      <ResponsiveContainer height={500}>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="60%"
          data={prepareChartData(selectedManagers, answers)}
        >
          <PolarGrid radialLines={false} stroke="white" strokeWidth={2} />
          
          <PolarAngleAxis 
  dataKey="question"
  tick={({ payload, x, y, cx, cy }) => {
    const radius = 80; // Distanza maggiore dal centro
    const angle = Math.atan2(y - cy, x - cx);
    const newX = x + Math.cos(angle) * radius;
    const newY = y + Math.sin(angle) * radius;

    const iconSize = 20; // Dimensione icona
    const textOffset = 50; // Spazio tra icona e testo

    // Dividere il testo ogni X caratteri o dopo ogni parola
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

    const lines = splitText(payload.value, 10); // Cambia il numero di caratteri per riga

    return (
      <>
        {/* Aggiunge l'icona PNG prima del testo */}
        <image 
          href={iconSrc} 
          x={newX - textOffset - iconSize - 8}
          y={newY - iconSize / 3} 
          width={iconSize} 
          height={iconSize}
        />

        {/* Testo con margine per l'icona */}
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





        <Radar
            name="Priorità"
            dataKey="value"
            stroke="#3b82f6"
            fill="#0000FF"
            fillOpacity={0.8}
          />

      <PolarRadiusAxis
        angle={0}
        domain={[0, 10]}
        stroke="red"
        strokeWidth={1} // Aumenta lo spessore della linea
        stackOrder="descending" 
        tickCount={6}
        tick={(props) => {
          const { x, y, payload } = props;
          return (
            <text
              x={x}
              y={y - 5} // Sposta leggermente in basso (margin-bottom)
              fill="red"
              fontSize={14}
              fontWeight="bold" // Testo in grassetto
              textAnchor="top"
              transform={`rotate(0, ${x}, ${y})`} // Ruota di 90° attorno al suo centro
            >
              {payload.value}
            </text>
          );
        }}
      />

        </RadarChart>
      </ResponsiveContainer>
    </div>
        {/* Box laterale con le info selezionate */}
        <div className="summary-sidebar">
          <h3>I tuoi manager di reparto scelti</h3>
          {selectedManagers.map(manager => (
            <div key={manager.id} className="selected-manager">
              <img src={manager.images.card} alt={manager.name} />
            </div>
          ))}

          <h3 className="modalitaLavoro">Modalità di lavoro</h3>
          <div className="work-modes-grid">
            <div className="work-mode-card">
              <h3 className="modeTitle">{workModes.find(mode => mode.id === selectedWorkMode)?.title}</h3>
            </div>
          </div>

          
        </div>
        </div>
        <div className="navigation-buttons button-container">
        <button onClick={() => {
        setCurrentStep(3);
        setCurrentManagerIndex(0); // Assicura che le domande partano dall'inizio
      }}>
      <img src={arrowL} alt="Freccia left" />  Indietro
      </button>
          <button onClick={resetSelection}>Reset</button>
          <button onClick={() => setCurrentStep(5)}>Avanti  <img src={arrowR} alt="Freccia right" /></button>
        </div>
      </div>

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
