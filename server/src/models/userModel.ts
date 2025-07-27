import type { IUser } from 'types/IUser.js';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    fullName: {
      firstName: String,
      lastName: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.googleProviderId;
      },
    },
    providers: {
      type: [String],
      enum: ['google', 'credentials'],
      default: ['credentials'],
    },
    activeRole: {
      type: String,
      enum: ['client', 'freelancer', 'admin'],
      default: 'client',
    },
    roles: {
      type: [String],
      enum: ['client', 'freelancer', 'admin'],
      default: ['client'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'male',
    },

    avatarUrl: String,
    phone: String,
    googleProviderId: String,
    passwordResetToken: String,
    refreshToken: String,
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
