import { RequestHandler, json } from "express";
import createHttpError from "http-errors";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import * as dummyData from "../data/dummyData";
import { assertIsDefined } from "../util/assertIsDefined";

export const addUserOneTimeOnly: RequestHandler = async (req, res, next) => {
  try {
    dummyData.data.forEach(async (user) => {
      const username = user.username;
      const firstName = user.firstName;
      const lastName = user.lastName;
      const password = user.password;

      const passwordHashed = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: passwordHashed,
      });
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const user = await userModel.findById(userId).exec();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId).exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface signupBody {
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export const signup: RequestHandler<
  unknown,
  unknown,
  signupBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const passwordRaw = req.body.password;

  try {
    if (!username || !firstName || !lastName || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await userModel
      .findOne({
        username: username,
      })
      .exec();
    if (existingUsername) {
      throw createHttpError(409, "Please choose a different username");
    }
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);
    const newUser = await userModel.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: passwordHashed,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

interface loginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  loginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameter missing");
    }
    const existingUser = await userModel
      .findOne({
        username: username,
      })
      .select("+password +email +phone +country +friends +gender +proffesion +bio +friend_requests")
      .exec();

    console.log(existingUser);

    if (!existingUser) {
      throw createHttpError(401, "Invalid credential");
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credential");
    }
    req.session.userId = existingUser._id;
    res.status(201).json(existingUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};

export const getUserCompleteById: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;
  try {
    const user = await userModel.findById(userId).select("+email +phone +country +friends +gender +proffesion +bio +friend_requests").exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface UpdateUserBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  bio: string;
  country: string;
  proffesion: string;
}
interface UpdateUserParam {
  userId?: string;
}
export const updateUser: RequestHandler<
  UpdateUserParam,
  unknown,
  UpdateUserBody,
  unknown
> = async (req, res, next) => {
  const userId = req.params.userId;

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const bio = req.body.bio;
  const country = req.body.country;
  const proffesion = req.body.proffesion;

  const authenticatedUser = req.session.userId;

  try {
    assertIsDefined(authenticatedUser);
    if (authenticatedUser.toString() !== userId) {
      throw createHttpError(
        401,
        "Current user not authenticated to update data of other user"
      );
    }
    const user = await userModel
      .findById(userId)
      .select(
        "+email +phone +country +friends +gender +proffesion +bio +friend_requests"
      ).exec();
      if (!user) {
        throw createHttpError(404, "User not found");
      }
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email ;
      user.phone = phone;
      user.gender = gender;
      user.bio = bio;
      user.country = country;
      user.proffesion = proffesion;

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
      
  } catch (error) {
    next(error);
  }
};
