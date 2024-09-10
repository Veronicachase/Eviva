
import * as Yup from 'yup';



 export const AddBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    shortDescription: Yup.string().required('Short Description is required'),
    content: Yup.string().required('Content is required'),
    author: Yup.string().required('Author is required'),
    category: Yup.string().required('Category is required'),
    topic: Yup.string().required('Topic is required'),
    image:Yup.string()
  });