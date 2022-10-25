import { Dataset } from "@google-cloud/bigquery";
export const createTable = async (dataset: Dataset, name: string) => {
  await dataset.createTable(name, {
    clustering: {
      fields: ["account_id"],
    },
    schema: [
      {
        name: "account_id",
        type: "STRING",
        mode: "REQUIRED",
      },
      {
        name: "user_id",
        type: "STRING",
        mode: "REQUIRED",
      },
      {
        name: "uid",
        type: "STRING",
        mode: "REQUIRED",
      },
      {
        name: "box_name",
        type: "STRING",
        mode: "REQUIRED",
      },
      {
        name: "signature",
        type: "STRING",
        mode: "NULLABLE",
      },
      {
        name: "is_spam",
        type: "BOOLEAN",
        mode: "NULLABLE",
      },
      {
        name: "is_trash",
        type: "BOOLEAN",
        mode: "NULLABLE",
      },
      {
        name: "date",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
      {
        name: "seen",
        type: "BOOLEAN",
        mode: "NULLABLE",
      },
      {
        name: "domain",
        type: "STRING",
        mode: "NULLABLE",
      },
      {
        name: "account_localization",
        type: "STRING",
        mode: "NULLABLE",
      },
      {
        name: "from",
        type: "STRING",
        mode: "NULLABLE",
      },
      {
        name: "name",
        type: "STRING",
        mode: "NULLABLE",
      },
      {
        name: "list_unsubscribe",
        type: "STRING",
        mode: "NULLABLE",
      },
      {
        name: "expires_at",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
      {
        name: "expires_at_day",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
      {
        name: "newsletter",
        type: "BOOLEAN",
        mode: "NULLABLE",
      },
      {
        name: "created_at",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
      {
        name: "created_at_day",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
      {
        name: "updated_at",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
      {
        name: "updated_at_day",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
      {
        name: "date_day",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
      {
        name: "deleted_at",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
      {
        name: "deleted_at_day",
        type: "TIMESTAMP",
        mode: "NULLABLE",
      },
    ],
  });
};
