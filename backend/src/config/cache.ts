import { CacheModuleOptions } from '@nestjs/cache-manager';
import { env } from './env';
import KeyvRedis from '@keyv/redis';

const factory: () => Promise<
  CacheModuleOptions<Record<string, any>>
> = async () => {
  return {
    stores: [
      new KeyvRedis({
        url: env.REDIS_URL,
        socket: {
          connectTimeout: 100000,
          reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
          keepAlive: 10000,
        },
      }),
    ],
    isGlobal: true,
  };
};

export const cacheConfig = {
  isGlobal: true,
  useFactory: factory,
};
