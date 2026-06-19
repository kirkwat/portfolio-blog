'use client';

import { useEffect } from 'react';

import { useIsPresentationTool } from 'next-sanity/hooks';
import { toast } from 'sonner';

export function DraftModeToast({ action }: { action: () => Promise<void> }) {
  const isPresentationTool = useIsPresentationTool();

  useEffect(() => {
    /**
     * We don't want to show the toast if we're inside the Presentation Tool iframe or a preview popup window.
     * `useIsPresentationTool` is `null` initially, and then `false` when it's determined that we're not in Presentation Tool
     */
    if (isPresentationTool === false) {
      const toastId = toast('Draft Mode Enabled', {
        id: 'draft-mode-toast',
        description: 'Content is live, refreshing automatically',
        duration: Infinity,
        action: {
          label: 'Disable',
          onClick: () =>
            toast.promise(action(), { loading: 'Disabling draft mode…' }),
        },
      });
      return () => {
        // If this component is unmounted we assume it's because draft mode is no longer enabled
        toast.dismiss(toastId);
      };
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- `action` is a stable server-action reference
  }, [isPresentationTool]);

  return null;
}
