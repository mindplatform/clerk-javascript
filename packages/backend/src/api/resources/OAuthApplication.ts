import type { OAuthApplicationJSON } from './JSON';

export class OAuthApplication {
  private _raw: OAuthApplicationJSON | null = null;

  public get raw(): OAuthApplicationJSON | null {
    return this._raw;
  }

  constructor(
    readonly id: string,
    readonly object: 'oauth_application',
    readonly instanceId: string,
    readonly name: string,
    readonly clientId: string,
    readonly public_: boolean,
    readonly scopes: string,
    readonly redirectUris: string[],
    readonly callbackUrl: string | null,
    readonly authorizeUrl: string,
    readonly tokenFetchUrl: string,
    readonly userInfoUrl: string,
    readonly discoveryUrl: string,
    readonly tokenIntrospectionUrl: string,
    readonly createdAt: number,
    readonly updatedAt: number,
    readonly clientSecret?: string,
  ) {}

  static fromJSON(data: OAuthApplicationJSON | Partial<OAuthApplicationJSON>): OAuthApplication {
    const res = new OAuthApplication(
      data.id!,
      data.object as 'oauth_application',
      data.instance_id!,
      data.name!,
      data.client_id!,
      data.public!,
      data.scopes!,
      data.redirect_uris!,
      data.callback_url || null,
      data.authorize_url!,
      data.token_fetch_url!,
      data.user_info_url!,
      data.discovery_url!,
      data.token_introspection_url!,
      data.created_at!,
      data.updated_at!,
      data.client_secret,
    );
    res._raw = data as OAuthApplicationJSON;
    return res;
  }
} 