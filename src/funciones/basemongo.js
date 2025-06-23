
import mongoose from 'mongoose';
const { Schema } = mongoose;
import { config } from 'dotenv'; 
config();
//import {resultados} from "./jugadasparainsertar.js"

 export async function datos(){

const uri = process.env.URL
try{
await mongoose.connect(uri, {
  // Opciones de conexión
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

}
catch(err) { console.error('Error de conexión de Mongoose:', err)}

const jugadaSchema = new Schema({
  nombre: String, 
  numeros: [Number]
});
const jugadas = mongoose.models.jugadas || mongoose.model('jugadas', jugadaSchema);
let  respuesta = await jugadas.find({nombre: { $not: /^RESULTADO/}})
let  resultado = await jugadas.find({nombre: 'RESULTADO'})
//const documentosCreados = await jugadas.create(resultados);

await mongoose.connection.close()
return {respuesta,resultado}

}
   // let respuesta = await jugadas.find({nombre: { $ne: 'RESULTADO'}});
  //  let resultado = await jugadas.find({nombre: 'RESULTADO'});
//await datos()
   

  
  
