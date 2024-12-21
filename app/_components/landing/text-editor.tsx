import { Button } from "@/components/ui/button";
import {
  BoldIcon,
  FileTextIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  UnderlineIcon,
} from "lucide-react";

export function TextEditor() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center">
          <FileTextIcon className="size-6 text-orange-600" />
        </div>
        <h3 className="text-2xl font-bold text-orange-900">Rich Text Editor</h3>
        <p className="text-orange-700">
          Express yourself with a powerful editor featuring:
        </p>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <div className="size-2 bg-orange-600 rounded-full" />
            Markdown support
          </li>
          <li className="flex items-center gap-2">
            <div className="size-2 bg-orange-600 rounded-full" />
            Formatting options
          </li>
        </ul>
      </div>

      <div className="relative rounded-lg border bg-white">
        <div className="flex items-center gap-2 border-b border-orange-200 p-2 bg-orange-50">
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 hover:bg-orange-100"
          >
            <BoldIcon className="size-4 text-orange-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 hover:bg-orange-100"
          >
            <ItalicIcon className="size-4 text-orange-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 hover:bg-orange-100"
          >
            <UnderlineIcon className="size-4 text-orange-700" />
          </Button>
          <div className="h-4 w-px bg-orange-200" />
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 hover:bg-orange-100"
          >
            <ListIcon className="size-4 text-orange-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 hover:bg-orange-100"
          >
            <ListOrderedIcon className="size-4 text-orange-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 hover:bg-orange-100"
          >
            <ImageIcon className="size-4 text-orange-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 hover:bg-orange-100"
          >
            <LinkIcon className="size-4 text-orange-700" />
          </Button>
          <div className="ml-auto flex gap-1">
            <div className="size-2 rounded-full bg-orange-200" />
            <div className="size-2 rounded-full bg-orange-300" />
            <div className="size-2 rounded-full bg-orange-400" />
          </div>
        </div>
        <div className="space-y-4 p-4">
          <div className="h-6 w-3/4 rounded bg-orange-100" />
          <div className="h-4 w-full rounded bg-orange-100" />
          <div className="h-4 w-5/6 rounded bg-orange-100" />
          <div className="h-4 w-full rounded bg-orange-100" />
          <div className="h-4 w-2/3 rounded bg-orange-100" />
        </div>
      </div>
    </div>
  );
}
