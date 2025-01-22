import Users from "../modules/userModule.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
// Login Function
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  const user = await Users.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ error: "Your account doesn't get found" });
  }
  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = createToken(user._id);
    res.status(201).json({ email: user.email, token: token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Signup Function
const signup = async (req, res) => {
  const { email, password } = req.body;

  console.log("Signup Request Body:", req.body);

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create a new user
    const user = await Users.create({ email, password: hashedPassword });
    const token = createToken(user._id);
    res.status(200).json({ message: "Signup successful", token });
  } catch (err) {
    console.error("Error during signup:", err.message);
    res.status(500).json({ error: "An error occurred during signup" });
  }
};

export { login, signup };
