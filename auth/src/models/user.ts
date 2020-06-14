import mongoose from "mongoose";
import { Password } from "../utils/password";

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

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // These are addition schema options to override the returned object to have a consistent response format of the "user" for all micro services.
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false, // To remove "__v" property from the response
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
