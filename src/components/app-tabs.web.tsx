import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Polygon } from 'react-native-svg';

import { TabIcon, type TabIconName } from '@/components/tab-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useWideLayout } from '@/hooks/use-wide-layout';

// On a phone, a bottom tab bar like the native one, laid out in flow (not floating) so it never
// covers the screen above it. On a wide window, a rail down the left side (row-reverse: the list is
// declared after the slot).
export default function AppTabs() {
  const wide = useWideLayout();
  return (
    <Tabs style={[styles.tabs, wide && styles.tabsWide]}>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="map" href="/map" asChild>
            <TabButton icon="map">Map</TabButton>
          </TabTrigger>
          <TabTrigger name="schedule" href="/schedule" asChild>
            <TabButton icon="schedule">Schedule</TabButton>
          </TabTrigger>
          <TabTrigger name="parking" href="/parking" asChild>
            <TabButton icon="parking">Parking</TabButton>
          </TabTrigger>
          <TabTrigger name="settings" href="/settings" asChild>
            <TabButton icon="settings">Settings</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  children,
  isFocused,
  icon,
  ...props
}: TabTriggerSlotProps & { icon: TabIconName }) {
  const theme = useTheme();
  const wide = useWideLayout();

  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      style={({ hovered }: { hovered?: boolean }) => [
        styles.tabButton,
        wide ? styles.railButton : styles.barButton,
        wide && (isFocused || hovered) && { backgroundColor: theme.backgroundSelected },
      ]}>
      <View style={styles.tabIcon}>
        <TabIcon name={icon} color={isFocused ? theme.text : theme.textSecondary} />
      </View>
      <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

function CustomTabList({ children, ...props }: TabListProps) {
  // Clears the iPhone home bar (needs viewport-fit=cover, set in +html.tsx).
  const { bottom } = useSafeAreaInsets();
  const wide = useWideLayout();
  const theme = useTheme();
  if (wide) {
    return (
      // The page color, not the map's gray, with a hairline, so the rail reads as apart from the map.
      <ThemedView
        {...props}
        type="background"
        style={[styles.rail, { borderRightColor: theme.backgroundSelected }]}>
        <View style={styles.logo} accessibilityLabel="Mavigator">
          <MavigatorPin />
        </View>
        {children}
      </ThemedView>
    );
  }
  return (
    <ThemedView
      {...props}
      type="backgroundElement"
      style={[styles.tabList, { paddingBottom: Spacing.one + bottom }]}>
      {children}
    </ThemedView>
  );
}

/** The app icon's pin (assets/images/icon-transparent.svg), at the top of the rail. */
function MavigatorPin() {
  return (
    <Svg width={28} height={44} viewBox="226 58 572 908">
      <Path
        d="M 512 962.0 C 413.6 708.9 230.75 540.1 230.75 343.2 A 281.25 281.25 0 1 1 793.25 343.2 C 793.25 540.1 610.4 708.9 512 962.0 Z"
        fill="#0064B1"
      />
      <Circle cx={512} cy={343.2} r={174.4} fill="#FFFFFF" />
      <Polygon
        points="512.0,213.9 543.6,311.0 645.7,311.0 563.1,371.1 594.7,468.3 512.0,408.2 429.3,468.3 460.9,371.1 378.3,311.0 480.4,311.0"
        fill="#F58025"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
  tabsWide: {
    flexDirection: 'row-reverse',
  },
  slot: {
    flex: 1,
  },
  tabList: {
    flexDirection: 'row',
    paddingTop: Spacing.one,
  },
  rail: {
    width: 88,
    borderRightWidth: 1,
    alignItems: 'stretch',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.three,
  },
  logo: {
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: Spacing.one,
  },
  barButton: {
    flex: 1,
  },
  railButton: {
    paddingVertical: Spacing.two,
    borderRadius: 12,
  },
  tabIcon: {
    marginBottom: Spacing.half,
  },
});
