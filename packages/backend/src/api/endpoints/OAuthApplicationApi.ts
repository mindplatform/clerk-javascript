import type { ClerkPaginationRequest } from '@clerk/types';

import { joinPaths } from '../../util/path';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { OAuthApplication } from '../resources/OAuthApplication';
import { AbstractAPI } from './AbstractApi';

const basePath = '/oauth_applications';

// Parameters for creating/updating OAuth applications
interface OAuthApplicationParams extends Record<string, unknown> {
  name: string;
  redirect_uris?: string[];
  callback_url?: string;
  scopes?: string;
  public?: boolean;
}

type ListOAuthApplicationsParams = ClerkPaginationRequest<Record<string, never>>;

export class OAuthApplicationAPI extends AbstractAPI {
  /**
   * Get a list of OAuth applications for an instance
   */
  public async getOAuthApplicationList(params: ListOAuthApplicationsParams = {}) {
    return this.request<PaginatedResourceResponse<OAuthApplication[]>>({
      method: 'GET',
      path: basePath,
      queryParams: params,
    });
  }

  /**
   * Create a new OAuth application
   */
  public async createOAuthApplication(params: OAuthApplicationParams) {
    return this.request<OAuthApplication>({
      method: 'POST',
      path: basePath,
      bodyParams: params as Record<string, unknown>,
    });
  }

  /**
   * Retrieve an OAuth application by ID
   */
  public async getOAuthApplication(oauthApplicationId: string) {
    this.requireId(oauthApplicationId);
    return this.request<OAuthApplication>({
      method: 'GET',
      path: joinPaths(basePath, oauthApplicationId),
    });
  }

  /**
   * Update an OAuth application
   */
  public async updateOAuthApplication(oauthApplicationId: string, params: Partial<OAuthApplicationParams>) {
    this.requireId(oauthApplicationId);
    return this.request<OAuthApplication>({
      method: 'PATCH',
      path: joinPaths(basePath, oauthApplicationId),
      bodyParams: params as Record<string, unknown>,
    });
  }

  /**
   * Delete an OAuth application
   */
  public async deleteOAuthApplication(oauthApplicationId: string) {
    this.requireId(oauthApplicationId);
    return this.request<{ object: string; id: string; slug: string; deleted: boolean }>({
      method: 'DELETE',
      path: joinPaths(basePath, oauthApplicationId),
    });
  }

  /**
   * Rotate the client secret of an OAuth application
   */
  public async rotateOAuthApplicationSecret(oauthApplicationId: string) {
    this.requireId(oauthApplicationId);
    return this.request<OAuthApplication>({
      method: 'POST',
      path: joinPaths(basePath, oauthApplicationId, 'rotate_secret'),
    });
  }
} 