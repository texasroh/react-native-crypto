import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BLACK_COLOR } from "../colors";
import Home from "../screens/Home";

export type InNavStackParamList = {
  Home: undefined;
};

const Nav = createNativeStackNavigator<InNavStackParamList>();

const InNav = () => (
  <Nav.Navigator
    screenOptions={{
      presentation: "modal",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: BLACK_COLOR,
      },
    }}
  >
    <Nav.Screen name="Home" component={Home} />
  </Nav.Navigator>
);

export default InNav;
