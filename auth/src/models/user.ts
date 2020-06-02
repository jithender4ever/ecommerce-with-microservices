import mongoose from "mongoose";

// Interface that defines the properties needed to create a User
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that defines the properties of a User Document (instance of a User Model)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Interface that defines the properties of a User Model
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
