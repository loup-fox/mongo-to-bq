import { Dataset, Job } from "@google-cloud/bigquery";
import { Arguments, BuilderCallback } from "yargs";
import * as DI from "../injection/index.js";
import fs from "fs";

type Options = {
  size: number;
};

const TABLE_NAME = "mongo-to-bq-mails";

export const command: string = "sample";

export const describe: string = "Sample requests results to CSV";

const countRows = async (dataset: Dataset, job: Job) => {
  try {
    const { projectId, datasetId, tableId } =
      job.metadata.configuration.query.destinationTable;
    const [countJob] = await dataset.createQueryJob({
      query: `SELECT COUNT(*) as total_rows FROM \`${projectId}.${datasetId}.${tableId}\``,
    });
    const [count] = await countJob.getQueryResults();
    return count[0].total_rows as number;
  } catch (e) {}
};

const getAccounts = async (dataset: Dataset) => {
  const [accountsJob] = await dataset.createQueryJob({
    query: `SELECT DISTINCT account_id FROM \`${TABLE_NAME}\``,
  });
  const [accounts] = await accountsJob.getQueryResults();
  return accounts.map((x) => x.account_id as string);
};

export const handler = async function ({
  size,
}: Arguments<Options>): Promise<void> {
  const dataset = await DI.getDataset();
  const file = fs.createWriteStream("sample.csv");

  let c = 0;
  for (const accountId of await getAccounts(dataset)) {
    if (c >= size) {
      break;
    }
    console.log(`Processing account ${accountId} (${c} / ${size})`);
    const [job] = await dataset.createQueryJob({
      query: `SELECT * FROM \`${TABLE_NAME}\` WHERE account_id = '${accountId}'`,
      useQueryCache: false,
    });
    const { totalSlotMs, totalBytesBilled } = job.metadata.statistics.query;
    const rowCount = await countRows(dataset, job);
    if (rowCount && totalSlotMs && totalBytesBilled) {
      c++;
      file.write(
        `${accountId},${rowCount},${totalBytesBilled},${totalSlotMs}\n`
      );
    }
  }
};

export const builder: BuilderCallback<{}, Options> = (yargs) => {
  return yargs.option("size", {
    alias: "s",
    type: "number",
  });
};
