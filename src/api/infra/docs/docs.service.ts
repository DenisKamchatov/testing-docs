import { createApiClient } from '../base-client';

import type { IDocument, IDocumentsParams } from './typings';

import { buildQuery } from '@/api/utils/build-query';

export const getDocuments = (params: IDocumentsParams = {}): Promise<IDocument[]> => {
  const queryString = buildQuery(params);
  const url = `/user/docs${queryString ? `?${queryString}` : ''}`;
  return createApiClient(url);
};