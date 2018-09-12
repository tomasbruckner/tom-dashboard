#!/bin/bash

set -e

npx adonis migration:run --force
npx adonis seed --files='ProjectExpModifierSeeder.js' --force
npx adonis seed --files='ProjectSeeder.js' --force
npx adonis seed --files='StandupProjectRatingEnumSeeder.js' --force
npx adonis seed --files='StandupSeeder.js' --force
npx adonis seed --files='UserSeeder.js' --force

npx adonis seed --files='ProjectMonthInstanceSeeder.js' --force
npx adonis seed --files='StandupProjectRatingSeeder.js' --force
