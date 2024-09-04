import * as yup from 'yup';

export const recipeSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  ingredients: yup.array().of(yup.string().required("Ingredient is required")).min(1, "At least one ingredient is required"),
  instructions: yup.string().required("Instructions are required"),
});
