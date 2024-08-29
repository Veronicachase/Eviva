
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthToken } from "../../utils/tokenVerifier";


export default function Settings(){
    const dispatch = useDispatch();

  useEffect(() => {
    checkAuthToken(dispatch);
  }, [dispatch]);

    return <p> settings

    Notificaciones: Permitir al usuario personalizar cómo y cuándo desea recibir notificaciones.
    
    Habilitar/deshabilitar notificaciones push.
    Configurar notificaciones por email para ciertos eventos o recordatorios.
    Privacidad:
    
    Controlar quién puede ver su perfil o parte de la información en él.
    Ajustes para bloquear a otros usuarios o restringir quiénes pueden contactarlo.
    Preferencias de idioma: Permitir al usuario seleccionar el idioma de la interfaz de usuario.
    
    Configuración de la cuenta:
    
    Actualizar información personal como nombre, email, o detalles de contacto.
    Configuración de métodos de autenticación y recuperación de cuenta.
    Suscripciones:
    
    Gestionar suscripciones activas (si aplica).
    Cambiar planes o cancelar servicios.
    Preferencias de visualización:
    
    Ajustar configuraciones para facilitar la lectura, como tamaño de fuente o contrastes (aunque no quieras tema o color, ajustes de accesibilidad pueden ser útiles).
    Gestión de datos:
    
    Opciones para descargar o eliminar datos personales.
    Configuraciones de retención de datos y historial.
    Ajustes de seguridad:
    
    Configurar verificaciones en dos pasos.
    Ver y gestionar dispositivos confiables o sesiones activas.
    Preferencias de comunicación:
    
    Elegir cómo desea ser contactado por la aplicación para distintos propósitos (notificaciones, promociones, actualizaciones).
    Gestión de pago:
    
    Actualizar métodos de pago.
    Ver historial de transacciones y facturas.
    Cada una de estas configuraciones ofrece un mayor control sobre la experiencia del usuario en la aplicación, asegurando que puedan personalizar su interacción de acuerdo a sus necesidades y preferencias. Esto no solo mejora la experiencia del usuario, sino que también puede ayudar a aumentar la retención de usuarios al hacerlos sentir más en control de su entorno digital.

    </p>

}