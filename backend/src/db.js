import mongoose from "mongoose";
import 'dotenv/config'; // paso1. Para cargar la variable .env
//esto es asincrono

export const connectDB = async () => {
  try {
    //paso 2. comprobar si la variable existe

    if(!process.env.MONGODB_URI){
      throw new Error("MONGODB_URI no está definida en el archivo .env")
    }
    //paso 3. se utiliza la variable de entorno en lugar de un string
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB is connected")
  } catch (error) {
    console.log("Error al conectar a la base de datos: ", error.message);
  }
};
