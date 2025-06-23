import React, { useState, useEffect, useCallback } from 'react';
import '../components/estilos/animated.css'; // Importa el CSS para este componente

const Vacante = () => {
    const autoCloseDelay = 3000
  // Estado interno para controlar la visibilidad del overlay completo
  const [showOverlay, setShowOverlay] = useState(true);
  // Estado interno para controlar la animación de la caja del mensaje
  const [showBox, setShowBox] = useState(true);

  // Callback para manejar el cierre del cartel, memorizado con useCallback
  const handleClose = useCallback(() => {
    setShowBox(false); // Inicia la animación de salida de la caja (deslizar/desvanecer)
    // Después de la animación de salida de la caja, oculta el overlay completo
    setTimeout(() => {
      setShowOverlay(false);
     ; // Llama al callback del padre para notificar que está completamente cerrado
    }, 300); // Este tiempo debe coincidir con la duración de la transición CSS (transition: transform 0.3s ease, opacity 0.3s ease;)
  }, []); // Se vuelve a crear si 'onClose' cambia

  // Efecto para controlar la secuencia de aparición/desaparición basada en 'isVisible' (prop del padre)
  useEffect(() => {
    if (showOverlay) {
      setShowOverlay(true); // Primero, muestra el overlay
      // Pequeño retraso para que la animación de deslizamiento de la caja se vea bien
      const timerId = setTimeout(() => {
        setShowBox(true); // Luego, muestra la caja del mensaje
      }, 50); // Retraso de 50ms antes de la animación de entrada de la caja
      return () => clearTimeout(timerId); // Limpia el timer si el componente se desmonta o 'isVisible' cambia
    } else {
      // Si 'isVisible' se vuelve falso desde el padre, inicia la secuencia de cierre
      if (showBox) { // Solo si el cartel está actualmente visible
        handleClose();
      }
    }
  }, [showBox, handleClose]); // Dependencias para re-ejecutar el efecto

  // Efecto para el cierre automático
  useEffect(() => {
    if (showBox && autoCloseDelay > 0) {
      const timerId = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);
      return () => clearTimeout(timerId); // Limpia el timer si el componente se desmonta o 'showBox' cambia
    }
  }, [showBox, autoCloseDelay, handleClose]); // Dependencias para re-ejecutar el efecto

  // Si ni el overlay ni la caja están visibles, no renderizamos nada para optimización
  if (!showOverlay && !showBox) {
    return null;
  }

  return (
    <div className={`animated-message-overlay ${showOverlay ? 'show' : ''}`}>
      <div className='animated-message-box.ganador'> {/* Añade la clase de tipo si existe */}
        <p>Vacanteeeeeeee!!!!</p>
        <button className="close-btn" onClick={handleClose}>
          &times; {/* Símbolo de "multiplicar" o "X" para cerrar */}
        </button>
      </div>
    </div>
  );
};

export default Vacante;