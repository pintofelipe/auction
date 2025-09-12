import mongoose from "mongoose";
import { Profiler } from "react";

const userSchema = mongoose.Schema({
  //Campos de autenticacion y rol

  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio."],
    unique: true,
    trim: true,
    maxlength: [
      20,
      "El nombre de usuario no puede tener más de 20 caracteres.",
    ],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Por favor, introduce un correo electrónico válido."],
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "La contraseña debe tener al menos 8 caracteres."],
  },

  role: {
    type: String,
    required: true,
    enum: {
      values: ["comprador", "vendedor", "admin"],
      message: "{VALUE} no es un rol válido.",
    },
    default: "comprador",
  },

  // --Campos del perfil (Datos personales)

  Profile: {
    fullName: {
      type: String,
      required: [true, "El nombre completo es obligatorio."],
      maxlength: [32, "El nombre completo no puede exceder los 32 caracteres."],
    },

    documentType: {
      type: String,
      required: [true, "El tipo de documento es obligatorio."],
      enum: ["nit", "cedula", "licencia"],
    },

    documentNumber: {
      type: String,
      required: [true, "El número de documento es obligatorio."],
      unique: true,
      maxlength: [
        10,
        "El número de documento no puede exceder los 10 caracteres.",
      ],
    },
    phone: {
      type: String,
      required: [true, "El teléfono es obligatorio."],
      unique: true,
      maxlength: [10, "la dirección no puede exceder los 10 caracteres."],
    },
    address: {
      type: String,
      required: [true, "La dirección física es obligatoria."],
      maxlengt: [100, "la dirección no puede exceder los 100 caracteres."],
    },
    profilePictureUrl: {
      type: String,
      default: "/images/default",
    },
  },
  
  //Information financiera y legal (Especifica del vendedor)

  personType: {
    type: String,
    required: [true, "El tipo de persona es obligatorio."],
    enum: ["natural", "juridica"],
  },
  bankAccount: {
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true }, //Es buena idea añadir el nombre del banco
  },

  //Este objeto solo se llenará si la personType es juridica
  legalInfo: {
    companyName: { type: String }, //Razon social
    taxId: { type: String }, //Nit de la empresa
  },

  //Metadatos del sistema

  isActive: {
    type: Boolean,
    default: true, //Para suspensiones logicas (soft delete)
  },
},
{
  timestamps: true,
});

// --Middleware de mongoose: hashear la contraseña antes de guardar
// Esto se ejecuta automáticamente CADA VEZ que se guarda un nuevo usuario o se modifica su contraseña.

userSchema.pre('save', async function (next) {
  //Si la password no ha sido modificada, no hacer nada and continuar
  if(!this.isModified('password')){
    return next();
  }

  //Generar la 'sal' (un string aleatorio para fortalecer el hash)
  const salt = await bcrypt.genSalt(10);
  //Hashear la password whit the sal

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Exportar el modelo para poder usarlo en otras partes de la aplication (controladores)


export default mongoose.model('User', userSchema);