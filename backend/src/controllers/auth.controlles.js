import User from "../models/user.model.js";

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

    //creo el objeto del usuario
    const userData ={
      username,
      email,
      password,
      role,
      Profile:{
        fullName: Profile.fullName,
        documentType: Profile.documentType,
        documentNumber: Profile.documentNumber,
        phone: Profile.phone,
        address: Profile.address,
        profilePictureUrl: Profile.profilePictureUrl || "/images/default"
      }
    };

    //solo agregar campos de vendedor si es vendedor

    if(role==="vendedor"){
      userData.personType = personType;

      if(bankAccount){
        userData.bankAccount = {
          accountNumber: bankAccount.accountNumber,
          bankName: bankAccount.bankName
        };
      }

      if(personType === "juridica" && legalInfo){
        userData.legalInfo = {
          companyName: legalInfo.companyName,
          taxId: legalInfo.taxId
        };
      }

    }

    //crear el usuario y guardarlo

    const newUser = new User(userData);
    const savedUser = await newUser.save();


    //respuesta sin password
    const userResponse = savedUser.toObject();
    delete userResponse.password;


    res.status(201).json({
      success: true,
      message: "usuario registrado exitosamente",
      user: userResponse
    })

  } catch (error) {
    console.log("Error:",error);

    if(error.name === 'ValidationError'){
      return res.status(400).json({
        success: false,
        message: "Error de validacion",
        errors: Object.values(error.errors).map(err => err.message)
      })
    }

    res.status(500).json({
      success: false,
      message: "Error del servidor"
    });



  }

 
};
export const login = (req, res) => res.send("login");
