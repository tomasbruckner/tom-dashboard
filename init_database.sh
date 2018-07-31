#!/usr/bin/env bash

npx adonis migration:run
npx adonis seed
npx adonis seed --files='ProjectMonthInstanceSeeder.js'
npx adonis seed --files='StandupProjectRatingSeeder.js'
