/**
 * Custom tRPC Hooks
 * Convenient wrappers for common tRPC operations
 */

"use client";

import { trpc } from "./client";

/**
 * Hook for managing resumes with common operations
 */
export function useResumes() {
  const utils = trpc.useUtils();

  const list = trpc.resume.list.useQuery();
  const create = trpc.resume.create.useMutation({
    onSuccess: () => {
      utils.resume.list.invalidate();
      utils.user.stats.invalidate();
    },
  });
  const update = trpc.resume.update.useMutation({
    onSuccess: () => {
      utils.resume.list.invalidate();
    },
  });
  const deleteResume = trpc.resume.delete.useMutation({
    onSuccess: () => {
      utils.resume.list.invalidate();
      utils.user.stats.invalidate();
    },
  });
  const duplicate = trpc.resume.duplicate.useMutation({
    onSuccess: () => {
      utils.resume.list.invalidate();
      utils.user.stats.invalidate();
    },
  });

  return {
    resumes: list.data ?? [],
    isLoading: list.isLoading,
    error: list.error,
    create,
    update,
    delete: deleteResume,
    duplicate,
    refetch: list.refetch,
  };
}

/**
 * Hook for fetching a single resume
 */
export function useResume(id: string | null) {
  const utils = trpc.useUtils();

  const query = trpc.resume.getById.useQuery(
    { id: id! },
    { enabled: !!id }
  );

  const update = trpc.resume.update.useMutation({
    onSuccess: () => {
      utils.resume.getById.invalidate({ id: id! });
      utils.resume.list.invalidate();
    },
  });

  return {
    resume: query.data,
    isLoading: query.isLoading,
    error: query.error,
    update,
    refetch: query.refetch,
  };
}

/**
 * Hook for user data and stats
 */
export function useCurrentUser() {
  const user = trpc.user.me.useQuery();
  const stats = trpc.user.stats.useQuery();

  return {
    user: user.data,
    stats: stats.data,
    isLoading: user.isLoading || stats.isLoading,
    error: user.error || stats.error,
  };
}

/**
 * Hook for optimistic resume updates
 * Updates the UI immediately while the request is in flight
 */
export function useOptimisticResumeUpdate(resumeId: string) {
  const utils = trpc.useUtils();

  return trpc.resume.update.useMutation({
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await utils.resume.getById.cancel({ id: resumeId });

      // Snapshot the previous value
      const previousResume = utils.resume.getById.getData({ id: resumeId });

      // Optimistically update to the new value
      if (previousResume) {
        utils.resume.getById.setData({ id: resumeId }, {
          ...previousResume,
          ...newData,
        });
      }

      return { previousResume };
    },
    onError: (err, newData, context) => {
      // Rollback on error
      if (context?.previousResume) {
        utils.resume.getById.setData(
          { id: resumeId },
          context.previousResume
        );
      }
    },
    onSettled: () => {
      // Refetch after success or error
      utils.resume.getById.invalidate({ id: resumeId });
      utils.resume.list.invalidate();
    },
  });
}
