# Bote

Core application of Bote App.

# FAQs
1. I don't have `redis` inside my machine.
  1. Disable `redis` in app
    - Add `true` in `SKIP_REDIS` inside `.env`

  2. Create `redis container`
    - Install `docker` app
    - Install `redis` by using the command `docker run --name some-redis -d redis`

2. I can't start `server.js` missing config.
  - Create `.env` by simply copying `.env.config` default values
  - Put some values base on your machine config (`mysql`, `redis`, `por.t`, etc...)