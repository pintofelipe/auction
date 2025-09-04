import mongoose from "mongoose";
import { Profiler } from "react";

mongoose.Schema({
  //Campos de autenticacion y rol

  username: {
    type: String,
    require: [true, "El nombre de usuario es obligatorio."],
    unique: true,
    trim: true,
    maxlength: [
      20,
      "El nombre de usuario no puede tener más de 20 caracteres.",
    ],
  },

  email: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Por favor, introduce un correo electrónico válido."],
  },

  password: {
    type: String,
    require: true,
    minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
  },

  role: {
    type: String,
    require: true,
    enum: {
      values: ["comprador", "vendedor", "admin"],
      message: "{VALUE} no es un rol válido.",
    },
    default: "comprador",
  },

  // --Campos del perfil (Datos personales)

  Profile: {
    fullName: {
      type: true,
      require: [true, "El nombre completo es obligatorio."],
      maxlength: [32, "El nombre completo no puede exceder los 32 caracteres."],
    },

    documentType: {
      type: String,
      require: [true, 'El tipo de documento es obligatorio.'],
      enum: ['nit','cedula','licencia'],
    },

    documentNumber: {
      type: String,
      require: [true, 'El número de documento es obligatorio.'],
      unique: true,
      maxlength: [10, 'El número de documento no puede exceder los 10 caracteres.']
    }
  },
});
