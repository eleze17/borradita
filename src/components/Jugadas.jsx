import { useEffect, useState } from 'react';
import './estilos/estilos.css';
import {findUniqueMatchingValueAndIndexes} from "../funciones/compararJugada"
/*function obtenerValoresCoincidentes(arr1, arr2) {
  const setArr2 = new Set(arr2); // Usar Set es más eficiente para arrays grandes
  return arr1.filter(elemento => setArr2.has(elemento));
}*/

export  const Jugadas = ({nombre,numeros,resultado})=>{
  numeros.sort(function (a, b) {
  return a - b;})
  const borrados = findUniqueMatchingValueAndIndexes(numeros,resultado)

  const [numerosOk, setNumeros] = useState([])
  useEffect(()=>{
    //const borrados = obtenerValoresCoincidentes(numeros,resultado)//[33,46,61,76,35,56,4,96,86,82,19,14,1,86,75,63,95,26,16,20,27,97,12,14,67,75,8,87,74,5,91,2,96,7,24,19,14,77,64,75])
    
    
    setNumeros(borrados)


  },[numeros]); 
    return(
        <>
        <div>{nombre}  Borrados: {numerosOk.length} </div>
        {numeros.map((numero,index)=>{
            return(<div className="numbers"key={index} id={numero.value}
            style={borrados.includes(index)?{color:'red'}:{}}
            
            >
                    {numero}
                  </div>)
        })}
       </>

    )
}

