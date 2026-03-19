import { createClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId } from '../env'

export { isSanityConfigured }

export const client = createClient({
  projectId: projectId || 'dummy-project-id',
  dataset: dataset || 'production',
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
