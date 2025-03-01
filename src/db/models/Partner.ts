import { Schema, model } from "mongoose";
import { Partner } from "../../types/Partner";

const PartnerSchema = new Schema<Partner>({
  name: { type: String, required: true },
  topic: { type: String, required: true },
  url: { type: String, required: true }
});

export const PartnerModel = model('Partner', PartnerSchema);