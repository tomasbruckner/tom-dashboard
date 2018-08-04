#!/usr/bin/env bash

npx adonis migration:run
npx adonis seed --files='ProjectExpModifierSeeder.js'
npx adonis seed --files='ProjectSeeder.js'
npx adonis seed --files='StandupProjectRatingEnumSeeder.js'
npx adonis seed --files='StandupSeeder.js'
npx adonis seed --files='UserSeeder.js'

npx adonis seed --files='ProjectMonthInstanceSeeder.js'
npx adonis seed --files='StandupProjectRatingSeeder.js'
