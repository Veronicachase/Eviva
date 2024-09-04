
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerInitialValues } from '../../views/login/InitialValues/RegisterInitialValues';
import { RegisterFormSchema } from '../../views/login/schemas/RegisterSchema';
import { userRegister } from '../../Redux/slices/userSlice'; 

export default function RegisterForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: RegisterFormSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { confirmPassword, ...data } = values; 
      try {
        dispatch(userRegister(data)); 
        resetForm(); 
      } catch (error) {
        console.error('Error registrando el usuario:', error);
      }
      setSubmitting(false);
    }
  });

  return (
    <form className="form-control" onSubmit={formik.handleSubmit}>
      {/* Campo de nombre */}
      <input
        type="text"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Name"
        onBlur={formik.handleBlur}
        className={formik.errors.name && formik.touched.name ? "input-error" : ""}
      />
      {formik.errors.name && formik.touched.name && (
        <p className="error">{formik.errors.name}</p>
      )}

      {/* Campo de apellido */}
      <input
        type="text"
        id="surName"
        name="surName"
        value={formik.values.surName}
        onChange={formik.handleChange}
        placeholder="Surname"
        onBlur={formik.handleBlur}
        className={formik.errors.surName && formik.touched.surName ? "input-error" : ""}
      />
      {formik.errors.surName && formik.touched.surName && (
        <p className="error">{formik.errors.surName}</p>
      )}

      {/* Campo de edad */}
      <input
        type="number"
        id="age"
        name="age"
        value={formik.values.age}
        onChange={formik.handleChange}
        placeholder="Age"
        onBlur={formik.handleBlur}
        className={formik.errors.age && formik.touched.age ? "input-error" : ""}
      />
      {formik.errors.age && formik.touched.age && (
        <p className="error">{formik.errors.age}</p>
      )}

      {/* Campo de correo */}
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

      {/* Campo de contraseña */}
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

      {/* Confirmación de contraseña */}
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        placeholder="Confirm Password"
        onBlur={formik.handleBlur}
        className={formik.errors.confirmPassword && formik.touched.confirmPassword ? "input-error" : ""}
      />
      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
        <p className="error">{formik.errors.confirmPassword}</p>
      )}

      {/* Diagnosed Checkbox */}
      <div>
        <input
          type="checkbox"
          id="diagnosed"
          name="diagnosed"
          checked={formik.values.diagnosed}
          onChange={formik.handleChange}
        />
        <label htmlFor="diagnosed">I have been diagnosed with PCOS</label>
      </div>

      {/* Aceptación de términos y condiciones */}
      <div>
        <input
          type="checkbox"
          id="acceptedTC"
          name="acceptedTC"
          checked={formik.values.acceptedTC}
          onChange={formik.handleChange}
        />
        <label htmlFor="acceptedTC">I accept the terms and conditions</label>
      </div>

      {/* Suscripción a boletín */}
      <div>
        <input
          type="checkbox"
          id="subscribeNewsletter"
          name="subscribeNewsletter"
          checked={formik.values.subscribeNewsletter}
          onChange={formik.handleChange}
        />
        <label htmlFor="subscribeNewsletter">I want to subscribe to the newsletter</label>
      </div>

      <button type="submit" disabled={formik.isSubmitting}>Register</button>
    </form>
  );
}
