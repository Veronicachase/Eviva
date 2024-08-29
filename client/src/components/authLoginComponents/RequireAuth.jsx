
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const RequireAuth =()=>{

<p>Esto es solo un ejemplo</p>

const RequireAuth = () => {
  const user = useSelector((state) => state.auth.user); // Obtener el usuario desde el estado de Redux

  if (!user) {
    return <Navigate to="/login" replace />; // Redirigir al login si no está autenticado
  }

  return <Outlet />; // Renderizar las rutas protegidas si está autenticado
};



}


