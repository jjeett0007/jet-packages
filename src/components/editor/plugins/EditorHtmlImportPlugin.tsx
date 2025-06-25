"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect } from "react"
import { $generateNodesFromDOM } from "@lexical/html"
import { $getRoot } from "lexical"

export function EditorHtmlImportPlugin({
  html,
}: {
  html: string | null
}) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!html) return

    const parser = new DOMParser()
    const dom = parser.parseFromString(html, "text/html")

    editor.update(() => {
      const root = $getRoot()
      root.clear()
      const nodes = $generateNodesFromDOM(editor, dom)
      root.append(...nodes)
    })
  }, [editor, html])

  return null
}
