import * as cheerio from 'cheerio';
import axios  from 'axios';

 const response = await axios.get('https://quiniela.loteriadelaciudad.gob.ar');
 const html = response.data;

 const $ = cheerio.load(html);

 const tabla2 = $('.infoJuego')

 const tabla = tabla2.eq(0)

console.log(tabla2.text())

  const datosTabla = [];
   
 tabla.find('table tbody tr').each((rowIndex, rowElement) => {
      const rowData = {};
      const fila = $(rowElement);
  
     

      // Recorrer cada celda (<td>) dentro de la fila actual
      fila.find('td').each((colIndex, cellElement) => {
        const celda = $(cellElement);
        const segundoDiv = celda.find('div:nth-child(2)');
        const textoCelda = segundoDiv.text().trim();
    
          // Si no hay encabezados, o para columnas adicionales sin encabezado
          rowData[`Columna${colIndex + 1}`] = textoCelda;
        
        // console.log(`Fila ${rowIndex + 1}, Columna ${colIndex + 1}: ${textoCelda}`);
      });
      datosTabla.push(rowData);
    });



console.log(datosTabla)