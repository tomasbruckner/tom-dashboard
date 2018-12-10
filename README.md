# From zero to hero
Little project tracking app that I made for fun at home. I use it to track progress on projects with several people.

It lets you define projects, score them from 1 to 5 rank, define sticky notes that you can use to track goals for your projects etc. It is not production-ready, but it can be useful as an internal tool.

Dev stack is Adonis with Nuxt and MySQL.
## Get started
Copy `.env.example` to `.env` and run `npm install`.

## Database
Run `init_database.sh` inside docker (otherwise it will fail).

If you need to refresh database, you can run `npx adonis migration:refresh`.
