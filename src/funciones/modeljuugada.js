import mongoose from 'mongoose';

const jugadaSchema = new Schema({
  nombre: String, 
  numeros: [Number]
});

const Jugada = mongoose.model('jugadaSchema', schema);
