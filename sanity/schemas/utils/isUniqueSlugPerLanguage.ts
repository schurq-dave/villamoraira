import type { SlugIsUniqueValidator } from "sanity"

/**
 * Allow the same slug to exist across different languages for document-level i18n.
 * This prevents publish collisions when translations intentionally share the same slug
 * (e.g. NL "/moraira" and EN "/en/moraira").
 *
 * Uniqueness is enforced per: _type + language + slug.current
 */
export const isUniqueSlugPerLanguage: SlugIsUniqueValidator = async (slug, context) => {
  // Sanity passes the candidate slug as a string to isUnique()
  const current = typeof slug === "string" ? slug : (slug as any)?.current
  if (!current) return true

  const { document, getClient } = context
  const docType = document?._type
  const language = (document as any)?.language

  // If the schema doesn't use document-level i18n (no language field), fall back to Sanity default behavior.
  if (!docType || !language) return true

  const client = getClient({ apiVersion: "2024-01-01" })
  const baseId = (document?._id || "").replace(/^drafts\./, "")
  const draftId = `drafts.${baseId}`

  // Exclude both the published and draft versions of this document
  const query = /* groq */ `
    count(*[
      _type == $type &&
      language == $language &&
      slug.current == $slug &&
      !(_id in [$baseId, $draftId])
    ])
  `

  const count = await client.fetch<number>(query, {
    type: docType,
    language,
    slug: current,
    baseId,
    draftId,
  })

  return count === 0
}


