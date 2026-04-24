const redis = require("../config/redis");

const getCache = async (key) => {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
};

const setCache = async (key, data, ttlInSeconds = 300) => {
  await redis.set(key, JSON.stringify(data), "EX", ttlInSeconds);
};

const deleteCache = async (key) => {
  await redis.del(key);
};

const deleteByPattern = async (pattern) => {
  const stream = redis.scanStream({ match: pattern });
  const keys = [];

  return new Promise((resolve, reject) => {
    stream.on("data", (resultKeys) => {
      for (const key of resultKeys) {
        keys.push(key);
      }
    });

    stream.on("end", async () => {
      if (keys.length) {
        await redis.del(keys);
      }
      resolve();
    });

    stream.on("error", reject);
  });
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
  deleteByPattern,
};
