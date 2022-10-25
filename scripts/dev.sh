#!/bin/sh
DOTENV_CONFIG_PATH=.env.local                    \
node                                             \
    -r dotenv/config                             \
    -r ts-node/register                          \
    --loader ts-node/esm                         \
    --inspect                                    \
src/index.ts        