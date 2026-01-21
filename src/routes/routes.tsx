import { CustomTabBar } from '@components/CustomTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Cart } from '@screens/Cart';
import { CategoryProducts } from '@screens/CategoryProducts';
import { Home } from '@screens/Home';
import { Login } from '@screens/Login';
import { Menu } from '@screens/Menu';
import { ProductDetails } from '@screens/ProductDetails';
import { Profile } from '@screens/Profile';
import { Search } from '@screens/Search';
import { SignIn } from '@screens/Signin';

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
      <Tab.Screen name="Menu" component={Menu} />
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
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default Routes;
