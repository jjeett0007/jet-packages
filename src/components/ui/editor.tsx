"use client"

import { useState, useRef, useEffect, JSX } from "react"
import { Button } from "../../../components/ui/button"
import { Separator } from "../../../components/ui/separator"
import { Input } from "../../../components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react"

interface EditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

export function Editor({ content, onChange, placeholder, className }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isLinkOpen, setIsLinkOpen] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content
    }
    // Update word count
    const text = content.replace(/<[^>]*>/g, "").trim()
    setWordCount(text.length)
  }, [content])

  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      onChange(newContent)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const formatBlock = (tag: string) => {
    document.execCommand("formatBlock", false, tag)
    editorRef.current?.focus()
    handleInput()
  }

  const addLink = () => {
    if (linkUrl) {
      execCommand("createLink", linkUrl)
      setLinkUrl("")
      setIsLinkOpen(false)
    }
  }

  const addImage = () => {
    if (imageUrl) {
      execCommand("insertImage", imageUrl)
      setImageUrl("")
      setIsImageOpen(false)
    }
  }

  const insertList = (ordered: boolean) => {
    execCommand(ordered ? "insertOrderedList" : "insertUnorderedList")
  }

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1">
        {/* History */}
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("undo")}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("redo")}>
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Headings */}
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => formatBlock("h1")}>
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => formatBlock("h2")}>
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => formatBlock("h3")}>
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Text formatting */}
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("bold")}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("italic")}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("underline")}>
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("strikeThrough")}>
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("formatBlock", "pre")}>
            <Code className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Lists */}
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => insertList(false)}>
            <List className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => insertList(true)}>
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => formatBlock("blockquote")}>
            <Quote className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Alignment */}
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("justifyLeft")}>
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("justifyCenter")}>
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("justifyRight")}>
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => execCommand("justifyFull")}>
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Insert */}
        <div className="flex gap-1">
          <Popover open={isLinkOpen} onOpenChange={setIsLinkOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="sm">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <Input
                  placeholder="Enter URL"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addLink()}
                />
                <Button onClick={addLink} size="sm">
                  Add Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={isImageOpen} onOpenChange={setIsImageOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="sm">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <Input
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addImage()}
                />
                <Button onClick={addImage} size="sm">
                  Add Image
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none"
        style={{
          minHeight: "300px",
          maxWidth: "none",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
        data-placeholder={placeholder}
      />

      {/* Footer */}
      <div className="border-t px-4 py-2 text-sm text-muted-foreground">{wordCount} characters</div>

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        .prose h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        
        .prose h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        
        .prose h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        
        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1em 0;
          font-style: italic;
        }
        
        .prose ul, .prose ol {
          padding-left: 2em;
          margin: 1em 0;
        }
        
        .prose pre {
          background-color: #f3f4f6;
          padding: 1em;
          border-radius: 0.375rem;
          overflow-x: auto;
        }
        
        .prose img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
        }
        
        .prose a {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
