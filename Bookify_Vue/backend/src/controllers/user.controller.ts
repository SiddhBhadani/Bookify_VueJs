import { validate } from "class-validator";
import { User } from "../entities/User.entity";
import { getMongoRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const signUp = async (req: any, res: any) => {
  try {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    const errors = await validate(user);

    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    const userRepository = getMongoRepository(User);

    const userExists = await userRepository.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(403).json({ message: "User Already Exists!" });
    }
    if (userExists?.name == req.body.name) {
      return res.status(403).json({ message: "Username not available! " });
    }

    const hashedPassword = await bcrypt.hash(user?.password, 10);
    user.password = hashedPassword;

    const savedUser = await userRepository.save(user);
    return res.status(200).json({
      message: "User registred successfully.",
      user: savedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const userRepository = getMongoRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, "loda");

    return res.status(200).json({
      message: "Login successful",
      user: { email: user.email, _id: user._id, token },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getProfile = async (req: any, res: any, next: any) => {
  try {
    const userRepository = getMongoRepository(User);
    console.log(req.user);
    const user = await userRepository.findOne({
      where: { _id: new ObjectId(req.user._id) },
    });
    return res.status(200).json({
      message: "User fetch successful",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const deleteProfile = async (req:any,res:any,next:any)=>{
  try {
    const userRepository = getMongoRepository(User);
    console.log(req.user);
    const user = await userRepository.delete({
        _id: new ObjectId(req.user._id) ,
    });
    return res.status(200).json({
      message: "User deleter successful",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export default {
  signUp,
  login,
  getProfile,
  deleteProfile,
};
