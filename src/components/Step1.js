import React, { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <h1 className="h1Config">Crea il tuo team marketing</h1>
      <p className="subTitle">Clicca e scegli i tuoi manager di reparto.</p>

      <button
        className={`selezionati ${selectedManagers.length > 0 ? "button" : ""}`}
        onClick={() => selectedManagers.length > 0 && setCurrentStep(2)}
      >
        Selezionati {selectedManagers.length} di {managersData.length}
        {selectedManagers.length > 0 && (
          <img src={arrowR} alt="Freccia destra" className="arrow-icon" />
        )}
      </button>

      <div className="managers-grid">
        {managersData.map((manager) => {
          const isSelected = selectedManagers.some((m) => m.id === manager.id);
          const isHovered = hoveredManager === manager.id;

          // IMMAGINI PER MOBILE E DESKTOP
          const desktopImageSrc = isSelected
            ? manager.images.active
            : isHovered
            ? manager.images.hover
            : manager.images.default;

          const mobileImageSrc = isSelected
            ? manager.images.mobileSelected
            : manager.images.mobile;

          return (
            <div
              key={manager.id}
              className={`manager-card ${isSelected ? "selected" : ""}`}
              onClick={() => toggleManagerSelection(manager)}
              onMouseOver={() => !isMobile && setHoveredManager(manager.id)}
            >
              {/* Immagine Desktop */}
              <img
                src={desktopImageSrc}
                alt={manager.name}
                className="manager-image desktop"
              />

              {/* Immagine Mobile */}
              <img
                src={mobileImageSrc}
                alt={manager.name}
                className="manager-image mobile"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step1;
