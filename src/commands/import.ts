import { BigQueryDatetime, BigQueryTimestamp } from "@google-cloud/bigquery";
import {
  bufferCount,
  concatMap,
  finalize,
  from,
  map,
  mergeMap,
  tap,
} from "rxjs";
import { Arguments, BuilderCallback } from "yargs";
import * as DI from "../injection/index.js";
import { Mail } from "../types/Mail.js";

const TABLE_NAME = "mongo-to-bq-mails";

type Options = {};

export const command: string = "import";

export const describe: string = "Import mails into BigQuery from MongoDB";

export const handler = async function (_: Arguments<Options>): Promise<void> {
  const collections = await DI.getCollections();
  const dataset = await DI.getDataset();
  const table = dataset.table(TABLE_NAME);

  const formatToBq = (mail: Mail) => {
    return {
      account_id: mail.accountId.toString(),
      account_localization: mail.accountLocalization,
      box_name: mail.boxName,
      created_at: new BigQueryTimestamp(mail.createdAt),
      created_at_day: new BigQueryTimestamp(mail.createdAtDay),
      date: new BigQueryTimestamp(mail.date),
      date_day: new BigQueryTimestamp(mail.dateDay),
      deleted_at: mail.deletedAt && new BigQueryTimestamp(mail.deletedAt),
      deleted_at_day:
        mail.deletedAtDay && new BigQueryTimestamp(mail.deletedAtDay),
      domain: mail.domain,
      expires_at: mail.expiresAt && new BigQueryTimestamp(mail.expiresAt),
      expires_at_day:
        mail.expiresAtDay && new BigQueryTimestamp(mail.expiresAtDay),
      from: mail.from,
      is_spam: mail.isSpam,
      is_trash: mail.isTrash,
      list_unsubscribe: mail.listUnsubscribe,
      name: mail.name,
      newsletter: mail.newsletter,
      seen: mail.seen,
      signature: mail.signature,
      uid: mail.uid,
      updated_at: new BigQueryTimestamp(mail.updatedAt),
      updated_at_day: new BigQueryTimestamp(mail.updatedAtDay),
      user_id: mail.userId.toString(),
    };
  };

  console.log("> Starting import");
  from(collections.accounts.aggregate([{ $sample: { size: 10000 } }]))
    .pipe(
      tap((account) =>
        console.log(`Processing account ${account._id.toString()}...`)
      ),
      concatMap((account) =>
        from(collections.mails.find({ accountId: account._id }))
      ),
      map(formatToBq),
      bufferCount(1000),
      tap((mails) => console.log(`Inserting ${mails.length} mails...`)),
      concatMap((rawBuffer) => table.insert(rawBuffer)),
      tap(() => console.log(`Inserted.`)),
      finalize(() => console.log("> Import finished!"))
    )
    .subscribe();
};

export const builder: BuilderCallback<{}, Options> = (yargs) => {
  return yargs;
};
