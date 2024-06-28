import * as safeJsonStringify from 'safe-json-stringify';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosInstance } from 'axios';

import { ConfigService } from '@config';

import {
  IDiscrodAccessToken,
  IDiscrodGuild,
  IDiscrodUser,
} from './interfaces/discord.interface';

@Injectable()
export class DiscordClient {
  private readonly logger: Logger = new Logger(DiscordClient.name);
  private readonly axios: AxiosInstance;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.axios = this.httpService.axiosRef;

    this.axios.defaults.baseURL = `https://discord.com/api/v10`;
    this.axios.defaults.headers.common['Content-Type'] =
      'application/x-www-form-urlencoded';

    this.axios.interceptors.request.use((request) => {
      this.logger.log(
        `Requesting Discord API ${request.url} with data: ${safeJsonStringify(
          request.data,
        )}`,
      );

      return request;
    });

    this.axios.interceptors.response.use(
      (response) => {
        const data = `with data: ${safeJsonStringify(response.data)}`;

        this.logger.log(
          `Response from Discord API ${response.config.url} ${data}`,
        );
        return response;
      },
      (error) => {
        this.logger.error(
          `Error ${error.response.status} from Discord API "${
            error.response.statusText
          }" with data: ${safeJsonStringify(error.response.data)}`,
        );
        return Promise.reject(error);
      },
    );
  }

  async getAccessToken(code: string): Promise<IDiscrodAccessToken> {
    const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } =
      this.configService.get().connections.discord;
    try {
      const { data } = await this.axios.post(`oauth2/token`, {
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: DISCORD_REDIRECT_URI,
      });

      return data;
    } catch (_error: unknown) {
      const error = _error as AxiosError;

      this.logger.debug(error);

      return undefined;
    }
  }

  async getUser(token: string): Promise<IDiscrodUser> {
    try {
      const { data } = await this.axios.get('/users/@me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (_error: unknown) {
      const error = _error as AxiosError;

      this.logger.debug(error);

      return undefined;
    }
  }

  async getUserGuilds(token: string): Promise<IDiscrodGuild[]> {
    try {
      const { data } = await this.axios.get('/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (_error: unknown) {
      const error = _error as AxiosError;

      this.logger.debug(error);

      return [];
    }
  }
  async refreshAccessToken(refreshToken: string): Promise<IDiscrodAccessToken> {
    const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } =
      this.configService.get().connections.discord;
    try {
      const { data } = await this.axios.post('/oauth2/token', {
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });

      return data;
    } catch (_error: unknown) {
      const error = _error as AxiosError;

      this.logger.debug(error);

      return undefined;
    }
  }
}
