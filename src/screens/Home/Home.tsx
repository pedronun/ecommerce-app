import { useQuery } from '@tanstack/react-query';
import { Dimensions, Image, ScrollView, View } from 'react-native';

import HomeSkeleton from '@components/HomeSkeleton/HomeSkeleton';
import { Layout } from '@components/Layout/Layout';
import { Carousel } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { getHomeContent } from '@services/home';
import { Image as ImageType } from '@typings/home';

function Home() {
  const { theme } = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ['home'],
    queryFn: getHomeContent,
  });

  if (isLoading) {
    return (
      <Layout>
        <HomeSkeleton />
      </Layout>
    );
  }

  if (!data) return null;

  return (
    <Layout>
      <ScrollView style={{ backgroundColor: theme.colors.background }}>
        <View style={{ padding: theme.spacing[4] }}>
          {data.blocks.map((item, index) => {
            switch (item.__component) {
              case 'home.carousel': {
                const BANNER_WIDTH = Dimensions.get('window').width - theme.spacing[4] * 2;

                return (
                  <Carousel
                    key={index}
                    data={item.images ?? []}
                    autoplay={item.autoplay ?? true}
                    autoplayInterval={(item.interval ?? 4) * 1000}
                    showDots
                    slideWidth={BANNER_WIDTH}
                    style={{ height: 500 }}
                    renderItem={(img: ImageType) => (
                      <View>
                        <Image
                          source={{ uri: `http://localhost:1337${img.url}` }}
                          style={{ width: BANNER_WIDTH, height: 500 }}
                          resizeMode="cover"
                        />
                      </View>
                    )}
                  />
                );
              }
              case 'home.product-showcase-search':
                return (
                  <View key={index} style={{ marginBottom: theme.spacing[4] }}>
                    {/* {item.content} */}
                  </View>
                );
              default:
                return null;
            }
          })}
        </View>
      </ScrollView>
    </Layout>
  );
}

export default Home;
