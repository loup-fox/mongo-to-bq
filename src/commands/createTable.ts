import { Arguments, BuilderCallback } from "yargs";
import * as DI from "../injection/index.js";
import { createTable } from "../lib/createTable.js";

const TABLE_NAME = "mongo-to-bq-mails";

type Options = {};

export const command: string = "create-table";

export const describe: string = "Create mails table in BigQuery";

export const handler = async function (_: Arguments<Options>): Promise<void> {
  const dataset = await DI.getDataset();
  await createTable(dataset, TABLE_NAME);
};

export const builder: BuilderCallback<{}, Options> = (yargs) => {
  return yargs;
};
