import * as yup from 'yup';


const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// Min 5 characters, 1 uppercase, 1 lowercase, 1 numeric digit

export const RegisterFormSchema = yup.object().shape({
  
  
  name: yup.string().required("El nombre es obligatorio"),

  surName: yup.string(),

  age: yup.number().nullable(),

  email: yup.string()
    .email('Email inválido')
    .required("El Email es obligatorio"),
  
  password: yup.string()
    .matches(passwordRules, {
      message: "La contraseña debe contener al menos 5 caracteres, 1 mayúscula, 1 minúscula y 1 número"
    })
    .required("Contraseña requerida"),

  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es obligatorio'),

  diagnosed: yup.string().nullable(),

  acceptedTC: yup.boolean()
    .oneOf([true], "Por favor acepte los términos y condiciones")
    .required("Es obligatorio aceptar los términos y condiciones"),

  subscribeNewsletter: yup.boolean(),

  

  
});

