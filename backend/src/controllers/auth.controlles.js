import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

//registro de usuario
export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      role = "comprador",
      Profile,
      bankAccount,
      personType,
      legalInfo,
    } = req.body;

    //validar que los campos requeridos esten presentes

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "Email, contraseña y nombre de usuario son requeridos",
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "El email ya esta registrado"
            : "El nombre de usuario ya esta en uso ",
      });
    }


    //creo el objeto del usuario
    const userData = {
      username,
      email,
      password: password,
      role,
      Profile: {
        fullName: Profile.fullName,
        documentType: Profile.documentType,
        documentNumber: Profile.documentNumber,
        phone: Profile.phone,
        address: Profile.address,
        profilePictureUrl: Profile.profilePictureUrl || "/images/default",
      },
    };

    //solo agregar campos de vendedor si es vendedor

    if (role === "vendedor") {
      userData.personType = personType;

      if (bankAccount) {
        userData.bankAccount = {
          accountNumber: bankAccount.accountNumber,
          bankName: bankAccount.bankName,
        };
      }

      if (personType === "juridica" && legalInfo) {
        userData.legalInfo = {
          companyName: legalInfo.companyName,
          taxId: legalInfo.taxId,
        };
      }
    }

    //crear el usuario y guardarlo
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    const token = await createAccessToken({
      id: savedUser._id,
    });

    res.cookie("token", token);

    //respuesta sin password
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "usuario registrado exitosamente",
      user: userResponse,
    });
  } catch (error) {
    console.log("Error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Error de validacion",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `El ${field} ya está en uso`,
      });
    }

    res.status(500).json({
      success: false,
      message: "Error del servidor",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email y contraseña son requeridos",
      });
    }


    const userFound = await User.findOne({ email }).select("+password");

    if (!userFound) {
      return res.status(400).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "La contraseña es incorrecta",
      });
    }

    //crear el token con el usuario buscado
    const token = await createAccessToken({
      id: userFound._id,
    });

    res.cookie("token", token);

    //Respuesta con datos del usuario (sin passsword)

    res.json({
      success: true,
      message: "Login exitoso",
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: userFound.role,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor",
    });
  }
};

// Logout
export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0)
  });
  return res.status(200).json({ 
    success: true,
    message: "Logout exitoso" 
  });
};


// Verificar token
export const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Usuario no encontrado" 
      });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Error en verificación:", error);
    res.status(500).json({ 
      success: false,
      message: "Error del servidor" 
    });
  }
};