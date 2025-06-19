export function findUniqueMatchingValueAndIndexes(arr1/*Jugada*/, arr2/*resultados*/) { // es importante el orden
    const matches = [];
    const tempArr2 = [...arr2]; // Haz una copia mutable de arr2 para "consumir" elementos

    for (let i = 0; i < arr1.length; i++) {
        const value1 = arr1[i];
        const matchingIndexInArr2 = tempArr2.indexOf(value1); // Encuentra la PRIMERA coincidencia

        if (matchingIndexInArr2 !== -1) {
            // Si encontramos una coincidencia en tempArr2
            matches.push(i
              /*  {value: value1,
                indexArr1: i,
                indexArr2: matchingIndexInArr2 // Este es el índice en la COPIA temporal
                }*/
        );
            // "Consume" el elemento de la copia de arr2 para que no se use de nuevo
            tempArr2.splice(matchingIndexInArr2, 1);
        }
    }
    return matches;
}
/*
const arrayD = [33,48,61,76,35,56,4,96,86,82,48,14,1,86,75,63,95,26,16,20,27,48,97,12,14,67,75,8,87,74,5,91,2,96,7,24,19,14,77,64,75]; // Dos 44s
const arrayC = [18,22,32,48,48,52,56,77,82,88];    // Un 44

const uniqueMatches = findUniqueMatchingValueAndIndexes(arrayC, arrayD);
console.log("Ejemplo 2 (Consumiendo coincidencias 1:1):");
console.log(uniqueMatches);
*/