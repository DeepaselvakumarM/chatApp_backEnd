const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup logic
exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users(username,email,password) VALUES($1,$2,$3)",
      [username, email, hashed]
    );

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    if (err.code === "23505") {
      err.message = "Email already exists";
      err.status = 409;
    }
    next(err);
  }
};


// login logic
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (!result.rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // res.json({ token });
    res.json({
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email
  }
});

  } catch (err) {
    next(err);
  }
};
