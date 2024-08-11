

const { jwtVerify } = require("jose")
const express = require("express")
const dotenv = require('dotenv');
const logger = require("morgan");
const userRourter = require("./routers/userRouter");
const blogRouter = require("./routers/blogRouter");
const videoRouter = require ("./routers/videoRouter");
const recipeRouter = require ("./routers/recipeRouter");
const calendarRouter = require ("./routers/calendarRouter");
const settingsRouter = require("./routers/settingsRouter")
const cors =require("cors")


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const corsOptions ={
    orgin: process.env.FRONTEND_URL,
    credentials:true,
};

// middlewares de express

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json({limit:"50mb"}));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Middleware para verificar el token JWT
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token recibido:", token);
  
    if (!token) {
      console.log("No hay token, no ha llegado el token hasta el authenticateToken");
      return res.sendStatus(401); 
    }
  
    try {
      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(token, encoder.encode(process.env.JWT_SECRET));
      console.log("Payload del token:", payload);
      req.user = payload;
      next();
    } catch (err) {
      console.log("Error en la verificación del JWT:", err);
      return res.sendStatus(403); 
    }
  };

// Aplicar el middleware de autenticación a las rutas que requieran autenticación
app.use ("/calendar",authenticateToken, calendarRouter);
app.use ("/videos", authenticateToken, videoRouter);
app.use ("/recipes", authenticateToken, recipeRouter);
app.use ("/blogs", authenticateToken, blogRouter);
app.use ("/setting",authenticateToken, settingsRouter )
app.use ("/users", userRourter)
// falta ingresar rutas para payments, user account, 


// rutas públicas

app.use("/users",userRourter)
// faltaría ingresar las rutas del home, form para diagnosis de si y no , ver si register, forgot password, 

app.listen (port, () => {
    console.log(`Example app listening on port ${port}`)
})