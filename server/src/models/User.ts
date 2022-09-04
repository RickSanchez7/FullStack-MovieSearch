import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

type matchPasswordFunction = (
  // eslint-disable-next-line
  enteredPassword: string,
  // eslint-disable-next-line
  suppliedPassword: string
) => Promise<boolean>;

type changedPasswordAfterFunction = (
  // eslint-disable-next-line
  passwordChangedAt: any,
  // eslint-disable-next-line
  JWTTimestamp: any
) => boolean;

interface movies {
  title: string;
  image: string;
  link: string;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  favoriteMovies?: Types.Array<movies>;
  matchPassword: matchPasswordFunction;
  changedPasswordAfter: changedPasswordAfterFunction;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 5,
  },
  passwordChangedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  favoriteMovies: [
    {
      title: String,
      image: String,
      link: String,
    },
  ],
});

const matchPassword: matchPasswordFunction = async function (
  enteredPassword,
  suppliedPassword
) {
  return await bcrypt.compare(enteredPassword, suppliedPassword);
};

userSchema.methods.matchPassword = matchPassword;

userSchema.pre<UserDoc>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const changedPasswordAfter: changedPasswordAfterFunction = function (
  passwordChangedAt,
  JWTTimestamp
) {
  if (passwordChangedAt) {
    const changedtimeStamp: number = Number(passwordChangedAt.getTime() / 1000);

    return JWTTimestamp < changedtimeStamp;
  }

  return false;
};

userSchema.methods.changedPasswordAfter = changedPasswordAfter;

// userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc>('User', userSchema);

export default User;
