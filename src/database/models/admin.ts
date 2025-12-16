import { Schema, model, Model } from "mongoose";

const AdminSchema = new Schema(
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
      default: "administrator",
    },
  }, { versionKey: false, timestamps: true });

// Utiliza un patrón singleton para garantizar que solo se compile una instancia del modelo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let AdminModel: Model<any>;



try {

    AdminModel = model("administrator");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (error) {

    AdminModel = model("administrator", AdminSchema);
}



export default AdminModel;