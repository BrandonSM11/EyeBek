import { Schema, model, Model } from "mongoose";

const CoderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    document: String,
    phone: String,
    photo: String,
    status: Boolean,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "coder",
    },
  }, { versionKey: false, timestamps: true });

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let CoderModel: Model<any>;



try {

    CoderModel = model("coders");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {

    CoderModel = model("coders", CoderSchema);
}



export default CoderModel;