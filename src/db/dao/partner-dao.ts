import { Partner } from "../../types/Partner";
import { PartnerModel } from "../models/Partner";
import { transformMongoId } from "../../utils";

export const createPartner = async (Partner: Partner): Promise<Partner> => {
  const created = await PartnerModel.create(Partner);
  return created.toObject({ transform: transformMongoId });
}

export const partnerFindById =  async (id: string): Promise<Partner | null> => {
  const partner = await PartnerModel.findById(id);
  return partner ? partner.toObject({ transform: transformMongoId }) : null;
}

export const partnerFindByName = async (name: string): Promise<Partner | null> => {
  const partner = await PartnerModel.findOne({ name });
  return partner ? partner.toObject({ transform: transformMongoId }) : null;
};

export const partnerFindByNameAndTopic = async ({name, topic}: {name: string, topic: string}): Promise<Partner | null> => {
  const partner = await PartnerModel.findOne({ name, topic });
  return partner ? partner.toObject({ transform: transformMongoId }) : null;
};