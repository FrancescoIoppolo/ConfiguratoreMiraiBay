import React, { useEffect } from "react";
import arrowR from "./../assets/arrowR.png";

const Step1 = ({
  selectedManagers,
  setSelectedManagers,
  managersData,
  hoveredManager,
  setHoveredManager,
  toggleManagerSelection,
  setCurrentStep,
}) => {
  // Reset e selezione del primo manager quando si entra nello step 1
  useEffect(() => {
    if (managersData.length > 0) {
      setSelectedManagers([]); // Seleziona solo il primo manager
      setHoveredManager(managersData[0].id); // Imposta lo stato hover sulla prima card
    }
  }, []);

  return (
    <div>
      <h1>Crea il tuo team marketing</h1>
      <p className="subTitle">Clicca e scegli i tuoi manager di reparto.</p>

      {/* Bottone Selezionati */}
      <button
        className={`selezionati ${selectedManagers.length > 0 ? "button" : ""}`}
        onClick={() => selectedManagers.length > 0 && setCurrentStep(2)}
      >
        Selezionati {selectedManagers.length} di {managersData.length}
        {selectedManagers.length > 0 && (
          <img src={arrowR} alt="Freccia destra" className="arrow-icon" />
        )}
      </button>

      {/* Griglia dei manager */}
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
    </div>
  );
};

export default Step1;
