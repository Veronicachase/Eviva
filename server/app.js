


const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const userRourter = require("./routers/userRouter");
const blogRouter = require("./routers/blogRouter");
const videoRouter = require("./routers/videoRouter");
const recipeRouter = require("./routers/recipeRouter");
const calendarRouter = require("./routers/calendarRouter");
const settingsRouter = require("./routers/settingsRouter");
const paymentRouter =require("./routers/paymentRouter")
const authenticateToken =require("./middleWares/authenticateToken")
const testRouter = require("./routers/testRouter")
const cors = require("cors");


dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin:'*',
  credentials: true,
};
//orgin: process.env.FRONTEND_URL,y stripe 
// middlewares de express

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
//app.use(authenticateToken);
// Debo hacer esto? o sin esto vale?



// Aplicar el middleware de autenticación a las rutas que la requieran


app.use("/calendar", authenticateToken, calendarRouter);
app.use("/videos", authenticateToken, videoRouter);
app.use("/recipes", authenticateToken, recipeRouter);
app.use("/blogs", authenticateToken, blogRouter);
app.use("/setting", authenticateToken, settingsRouter);
app.use("/payment", authenticateToken, paymentRouter);



// rutas públicas

app.use("/users", userRourter);
//app.use("/assessment,testRouter")
//app.use("/survey",testRouter)
// faltaría ingresar las rutas del home, form para diagnosis de si y no , ver si register, forgot password,

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
