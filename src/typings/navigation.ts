import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Menu: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  ProductDetails: { slug: string };
  CategoryProducts: { categoryId: number; categoryName: string };
  Login: undefined;
  SignIn: undefined;
};

/**
 * Tipo de navegação composto para uso em qualquer tela do app.
 * Permite navegar tanto para rotas do Stack quanto para tabs.
 */
export type AppNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  StackNavigationProp<RootStackParamList>
>;
