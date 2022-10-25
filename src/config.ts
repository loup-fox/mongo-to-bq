import env from "env-var";

export const MONGO_URL = env.get("MONGO_URL").required().asString();
export const PROJECT_ID = env.get("PROJECT_ID").required().asString();
export const DATASET_NAME = env.get("DATASET_NAME").required().asString();
