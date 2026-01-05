import { Layout } from '@components/Layout/Layout';
import { ProductShelf } from '@components/ProductShelf';
import { Product } from '@typings/product';
import { ScrollView, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from '@design-system/theme/ThemeContext';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Majestic Mountain Graphic T-Shirt',
    slug: 'majestic-mountain-graphic-t-shirt',
    price: 44,
    description:
      'Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: [
      'https://i.imgur.com/QkIa5tT.jpeg',
      'https://i.imgur.com/jb5Yu0h.jpeg',
      'https://i.imgur.com/UlxxXyG.jpeg',
    ],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
  {
    id: 2,
    title: 'Classic Red Pullover Hoodie',
    slug: 'classic-red-pullover-hoodie',
    price: 10,
    description:
      'Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: [
      'https://i.imgur.com/1twoaDy.jpeg',
      'https://i.imgur.com/FDwQgLy.jpeg',
      'https://i.imgur.com/kg1ZhhH.jpeg',
    ],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
  {
    id: 3,
    title: 'Classic Heather Gray Hoodie',
    slug: 'classic-heather-gray-hoodie',
    price: 69,
    description:
      'Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: [
      'https://i.imgur.com/cHddUCu.jpeg',
      'https://i.imgur.com/CFOjAgK.jpeg',
      'https://i.imgur.com/wbIMMme.jpeg',
    ],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
  {
    id: 5,
    title: 'Classic Black Hooded Sweatshirt',
    slug: 'classic-black-hooded-sweatshirt',
    price: 79,
    description:
      'Elevate your casual wardrobe with our Classic Black Hooded Sweatshirt. Made from high-quality, soft fabric that ensures comfort and durability, this hoodie features a spacious kangaroo pocket and an adjustable drawstring hood. Its versatile design makes it perfect for a relaxed day at home or a casual outing.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: [
      'https://i.imgur.com/cSytoSD.jpeg',
      'https://i.imgur.com/WwKucXb.jpeg',
      'https://i.imgur.com/cE2Dxh9.jpeg',
    ],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
  {
    id: 6,
    title: 'Classic Comfort Fit Joggers',
    slug: 'classic-comfort-fit-joggers',
    price: 25,
    description:
      'Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers. These versatile black joggers feature a soft elastic waistband with an adjustable drawstring, two side pockets, and ribbed ankle cuffs for a secure fit. Made from a lightweight and durable fabric, they are ideal for both active days and relaxed lounging.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: [
      'https://i.imgur.com/ZKGofuB.jpeg',
      'https://i.imgur.com/GJi73H0.jpeg',
      'https://i.imgur.com/633Fqrz.jpeg',
    ],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
  {
    id: 7,
    title: 'Classic Comfort Drawstring Joggers',
    slug: 'classic-comfort-drawstring-joggers',
    price: 79,
    description:
      'Experience the perfect blend of comfort and style with our Classic Comfort Drawstring Joggers. Designed for a relaxed fit, these joggers feature a soft, stretchable fabric, convenient side pockets, and an adjustable drawstring waist with elegant gold-tipped detailing. Ideal for lounging or running errands, these pants will quickly become your go-to for effortless, casual wear.',
    category: {
      id: 1,
      name: 'Clothes',
      slug: 'clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      creationAt: '2026-01-02T16:26:46.000Z',
      updatedAt: '2026-01-02T16:26:46.000Z',
    },
    images: ['https://i.imgur.com/mp3rUty.jpeg', 'https://i.imgur.com/JQRGIc2.jpeg'],
    creationAt: '2026-01-02T16:26:46.000Z',
    updatedAt: '2026-01-02T16:26:46.000Z',
  },
];

function Home() {
  const { theme } = useTheme();
  return (
    <Layout>
      <ScrollView style={{ backgroundColor: theme.colors.background }}>
        <FlashList
          data={mockProducts}
          horizontal
          renderItem={({ item }: { item: Product }) => <ProductShelf product={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </Layout>
  );
}

export default Home;
