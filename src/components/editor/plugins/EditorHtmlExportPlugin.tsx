"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect } from "react"
import { $generateHtmlFromNodes } from "@lexical/html"

export function EditorHtmlExportPlugin({
  onHtmlChange,
}: {
  onHtmlChange: (html: string) => void
}) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor, null)
        onHtmlChange(html)
      })
    })
  }, [editor, onHtmlChange])

  return null
}
