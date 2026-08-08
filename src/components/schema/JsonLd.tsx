/**
 * JsonLd — server component that injects a JSON-LD <script> tag into the page.
 *
 * Usage:
 *   import { JsonLd } from "@/components/schema/JsonLd";
 *   import { buildLocalBusinessSchema } from "@/lib/schema";
 *
 *   // Single schema object
 *   <JsonLd schema={buildLocalBusinessSchema()} />
 *
 *   // Multiple schemas rendered as a JSON-LD array
 *   <JsonLd schema={[buildLocalBusinessSchema(), buildFAQSchema(faqs)]} />
 */

export interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
