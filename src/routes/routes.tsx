import { CustomTabBar } from '@components/CustomTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Cart } from '@screens/Cart';
import { Home } from '@screens/Home';
import { ProductDetails } from '@screens/ProductDetails';
import { Search } from '@screens/Search';
import { Profile } from '@screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Routes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
      backBehavior="history"
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={Routes} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}

export default Routes;
