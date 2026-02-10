import { ScrollView, View } from 'react-native';

import { Skeleton } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';

const SHELF_ITEM_WIDTH = 160;
const SKELETON_SHELF_COUNT = 4;

function HomeSkeleton() {
  const { theme } = useTheme();
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <Skeleton
        variant="rounded"
        width="100%"
        height={180}
        style={{ marginBottom: theme.spacing[4] }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: theme.spacing[2] }}
      >
        {Array.from({ length: SKELETON_SHELF_COUNT }).map((_, index) => (
          <View
            key={index}
            style={{
              width: SHELF_ITEM_WIDTH,
              marginRight: index < SKELETON_SHELF_COUNT - 1 ? theme.spacing[4] : 0,
            }}
          >
            <Skeleton
              variant="rounded"
              width={SHELF_ITEM_WIDTH}
              height={SHELF_ITEM_WIDTH}
              style={{ marginBottom: theme.spacing[2] }}
            />
            <Skeleton
              variant="text"
              width="90%"
              height={14}
              style={{ marginBottom: theme.spacing[1] }}
            />
            <Skeleton variant="text" width="50%" height={12} />
          </View>
        ))}
      </ScrollView>
      <Skeleton
        variant="rounded"
        width="100%"
        height={180}
        style={{ marginTop: theme.spacing[4] }}
      />
    </ScrollView>
  );
}

export default HomeSkeleton;
