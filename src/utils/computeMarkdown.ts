import { computedAsync } from '@vueuse/core'
import DOMPurify from 'dompurify'
import { marked, type MarkedOptions } from 'marked'
import { type Ref } from 'vue'

function postprocess(html: string) {
  return DOMPurify.sanitize(html)
}

marked.use({ hooks: { postprocess } })

export function computeMarkdown(
  markdown: () => string,
  options: MarkedOptions | undefined | null = undefined,
): Ref<string | null> {
  return computedAsync(async () => await marked.parse(markdown(), options), null)
}
