import { assessmentAnswerOptions } from "../../utils/variables"

export default function Test(){
    <> 
return <h1> Here goes the test to verify is client has the sindrome </h1>
{assessmentAnswerOptions }
</>
}

// esto es solo una idea para manejar el userUUID y que se envie con la respuesta del assessment

//1. Registrar al Usuario:
//Cuando un usuario se registra, puedes obtener el userUUID almacenado en el localStorage y enviarlo junto con los datos de registro al backend.
// import React, { useState } from 'react';
// import api from '../../apis/api'; // Asegúrate de importar correctamente tu API

// function TestComponent() {
//   const [responses, setResponses] = useState([]);

//   // Maneja el envío de respuestas
//   const handleSubmitTest = async () => {
//     try {
//       // Agregar el userUUID a cada respuesta
//       const userUUID = localStorage.getItem('userUUID');
//       const responsesWithUUID = assessmentAnswerOptions .map(response => ({
//         ...response,
//         userUUID: userUUID,
//       }));

//       // Enviar respuestas al backend
//       await api.sendResponses(responsesWithUUID);

//       // Mostrar un mensaje de éxito o redirigir al usuario
//       console.log("Respuestas enviadas con éxito.");
//     } catch (error) {
//       console.error("Error al enviar las respuestas:", error);
//     }
//   };

//   // Suponiendo que tienes una función para manejar las respuestas de las preguntas
//   const handleAnswerChange = (questionId, answerText, score) => {
//     const newResponse = { questionId, answerText, score };
//     setResponses([...responses, newResponse]);
//   };

//   return (
//     <div>
//       {/* Aquí iría la lógica para mostrar las preguntas */}
//       {/* Por ejemplo: */}
//       <button onClick={handleSubmitTest}>Enviar Test</button>
//     </div>
//   );
// }

// export default TestComponent;


// opción para reemplazar el uuid por userId
// const handleRegister = async (userData) => {
//     try {
//       const userUUID = localStorage.getItem('userUUID');
  
//       // Agregar el userUUID a los datos del registro
//       const registrationData = {
//         ...userData,
//         userUUID,
//       };
  
//       const response = await api.registerUser(registrationData);
  
//       // Asumimos que la respuesta incluye el nuevo userId
//       const { userId } = response.data;
  
//       // Aquí puedes eliminar el userUUID si ya no lo necesitas
//       localStorage.removeItem('userUUID');
  
//     } catch (error) {
//       console.error('Error al registrar el usuario:', error);
//     }
//   };
  