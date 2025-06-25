import { ScissorsIcon } from "lucide-react"

import { ComponentPickerOption } from "./component-picker-option"
import { INSERT_PAGE_BREAK } from "../page-break-plugin"

export function PageBreakPickerPlugin() {
  return new ComponentPickerOption("Page Break", {
    icon: <ScissorsIcon className="size-4" />,
    keywords: ["page break", "divider"],
    onSelect: (_, editor) =>
      editor.dispatchCommand(INSERT_PAGE_BREAK, undefined),
  })
}
