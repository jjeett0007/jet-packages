"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Textarea } from "../../../components/ui/textarea"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
} from "lucide-react"
import { Separator } from "../../../components/ui/separator"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const insertText = (before: string, after = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatButtons = [
    { icon: Bold, action: () => insertText("**", "**"), title: "Bold" },
    { icon: Italic, action: () => insertText("*", "*"), title: "Italic" },
    { icon: Underline, action: () => insertText("<u>", "</u>"), title: "Underline" },
    { icon: Code, action: () => insertText("`", "`"), title: "Code" },
  ]

  const structureButtons = [
    { icon: List, action: () => insertText("\n- "), title: "Bullet List" },
    { icon: ListOrdered, action: () => insertText("\n1. "), title: "Numbered List" },
    { icon: Quote, action: () => insertText("\n> "), title: "Quote" },
  ]

  const alignButtons = [
    { icon: AlignLeft, action: () => insertText('<div style="text-align: left;">', "</div>"), title: "Align Left" },
    {
      icon: AlignCenter,
      action: () => insertText('<div style="text-align: center;">', "</div>"),
      title: "Align Center",
    },
    { icon: AlignRight, action: () => insertText('<div style="text-align: right;">', "</div>"), title: "Align Right" },
  ]

  const insertLink = () => {
    const url = prompt("Enter URL:")
    const text = prompt("Enter link text:")
    if (url && text) {
      insertText(`<a href="${url}">${text}</a>`)
    }
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:")
    const alt = prompt("Enter alt text:")
    if (url) {
      insertText(`<img src="${url}" alt="${alt || ""}" style="max-width: 100%; height: auto;" />`)
    }
  }

  const insertHeading = (level: number) => {
    insertText(`\n${"#".repeat(level)} `)
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1">
        {/* Headings */}
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(1)} title="Heading 1">
            H1
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(2)} title="Heading 2">
            H2
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertHeading(3)} title="Heading 3">
            H3
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Format buttons */}
        <div className="flex gap-1">
          {formatButtons.map((button, index) => (
            <Button key={index} type="button" variant="ghost" size="sm" onClick={button.action} title={button.title}>
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Structure buttons */}
        <div className="flex gap-1">
          {structureButtons.map((button, index) => (
            <Button key={index} type="button" variant="ghost" size="sm" onClick={button.action} title={button.title}>
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Alignment buttons */}
        <div className="flex gap-1">
          {alignButtons.map((button, index) => (
            <Button key={index} type="button" variant="ghost" size="sm" onClick={button.action} title={button.title}>
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Insert buttons */}
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={insertLink} title="Insert Link">
            <Link className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={insertImage} title="Insert Image">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Preview toggle */}
        <Button
          type="button"
          variant={isPreview ? "default" : "ghost"}
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
        >
          {isPreview ? "Edit" : "Preview"}
        </Button>
      </div>

      {/* Editor/Preview */}
      <div className="p-4">
        {isPreview ? (
          <div className="prose max-w-none min-h-[300px]" dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[300px] border-0 resize-none focus-visible:ring-0"
          />
        )}
      </div>

      {/* Word count */}
      <div className="border-t px-4 py-2 text-sm text-muted-foreground">{value.length} characters</div>
    </div>
  )
}
