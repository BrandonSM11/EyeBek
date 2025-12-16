import mongoose from 'mongoose';


export const dbConnection = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI no definida");
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error en la conexión:", error);
  }
};