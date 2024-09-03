const userDao = require("../DatabaseAndDao/userDao");
const { SignJWT, jwtVerify } = require("jose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const addUser = async (req, res) => {
  const { name, surName, age, email, password, diagnosed, avatar } = req.body;
  let { userUUID } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });

  try {
    const userExists = await userDao.getUserByEmail(email);
    if (userExists.length > 0)
      return res.status(409).json("User already regitered");

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    let userId;
    if (userUUID) {
      userId = await userDao.updateUserWithUUID(userUUID, {
        name,
        surName,
        age,
        email,
        password: hashedPassword,
        diagnosed,
        avatar,
      });
    } else {
      // Si no tiene un userUUID, lo creamos como un nuevo usuario
      userId = await userDao.addUser({
        name,
        surName,
        age,
        email,
        password: hashedPassword,
        diagnosed,
        avatar,
      });
    }

    if (userId) return res.json(`Usuario ${name} con id: ${userId} registrado`);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Error al registrar el usuario" });
    throw new Error(e);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email y contraseña son requeridos.");
  }

  try {
    const users = await userDao.getUserByEmail(email);
    if (users.length === 0) {
      return res.status(404).json({ message: "Usuario no registrado." });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const jwtConstructor = new SignJWT({
      userId: user.userId,
      email: user.email,
      role: user.role,
      diagnosed: user.diagnosed,
      subscription: user.subscription,
      acceptTerms: user.acceptTerms,
      acceptCookies: user.acceptCookies,
      subscribeNewletter: user.subscribeNewletter,
    });
    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(encoder.encode(process.env.JWT_SECRET));

    return res.json({
      token: jwt,
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        diagnosed: user.diagnosed,
        subscription: user.subscription,
        acceptTerms: user.acceptTerms,
        acceptCookies: user.acceptCookies,
        subscribeNewletter: user.subscribeNewletter,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(500).send("Error al iniciar sesión.");
  }
};

const deleteUser = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  const token = authorization.split(" ")[1];
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );

    if (!payload.role)
      return res.status(409).send("no tiene permiso de administrador");

    const user = await userDao.getUserbyId(req.params.userId);
    if (user.length === 0) return res.status(404).send("el usuario no existe");

    await userDao.deleteUser(req.params.userId);
    return res.send(`Usuario con id ${req.params.userId} eliminado`);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error al eliminar usuario");
  }
};

const updateUser = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  try {
    if (Object.entries(req.body).length === 0)
      return res.status(400).json("Error al recibir el body");
    const userId = req.params.userId;
    const user = await userDao.getUserbyId(userId);
    if (user.length === 0) return res.status(404).json("el usuario no existe");

    const isUserUpdated = await userDao.updateUser(userId, req.body);
    if (!isUserUpdated)
      return res.status(500).json("Error al actualizar el usuario");

    return res.send(`Usuario con id ${userId} actualizado`);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error al actualizar usuario");
    throw new Error(e.message);
  }
};

const getUser = async (req, res) => {
  let user = await userDao.getUserbyId(req.params.userId);
  if (user.length === 0) return res.status(404).send("El usuario no existe");
  [user] = user;

  return res.send(user);
};

const logoutUser = async (req, res) => {
  res.status(200).send({ message: "Has salido de tu sesión" });
};

module.exports = {
  addUser,
  loginUser,
  deleteUser,
  updateUser,
  getUser,
  logoutUser,
};
