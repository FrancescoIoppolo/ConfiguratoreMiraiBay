import React from "react";
import arrowR from "./../assets/arrowR.png";

const Step1 = ({
  selectedManagers,
  managersData,
  hoveredManager,
  toggleManagerSelection,
  setHoveredManager,
  setCurrentStep,
}) => {
  return (
    <div>
      <h1>Crea il tuo team marketing</h1>
      <p className="subTitle">Clicca e scegli i tuoi manager di reparto.</p>
      <p className="selezionati">
        Selezionati {selectedManagers.length} di {managersData.length}
      </p>

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

      {/* Pulsante Avanti */}
      {selectedManagers.length > 0 && (
        <div className="button-container">
          <button onClick={() => setCurrentStep(2)}>
            Avanti <img src={arrowR} alt="Freccia destra" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Step1;
