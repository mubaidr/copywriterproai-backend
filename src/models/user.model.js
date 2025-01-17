const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
<<<<<<< HEAD
const { Schema } = mongoose;
=======
>>>>>>> parent of ac7c990 (sign in with google integrating..)
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { authTypes } = require('../config/auths');
const authTypeEnum = Object.values(authTypes);

const userSchema = mongoose.Schema(
  {
<<<<<<< HEAD
    userId: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    authType: {
      type: String,
      enum: authTypeEnum,
      private: true,
    },
    strategyId: {
      type: String,
      private: true,
    },
    profileAvatar: {
      type: String,
=======
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
>>>>>>> parent of ac7c990 (sign in with google integrating..)
    },
    password: {
      type: String,
      required: true,
      trim: true,
      private: true, // used by the toJSON plugin
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
<<<<<<< HEAD
    favouriteTools: {
      type: Array,
      required: true,
      default: [],
=======
    wordsLeft: {
      type: Number,
      required: true,
      trim: true,
      default: 1000,
>>>>>>> parent of ac7c990 (sign in with google integrating..)
    },
    UserOwnOpenAIApiKey: {
      type: String,
      required: false,
    },
<<<<<<< HEAD
    hasCompletedOnboarding: {
      type: Boolean,
      default: true,
=======
    bookmarks: {
      type: mongoose.Schema.Types.Mixed,
    },
    OTP: {
      type: String,
      length: 6,
      trim: true,
>>>>>>> parent of ac7c990 (sign in with google integrating..)
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

// Check if email is taken
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, authType: 'email', _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isVerifiedEmailTaken = async function (email) {
  const user = await this.findOne({ email, isVerified: true, authType: 'email' });
  return !!user;
};

// Check if password matches the user's password
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

// Indexing
userSchema.index({ userId: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
