export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-09'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3c4uripz'

// Check if Sanity is properly configured (not using placeholder values)
export const isSanityConfigured =
  projectId !== 'placeholder' &&
  dataset !== 'placeholder' &&
  projectId !== '' &&
  dataset !== ''

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
