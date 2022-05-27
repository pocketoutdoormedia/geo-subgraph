import { Hikes } from './types';
import { DataSources } from '..';

async function resolveHikeReference(
  reference: Pick<Hikes, 'hikes'>,
  ctx: { dataSources: DataSources } & any
): Promise<Hikes> {
  return ctx.dataSources.gaiaApi.getNearbyHikes({});
}

export const HikeReferenceResolver = {
  __resolveReference: resolveHikeReference
};
