import mongoose from "mongoose";

mongoose.Schema({
    //Campos de autenticacion y rol 

    username:{
        type: String,
        require: [true, "El nombre de usuario es obligatorio."],
        unique: true,
        trim: true,
        maxlength: [20, 'El nombre de usuario no puede tener más de 20 caracteres.']
    },

    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        match:[/.+\@.+\..+/, 'Por favor, introduce un correo electrónico válido.'],
    },

    password:{
        type: String,
        require: true,
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres.']
    },

    role: {
        type: String,
        require: true,
        enum:{
            values: ['comprador','vendedor','admin'],
            message: '{VALUE} no es un rol válido.',
        },
        default: 'comprador',
    }

})