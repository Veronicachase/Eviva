import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerInitialValues } from '../../views/login/InitialValues/RegisterInitialValues';
import { RegisterFormSchema } from '../../views/login/schemas/RegisterSchema';
import { userRegister } from '../../Redux/slices/userSlice'; 

export default function Register() {
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
    <form className="form-control mt-5 container" onSubmit={formik.handleSubmit}>
      <div className="row">
        {/* Campo de nombre */}
        <div className="col-md-6">
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Name"
            onBlur={formik.handleBlur}
            className={`form-control ${formik.errors.name && formik.touched.name ? "is-invalid" : ""}`}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
        </div>

        {/* Campo de apellido */}
        <div className="col-md-6">
          <input
            type="text"
            id="surName"
            name="surName"
            value={formik.values.surName}
            onChange={formik.handleChange}
            placeholder="Surname"
            onBlur={formik.handleBlur}
            className={`form-control ${formik.errors.surName && formik.touched.surName ? "is-invalid" : ""}`}
          />
          {formik.errors.surName && formik.touched.surName && (
            <div className="invalid-feedback">{formik.errors.surName}</div>
          )}
        </div>
      </div>

      <div className="row mt-3">
        {/* Campo de edad */}
        <div className="col-md-6">
          <input
            type="number"
            id="age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            placeholder="Age"
            onBlur={formik.handleBlur}
            className={`form-control ${formik.errors.age && formik.touched.age ? "is-invalid" : ""}`}
          />
          {formik.errors.age && formik.touched.age && (
            <div className="invalid-feedback">{formik.errors.age}</div>
          )}
        </div>

        {/* Campo de correo */}
        <div className="col-md-6">
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            onBlur={formik.handleBlur}
            className={`form-control ${formik.errors.email && formik.touched.email ? "is-invalid" : ""}`}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>
      </div>

      <div className="row mt-3">
        {/* Campo de contraseña */}
        <div className="col-md-6">
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            onBlur={formik.handleBlur}
            className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : ""}`}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </div>

        {/* Confirmación de contraseña */}
        <div className="col-md-6">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Confirm Password"
            onBlur={formik.handleBlur}
            className={`form-control ${formik.errors.confirmPassword && formik.touched.confirmPassword ? "is-invalid" : ""}`}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
          )}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="form-check mt-3">
        <input
          type="checkbox"
          id="diagnosed"
          name="diagnosed"
          checked={formik.values.diagnosed}
          onChange={formik.handleChange}
          className="form-check-input"
        />
        <label htmlFor="diagnosed" className="form-check-label">
          I have been diagnosed with PCOS
        </label>
      </div>

      <div className="form-check mt-2">
        <input
          type="checkbox"
          id="acceptedTC"
          name="acceptedTC"
          checked={formik.values.acceptedTC}
          onChange={formik.handleChange}
          className="form-check-input"
        />
        <label htmlFor="acceptedTC" className="form-check-label">
          I accept the terms and conditions
        </label>
      </div>

      <div className="form-check mt-2">
        <input
          type="checkbox"
          id="subscribeNewsletter"
          name="subscribeNewsletter"
          checked={formik.values.subscribeNewsletter}
          onChange={formik.handleChange}
          className="form-check-input"
        />
        <label htmlFor="subscribeNewsletter" className="form-check-label">
          I want to subscribe to the newsletter
        </label>
      </div>

      <button type="submit" className="btn btn-primary mt-3" disabled={formik.isSubmitting}>Register</button>
    </form>
  );
}
