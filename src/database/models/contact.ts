import { Schema, model, models, Model } from "mongoose";

export interface IContact {
  fullName: string;
  email: string;
  message: string;
  createdAt?: Date; 
}

const contactSchema = new Schema<IContact>(
  {
    fullName: {
      type: String,
      required: [true, "El nombre completo es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      match: [/.+\@.+\..+/, "Debe ser un correo válido"],
    },
    message: {
      type: String,
      required: [true, "El mensaje es obligatorio"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const ContactModel: Model<IContact> =
  models.contactSchema || model<IContact>("Contact", contactSchema);

export default ContactModel;
