import { FrameIcon } from "lucide-react"

import { ComponentPickerOption } from "./component-picker-option"
import { INSERT_EXCALIDRAW_COMMAND } from "../excalidraw-plugin"

export function ExcalidrawPickerPlugin() {
  return new ComponentPickerOption("Excalidraw", {
    icon: <FrameIcon className="size-4" />,
    keywords: ["excalidraw", "diagram", "drawing"],
    onSelect: (_, editor) =>
      editor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, undefined),
  })
}
