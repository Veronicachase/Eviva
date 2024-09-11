
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'
import { loginUser} from '../../Redux/slices/userSlice'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Login() {


  const navigate=useNavigate()
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "", 
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (data, { setSubmitting, resetForm }) => {
      try {
        const result = await dispatch(loginUser(data)).unwrap();  
        if(result){ navigate('/') }
      
        resetForm();
      } catch (error) {
        console.error('Error registrando el usuario:', error);
        toast.error('Wrong user or password, please try again')
      }
      setSubmitting(false);
    }
  });
  
  const handleNavigate =()=>{  navigate('/register');}
  const handleForgotPassword=()=>{ navigate('/forgot-password')}
  

  return (
    <form className="form-control mt-5 container" onSubmit={formik.handleSubmit}>
   
   <div className='row'>
   <div className='col-md-12'> 
      <input
        type="email"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder="Email"
        onBlur={formik.handleBlur}
        className={formik.errors.email && formik.touched.email ? "input-error" : ""}
      />
      {formik.errors.email && formik.touched.email && (
        <p className="error">{formik.errors.email}</p>
      )}

      </div>
      <div className='col-md-12'> 
      <input
        type="password"
        id="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="Password"
        onBlur={formik.handleBlur}
        className={formik.errors.password && formik.touched.password ? "input-error" : ""}
      />
      {formik.errors.password && formik.touched.password && (
        <p className="error">{formik.errors.password}</p>
      )}
      </div>

     <div className="col-md-12">
     <p>¿No estás registrado?</p><span><p onClick={handleNavigate} style={{ cursor: 'pointer' }}>Regístrate aquí  </p></span>
     </div>
     <div className="col-md-12">
     <span> <p onClick={handleForgotPassword} style={{ cursor: 'pointer' }}> He olvidado mi usuario o password</p> </span>
     </div>

      <button type="submit" className="btn btn-primary mt-3 " disabled={formik.isSubmitting}>Login</button>
      </div>
    </form>
  );
}
