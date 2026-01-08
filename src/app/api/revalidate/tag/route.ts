import { revalidateTag } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"
import { parseBody } from "next-sanity/webhook"

type WebhookPayload = {
  tags?: string[]
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return new Response("Missing SANITY_REVALIDATE_SECRET", { status: 500 })
  }

  const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true)

  if (!isValidSignature) {
    return new Response("Invalid signature", { status: 401 })
  }

  const tags = body?.tags
  if (!Array.isArray(tags) || tags.length === 0) {
    return new Response("Missing tags", { status: 400 })
  }

  // For webhook-triggered updates we want immediate expiration
  tags.forEach((tag) => revalidateTag(tag, { expire: 0 }))

  return NextResponse.json({ revalidated: tags })
}


