"use client";

import {
  InitialConfigType,
  LexicalComposer
} from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, SerializedEditorState } from "lexical";

import { editorTheme } from "../../../components/editor/themes/editor-theme";
import { TooltipProvider } from "../../../components/ui/tooltip";

import { nodes } from "./nodes";
import { Plugins } from "./plugins";
import { EditorHtmlExportPlugin } from "../../../components/editor/plugins/EditorHtmlExportPlugin";
import { EditorHtmlImportPlugin } from "../../../components/editor/plugins/EditorHtmlImportPlugin";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  }
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  onHtmlChange,
  htmlToLoad
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  onHtmlChange?: (html: string) => void;
  htmlToLoad?: string;
}) {
  return (
    <div className="bg-background overflow-hidden rounded-lg border shadow h-[70vh]">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {})
        }}
      >
        <TooltipProvider>
          <Plugins />

          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState) => {
              onChange?.(editorState);
              onSerializedChange?.(editorState.toJSON());
            }}
          />

          {onHtmlChange && (
            <EditorHtmlExportPlugin onHtmlChange={onHtmlChange} />
          )}

          {htmlToLoad && <EditorHtmlImportPlugin html={htmlToLoad} />}
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}
