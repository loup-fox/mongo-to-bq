#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as Import from "./commands/import.js";
import * as CreateTable from "./commands/createTable.js";
import * as Sample from "./commands/sample.js";

yargs(hideBin(process.argv))
  .command(Import.command, Import.describe, Import.builder, Import.handler)
  .command(
    CreateTable.command,
    CreateTable.describe,
    CreateTable.builder,
    CreateTable.handler
  )
  .command(Sample.command, Sample.describe, Sample.builder, Sample.handler)
  .strict()
  .help()
  .alias({ h: "help" }).argv;
