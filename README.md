# Core Bote

Core application of Bote App & Chatbot.

***

# Getting Started
1. Clone **bote_core** repository. `git clone https://github.com/questronix/bote_core.git`
2. Go to **bote_core** folder. `cd bote_core`
3. Use the **develop** branch. `git checkout develop`
4. Pull the latest changes. `git pull`
5. Install the **packages**. `npm install`
6. Create a **copy** of `.env.config` then rename it to `.env`
7. Set the values of **.env**.
   * **PORT** should have unique port.
   * **CORE_DB_****** setup is based on your own config.
   * **SKIP_REDIS**=true if you don't have redis.
   * **CHAT_****** setup is based on workspace config.
8. Run the application. `npm start` or `npm run dev`

***

# FAQs
1. I don't have `redis` inside my machine.
    * Disable `redis` in app
      * Add `true` in `SKIP_REDIS` inside `.env`
    * Create `redis container`
      * Install `docker` app
      * Install `redis` by using the command `docker run --name some-redis -d redis`
2. I can't start `server.js` missing config.
    * Create `.env` by simply copying `.env.config` default values
    * Put some values base on your machine config (`mysql`, `redis`, `port`, etc...)