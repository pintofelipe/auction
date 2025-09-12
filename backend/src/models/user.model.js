import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
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
    select: false
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
      maxlength: [50, "El nombre completo no puede exceder los 32 caracteres."],
    },

    documentType: {
      type: String,
      required: [true, "El tipo de documento es obligatorio."],
      enum: ["nit", "CC", "TI", "TE","PP"],
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
      maxlength: [100, "la dirección no puede exceder los 100 caracteres."],
    },
    profilePictureUrl: {
      type: String,
      default: "/images/default",
    },
  },
  
  //Information financiera y legal (Especifica del vendedor)

  personType: {
    type: String,
    enum: ["natural", "juridica"],
    required: function(){
      return this.role === "vendedor";
    }
  },
  bankAccount: {
    accountNumber: { type: String, required: function() { 
      return this.role === "vendedor"} },
    bankName: { type: String, required: function(){
      return this.role === "vendedor";
    } }, //Es buena idea añadir el nombre del banco
  },

  //Este objeto solo se llenará si la personType es juridica
  legalInfo: {
    companyName: { type: String,
      required: function(){
        return this.role === "vendedor" && this.personType === "juridica";
      }
    }, //Razon social
    taxId: { type: String,
      required: function(){
        return this.role === "vendedor" && this.personType === "juridica";
      }
    }, //Nit de la empresa
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