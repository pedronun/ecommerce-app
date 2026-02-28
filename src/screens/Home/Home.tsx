import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeSkeleton from '@components/HomeSkeleton/HomeSkeleton';
import { Layout } from '@components/Layout/Layout';
import { Carousel } from '@design-system/components';
import { Slider } from '@design-system/components/Slider/Slider';
import { useTheme } from '@design-system/theme/ThemeContext';
import { getHomeContent } from '@services/home';
import { getSearch } from '@services/search';
import { Image as ImageType } from '@typings/home';
import { Product } from '@typings/product';
import { getHomeStyles } from './Home.styles';
import { useScrollToTop } from '@react-navigation/native';

interface ISliderProductProps {
  searchTerm: string;
  products: Product[];
}

function Home() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getHomeStyles(theme, insets);
  const [products, setProducts] = useState<ISliderProductProps[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  const { data, isLoading } = useQuery({
    queryKey: ['home'],
    queryFn: getHomeContent,
  });

  useEffect(() => {
    const hasProductsToRequest =
      data?.blocks.filter((block) => block.__component === 'home.product-showcase-search') ?? [];

    if (hasProductsToRequest.length) {
      hasProductsToRequest.forEach((item) => {
        getSearch(item.searchTerm ?? '').then((response) => {
          setProducts((prev) => [
            ...prev,
            {
              searchTerm: item.searchTerm ?? '',
              products: response,
            },
          ]);
        });
      });
    }
  }, [data?.blocks]);

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
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ padding: theme.spacing[4], gap: theme.spacing[5] }}>
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
                      <View style={{ borderRadius: theme.radius.md, overflow: 'hidden' }}>
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
              case 'home.product-showcase-search': {
                const productsToRender = products.find(
                  (product) => product.searchTerm === item.searchTerm
                );

                return (
                  <Slider
                    key={index}
                    title={item.heading}
                    products={productsToRender?.products ?? []}
                    horizontal
                  />
                );
              }
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
