import { Platform, useWindowDimensions } from 'react-native';

import { useHasHydrated } from '@/hooks/use-has-hydrated';

/** Window width (px) from which the web app lays out for a desktop or tablet instead of a phone. */
export const WIDE_MIN_WIDTH = 900;
/** Width of the panels that float over a map on a wide screen (search, drawers). */
export const PANEL_WIDTH = 400;
/** Widest a page of text and lists gets (Schedule, Settings), so lines stay readable. */
export const CONTENT_MAX_WIDTH = 720;

/**
 * True on a wide web window: a side rail instead of the bottom tab bar, panels instead of edge-to-edge
 * sheets. False until hydration, since the pre-rendered page is built with no window (see useHasHydrated).
 */
export function useWideLayout() {
  const { width } = useWindowDimensions();
  const hydrated = useHasHydrated();
  return Platform.OS === 'web' && hydrated && width >= WIDE_MIN_WIDTH;
}
