// src/config/env.ts
import dotenv from "dotenv";
import z from "zod";
dotenv.config();
var envSchema = z.object({
  PORT: z.string().transform(Number).default("3000"),
  MONGO_URI: z.string().url(),
  FRONTEND_URI: z.string().url(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  GOOGLE_CLIENT_REDIRECT_URI: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string().default("7d"),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string().default("15m")
});
var result = envSchema.safeParse(process.env);
if (!result.success) {
  const errors = result.error.errors.map((e) => ({
    path: e.path.join(""),
    message: e.message
  }));
  console.log("ENV variables error \u274C", errors);
  process.exit(1);
}
var env = result.data;
var env_default = env;

// src/modules/auth/authRoutes.ts
import { Router } from "express";

// src/modules/auth/constants/cookies.ts
var GOOGLE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env_default.NODE_ENV === "production",
  maxAge: 15 * 60 * 1e3,
  // 15 minutes
  sameSite: "lax"
};
var REFRESHTOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env_default.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1e3,
  // 7 days
  sameSite: "strict"
};

// src/modules/auth/utils/generateTokens.ts
import jwt from "jsonwebtoken";
var generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, activeRole: user.activeRole },
    env_default.ACCESS_TOKEN_SECRET,
    { expiresIn: env_default.ACCESS_TOKEN_EXPIRY }
  );
};
var generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id, activeRole: user.activeRole },
    env_default.REFRESH_TOKEN_SECRET,
    { expiresIn: env_default.REFRESH_TOKEN_EXPIRY }
  );
};

// src/models/userModel.ts
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
var userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    fullName: {
      firstName: String,
      lastName: String
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: function() {
        return !this.googleProviderId;
      }
    },
    providers: {
      type: [String],
      enum: ["google", "credentials"],
      default: ["credentials"]
    },
    activeRole: {
      type: String,
      enum: ["client", "freelancer"],
      default: "client"
    },
    roles: {
      type: [String],
      enum: ["client", "freelancer"],
      default: ["client"]
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male"
    },
    avatarUrl: String,
    phone: String,
    googleProviderId: String,
    passwordResetToken: String,
    refreshToken: String,
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
var UserModel = mongoose.model("User", userSchema);
var userModel_default = UserModel;

// src/modules/auth/utils/generateUniqueUsername.ts
var slugify = (str) => {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
};
var generateUniqueUsername = async (fullName) => {
  let base = slugify(fullName);
  let username = base;
  let count = 0;
  while (await userModel_default.exists({ username })) {
    count += 1;
    username = `${base}${count}`;
  }
  return username;
};

// src/modules/auth/controllers/googleOauthController.ts
import * as arctic from "arctic";
var google = new arctic.Google(
  env_default.GOOGLE_CLIENT_ID,
  env_default.GOOGLE_CLIENT_SECRET,
  env_default.GOOGLE_CLIENT_REDIRECT_URI
);
var redirectToGoogleOauth = async (req, res) => {
  try {
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];
    const roleSelected = req.query.role;
    const redirectTo = req.query?.redirectTo;
    const isRole = roleSelected !== "NA" ? true : false;
    const url = google.createAuthorizationURL(state, codeVerifier, scopes);
    res.cookie("state", state, GOOGLE_COOKIE_OPTIONS);
    res.cookie("codeVerifier", codeVerifier, GOOGLE_COOKIE_OPTIONS);
    if (isRole) {
      res.cookie("oauthRole", roleSelected, GOOGLE_COOKIE_OPTIONS);
    }
    if (redirectTo) {
      res.cookie("oauthRedirectTo", redirectTo, GOOGLE_COOKIE_OPTIONS);
    }
    return res.redirect(url.toString());
  } catch (error) {
    console.error("Google Oauth redirection failed :", error);
    return res.redirect(`${env_default.FRONTEND_URI}/google/failed`);
  }
};
var handleGoogleOauthCallback = async (req, res) => {
  try {
    const code = req.query.code;
    const codeVerifier = req.cookies.codeVerifier;
    const role = req.cookies?.oauthRole || "client";
    const redirectTo = req.cookies?.oauthRedirectTo || "/";
    if (!code || typeof code !== "string" || !codeVerifier) {
      return res.redirect(`${env_default.FRONTEND_URI}/google/failed`);
    }
    const token = await google.validateAuthorizationCode(code, codeVerifier);
    const idToken = token.idToken();
    const claims = arctic.decodeIdToken(idToken);
    let isUser = await userModel_default.findOne({ email: claims.email });
    if (!isUser) {
      const basename = claims.name || claims.email.split("@")[0] || "user";
      const username = await generateUniqueUsername(basename);
      isUser = await userModel_default.create({
        email: claims.email,
        avatarUrl: claims.picture,
        isEmailVerified: true,
        username,
        fullName: {
          firstName: claims.given_name,
          lastName: claims.family_name
        },
        providers: ["google"],
        googleProviderId: claims.sub,
        roles: role ? role.split(",") : ["client"],
        activeRole: role && role === "freelancer" ? "freelancer" : "client"
      });
    } else {
      if (!isUser.googleProviderId && !isUser.providers.includes("google")) {
        isUser.isEmailVerified = true;
        isUser.providers.push("google");
        isUser.googleProviderId = claims.sub;
      }
    }
    const refreshToken = generateRefreshToken(isUser);
    isUser.refreshToken = refreshToken;
    await isUser.save();
    res.clearCookie("oauthRole");
    res.clearCookie("oauthRedirectTo");
    res.clearCookie("state");
    res.clearCookie("codeVerifier");
    res.cookie("refreshToken", refreshToken, REFRESHTOKEN_COOKIE_OPTIONS);
    return res.redirect(`${env_default.FRONTEND_URI}${redirectTo || "/"}`);
  } catch (error) {
    console.error("Google Oauth completion failed :", error);
    return res.redirect(`${env_default.FRONTEND_URI}/google/failed`);
  }
};

// src/middlewares/validateSchemaMiddlware.ts
var validateSchema = (schema) => {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Please provide data" });
    }
    const result2 = schema.safeParse(req.body);
    if (!result2.success) {
      const errors = result2.error.errors.map((e) => ({
        field: e.path.join(""),
        message: e.message
      }));
      return res.status(400).json({ message: "Validation Error", errors });
    }
    req.validatedData = result2.data;
    next();
  };
};

// src/modules/auth/schemas/registerSchema.ts
import z2 from "zod";
var registerSchema = z2.object({
  email: z2.string().min(1, "Email is required").email("Invalid email address"),
  password: z2.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
  role: z2.array(z2.enum(["client", "freelancer"])).min(1, "Atleast one role is required")
});

// src/modules/auth/utils/formattedUser.ts
var getFormattedUser = (user) => {
  return {
    _id: user._id,
    activeRole: user.activeRole,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
    email: user.email,
    fullName: user.fullName,
    gender: user.gender,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    phone: user.phone,
    username: user.username
  };
};

// src/modules/auth/controllers/registerController.ts
var registerUser = async (req, res) => {
  const data = req.validatedData;
  try {
    const user = await userModel_default.findOne({ email: data.email });
    if (user) {
      return res.status(400).json({
        message: "User already exists, Login with it or try another email."
      });
    }
    const basename = data.email.split("@")[0] || "user";
    const username = await generateUniqueUsername(basename);
    const newUser = await userModel_default.create({
      email: data.email,
      password: data.password,
      roles: data.role,
      username,
      activeRole: data.role[0]
    });
    const refreshToken = generateRefreshToken(newUser);
    const accessToken = generateAccessToken(newUser);
    newUser.refreshToken = refreshToken;
    await newUser.save();
    res.cookie("refreshToken", refreshToken, REFRESHTOKEN_COOKIE_OPTIONS);
    const userData = getFormattedUser(newUser);
    return res.status(201).json({
      message: "User registration successfull",
      accessToken,
      userData
    });
  } catch (error) {
    console.error("Registration failed :", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// src/modules/auth/schemas/loginSchema.ts
import z3 from "zod";
var loginSchema = z3.object({
  identifier: z3.string().min(1, "Email or either username is required"),
  password: z3.string().min(1, "Password is required")
});

// src/modules/auth/controllers/loginController.ts
var loginUser = async (req, res) => {
  const data = req.validatedData;
  try {
    const user = await userModel_default.findOne({
      $or: [{ email: data.identifier }, { username: data.identifier }]
    });
    if (!user) {
      return res.status(404).json({ message: "No user found with email you gave" });
    }
    const isPasswordCorrect = await user.comparePassword(data.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ errors: [{ field: "password", message: "Invalid password" }] });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, REFRESHTOKEN_COOKIE_OPTIONS);
    const userData = getFormattedUser(user);
    return res.status(200).json({
      message: `Welcome back, ${user.fullName.firstName || "User"}`,
      accessToken,
      userData
    });
  } catch (error) {
    console.log("Login failed :", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// src/modules/auth/controllers/refreshTokenController.ts
import jwt2 from "jsonwebtoken";
var refreshingToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt2.verify(refreshToken, env_default.REFRESH_TOKEN_SECRET);
    const user = await userModel_default.findById(decoded._id);
    if (!user) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();
    res.cookie("refreshToken", newRefreshToken, REFRESHTOKEN_COOKIE_OPTIONS);
    return res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken
    });
  } catch (error) {
    console.error("Token refresh failed:", error);
    if (error instanceof jwt2.TokenExpiredError || error instanceof jwt2.JsonWebTokenError) {
      res.clearCookie("refreshToken", REFRESHTOKEN_COOKIE_OPTIONS);
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// src/middlewares/isAuthenticatedMiddleware.ts
import jwt3 from "jsonwebtoken";
var isAuthenticated = (req, res, next) => {
  let accessToken = req.headers.authorization;
  if (!accessToken || !accessToken.includes("Bearer ")) {
    return res.status(401).json({
      message: "Invalid or missing token"
    });
  }
  accessToken = accessToken.split(" ")[1];
  try {
    const decodedToken = jwt3.verify(accessToken, env_default.ACCESS_TOKEN_SECRET);
    if (typeof decodedToken === "string") {
      return res.status(403).json({ message: "Invalid token payload" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token refresh failed:", error);
    if (error instanceof jwt3.TokenExpiredError || error instanceof jwt3.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid or expired access token" });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// src/modules/auth/controllers/getUserController.ts
var getUser = async (req, res) => {
  const user = req.user;
  if (!user?._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const isUser = await userModel_default.findById(user._id);
    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = getFormattedUser(isUser);
    return res.status(200).json({
      message: "User data fetched successfully",
      userData
    });
  } catch (error) {
    console.log("Get user failed :", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// src/modules/auth/controllers/logoutController.ts
var logoutUser = async (req, res) => {
  const user = req.user;
  if (!user?._id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const isUser = await userModel_default.findById(user._id);
    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }
    isUser.refreshToken = void 0;
    await isUser.save();
    res.clearCookie("refreshToken", REFRESHTOKEN_COOKIE_OPTIONS);
    return res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (error) {
    console.log("Logout failed :", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// src/modules/auth/authRoutes.ts
var router = Router();
router.get("/google", redirectToGoogleOauth);
router.get("/google/callback", handleGoogleOauthCallback);
router.post("/register", validateSchema(registerSchema), registerUser);
router.post("/login", validateSchema(loginSchema), loginUser);
router.get("/refresh-token", refreshingToken);
router.get("/me", isAuthenticated, getUser);
router.post("/logout", isAuthenticated, logoutUser);

// src/app.ts
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: env_default.FRONTEND_URI, credentials: true }));
app.use("/api/auth", router);
var app_default = app;

// src/index.ts
import http from "http";

// src/config/db.ts
import mongoose2 from "mongoose";
var connectDb = async () => {
  try {
    await mongoose2.connect(env_default.MONGO_URI);
    console.log("Db connected \u2705");
  } catch (error) {
    console.log("Db connection error :", error);
    process.exit(1);
  }
};

// src/index.ts
var server = http.createServer(app_default);
var PORT = env_default.PORT;
(async () => {
  try {
    await connectDb();
    server.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  } catch (error) {
    console.log("Server listening error \u274C", error);
    process.exit(1);
  }
})();
//# sourceMappingURL=index.js.map