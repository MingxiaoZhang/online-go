import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
  const roomIdCounter = await redisClient.get('roomIdCounter');
  if (roomIdCounter === null) {
    await redisClient.set('roomIdCounter', '0');
    console.log('Initialized roomIdCounter to 0');
  }
})();

export default redisClient;
