import * as jwt from 'jsonwebtoken';

export function mapFromArray<T>(
  array: T[],
  keyStrategy: (v: T) => string | number,
) {
  const map: Record<string | number, T | undefined> = {};

  for (const item of array) {
    map[keyStrategy(item)] = item;
  }

  return map;
}

/**
 * Verifies jwt token and returns decoded result
 * @param token - Jwt token
 * @param salt - Secret salt
 */
export function verifyJwtToken<
  R extends Record<string, any> = Record<string, any>,
>(token: string, salt: string) {
  try {
    return token ? (jwt.verify(token, salt) as R) : undefined;
  } catch {
    return undefined;
  }
}

export const isObjectIdLike = (value: string): boolean => {
  return value.length === 24 && value.search(' ') < 0;
};

/**
 * Returns serverKey from url string
 * @param url - Website url
 */
export function getServerKeyFromUrl(url: string) {
  try {
    const urlParsed = new URL(url);
    const [serverKey] = urlParsed.host.split('.');

    return serverKey;
  } catch {
    return undefined;
  }
}
