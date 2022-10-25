import { BigQuery } from "@google-cloud/bigquery";
import _ from "lodash";
import { MongoClient } from "mongodb";
import { DATASET_NAME, MONGO_URL, PROJECT_ID } from "../config.js";
import { Account } from "../types/Account.js";
import { Mail } from "../types/Mail.js";

export const getCollections = _.memoize(async () => {
  const mongo = new MongoClient(MONGO_URL);
  const db = mongo.db("service-foxbrain");
  await mongo.connect();
  const collections = {
    mails: db.collection<Mail>("mails"),
    accounts: db.collection<Account>("accounts"),
  };
  return collections;
});

export const getDataset = _.memoize(async () => {
  const bq = new BigQuery({
    projectId: PROJECT_ID,
  });
  const dataset = bq.dataset(DATASET_NAME);
  const [datasetExists] = await dataset.exists();
  if (!datasetExists) {
    throw new Error(`Dataset ${DATASET_NAME} does not exist`);
  }
  return dataset;
});

export const getMailsLastUpdateTable = _.memoize(async () => {
  const TABLE_NAME = "mongo-to-bq-mails-last-update";
  const dataset = await getDataset();
  const table = dataset.table(TABLE_NAME);
  const [tableExists] = await table.exists();
  if (!tableExists) {
    throw new Error(`Table ${DATASET_NAME}.${TABLE_NAME} does not exist`);
  }
  return table;
});
