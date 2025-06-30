import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';


const Vacante = () => {
    const vacante = useRef(null); // Crea una referencia para el elemento a animar
    
    useGSAP(() => {
    // gsap code here...
    gsap.from(vacante.current, {
      opacity: 0,
      y: -150,
      duration: 5,
      rotate:360,
      display:"block",
      ease: "elastic",
      delay: 0.25 // Opcional: un pequeño retraso para que la animación no sea instantánea
    });
  }, { scope: vacante }); // Asegúrate de vincular el contexto GSAP al ref

  return (
    <div className="Vacante" ref={vacante}>
        <img src="https://d3hcrfnfnzslzm.cloudfront.net/resources/plates/2019-11-09/-1109093356.jpg" alt="vacante" />
    </div>
  );
};

export default Vacante;