"use client";

import { createCollection, getCollections } from "@/actions/collection";
import { createJournal } from "@/actions/journal";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  collectionSchema,
  CollectionSchemaType,
  journalSchema,
  JournalSchemaType,
} from "@/lib/form-schema";
import { getMoodById, MOODS } from "@/lib/mood";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <Skeleton className="h-[341px] w-full" />,
});

export default function JournalWritePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<JournalSchemaType>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: null,
    },
  });

  const { data: collections, isLoading: isCollectionsLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      return await getCollections();
    },
  });

  const { mutate: createEntry, isPending } = useMutation({
    mutationFn: async (data: JournalSchemaType) => {
      return createJournal({
        title: data.title,
        content: data.content,
        moodId: data.mood,
        collectionId: data.collectionId ?? null,
      });
    },
    onSuccess: () => {
      toast.success("Journal entry created successfully!");
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create journal entry"
      );
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register: registerCollection,
    handleSubmit: handleCollectionSubmit,
    formState: { errors: collectionErrors },
    reset: resetCollectionForm,
  } = useForm<CollectionSchemaType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createNewCollection, isPending: isCreatingCollection } =
    useMutation({
      mutationFn: async (data: CollectionSchemaType) => {
        return createCollection(data);
      },
      onSuccess: (newCollection) => {
        toast.success("Collection created successfully!");
        setIsDialogOpen(false);
        resetCollectionForm();
        queryClient.invalidateQueries({ queryKey: ["collections"] });
        setValue("collectionId", newCollection.id);
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Failed to create collection"
        );
      },
    });

  const handleCreateCollection = handleCollectionSubmit((data) => {
    createNewCollection(data);
  });

  const handleCollectionChange = (collectionId: string | null) => {
    setValue("collectionId", collectionId);
  };

  const onSubmit = (data: JournalSchemaType) => {
    // Only check if content is empty after stripping HTML
    const contentWithoutHtml = data.content.replace(/<[^>]*>/g, "").trim();
    if (!contentWithoutHtml) {
      return;
    }
    createEntry(data);
  };

  return (
    <div className="py-8">
      <h1 className="text-5xl md:text-6xl font-extrabold gradient-text">
        What&apos;s on your mind?
      </h1>

      <div className="h-8 relative">
        {isPending && (
          <div className="absolute inset-0 flex items-center">
            <BarLoader color="#F97316" width={"100%"} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs font-medium">Title</Label>
            <Input
              {...register("title")}
              placeholder="Give your journal a title..."
              className={`py-5 ${errors.title ? "border-red-500" : ""}`}
              disabled={isPending}
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium">How do you feel?</Label>
            <Controller
              name="mood"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} disabled={isPending}>
                  <SelectTrigger
                    className={`w-full py-5 ${
                      errors.mood ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(MOODS).map((mood) => (
                        <SelectItem key={mood.id} value={mood.id}>
                          {mood.emoji} {mood.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.mood && (
              <p className="text-red-500 text-xs">{errors.mood.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1 mt-3">
          <Label className="text-xs font-medium">
            {watch("mood")
              ? getMoodById(watch("mood"))?.prompt
              : "Write your thoughts"}
          </Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                readOnly={isPending}
                value={field.value}
                onChange={(value) => {
                  // Only check if empty after stripping HTML
                  const hasContent = value.replace(/<[^>]*>/g, "").trim();
                  field.onChange(hasContent ? value : "");
                }}
                className={`${errors.content ? "border-red-500" : ""}`}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["link"],
                    ["clean"],
                  ],
                }}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-xs">{errors.content.message}</p>
          )}
        </div>

        <div className="mt-3 justify-end flex flex-col md:flex-row gap-2 items-center">
          <div className="space-y-1 w-full md:w-auto">
            <Controller
              name="collectionId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ?? undefined}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCollectionChange(value);
                  }}
                  disabled={isCollectionsLoading}
                >
                  <SelectTrigger className="text-xs gap-1">
                    <SelectValue placeholder="Select a collection (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {collections?.length === 0 ? (
                        <div className="relative p-2 text-center text-xs text-muted-foreground">
                          No collections found!
                        </div>
                      ) : (
                        collections?.map((collection) => (
                          <SelectItem
                            key={collection.id}
                            value={collection.id}
                            className="text-xs cursor-pointer"
                          >
                            {collection.name}
                          </SelectItem>
                        ))
                      )}
                      <SelectSeparator />
                      <AlertDialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="w-full text-left px-2 py-1.5 text-xs outline-none hover:bg-accent hover:text-accent-foreground rounded-sm flex items-center gap-1"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsDialogOpen(true);
                            }}
                          >
                            <PlusIcon className="size-3" />
                            <span>Create new collection</span>
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Create new collection
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Create a new collection to organize your journal
                              entries.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <Label className="text-xs font-medium">
                                Collection name
                              </Label>
                              <Input
                                {...registerCollection("name")}
                                placeholder="e.g. Work, Personal, etc."
                                disabled={isCreatingCollection}
                                className={`text-sm ${
                                  collectionErrors.name ? "border-red-500" : ""
                                }`}
                              />
                              {collectionErrors.name && (
                                <p className="text-red-500 text-xs">
                                  {collectionErrors.name.message}
                                </p>
                              )}
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs font-medium">
                                Description (optional)
                              </Label>
                              <Textarea
                                {...registerCollection("description")}
                                placeholder="Add a description for your collection..."
                                disabled={isCreatingCollection}
                                className={`resize-none text-sm ${
                                  collectionErrors.description
                                    ? "border-red-500"
                                    : ""
                                }`}
                                rows={3}
                              />
                              {collectionErrors.description && (
                                <p className="text-red-500 text-xs">
                                  {collectionErrors.description.message}
                                </p>
                              )}
                            </div>
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={isCreatingCollection}>
                              Cancel
                            </AlertDialogCancel>
                            <Button
                              onClick={handleCreateCollection}
                              disabled={isCreatingCollection}
                              type="submit"
                            >
                              {isCreatingCollection ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Creating...
                                </>
                              ) : (
                                "Create"
                              )}
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto"
            >
              Publish
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              className="w-full md:w-auto"
            >
              Save as Draft
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
