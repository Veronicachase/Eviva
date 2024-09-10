import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AddBlogSchema  } from './schemas/AddBlogSchema';
import { initialValues } from './schemas/BlogInitialValues';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import addBlog from '../../apis/adminPanel/addBlog';

export default function BlogAdminPanel() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/video-admin-panel">Videos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/blog-admin-panel">Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/recipe-admin-panel">Recipe</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Formulario */}
      <div className="container-fluid   my-5">
        <h2>Blog - Create a new blog</h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={AddBlogSchema}
          onSubmit={(values) => {
            // Lógica para enviar el formulario a la API
            addBlog(values).then(response => {
              console.log(response);
            });
          }}
        >
          {({ setFieldValue }) => (
            <Form className="row">
              {/* Columna izquierda */}
              <div className="col-md-7">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    className="form-control"
                    placeholder="Title"
                  />
                  <ErrorMessage name="title" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="shortDescription">Short Description</label>
                  <Field
                    name="shortDescription"
                    className="form-control"
                    placeholder="Short Description"
                  />
                  <ErrorMessage name="shortDescription" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <Field name="content">
                    {({ field }) => (
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={(value) => setFieldValue('content', value)}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="content" component="div" className="text-danger" />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="col-md-5">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <Field
                    name="date"
                    type="date"
                    className="form-control"
                  />
                  <ErrorMessage name="date" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Add Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files[0]);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <Field
                    name="author"
                    className="form-control"
                    placeholder="Author"
                  />
                  <ErrorMessage name="author" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <Field
                    name="category"
                    as="select"
                    className="form-control"
                  >
                    <option value="">Choose an option</option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                  </Field>
                  <ErrorMessage name="category" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="topic">Topic</label>
                  <Field
                    name="topic"
                    className="form-control"
                    placeholder="Topic"
                  />
                  <ErrorMessage name="topic" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="additionalUrl">Additional URL</label>
                  <Field
                    name="additionalUrl"
                    type="url"
                    className="form-control"
                    placeholder="Additional URL"
                  />
                  <ErrorMessage name="additionalUrl" component="div" className="text-danger" />
                </div>

                <button type="submit" className="btn btn-primary w-100">Save</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
