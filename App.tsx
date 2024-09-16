import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import PublishScreen from "./screens/PublishScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import VehiculeScreen from "./screens/VehiculeScreen";
import CreateAccount from "./screens/CreateAccount";
import SearchScreen from "./screens/SearchScreen";
import ResultsScreen from "./screens/ResultsScreen";
import EndScreen from "./screens/EndScreen";
import AgendaScreen from "./screens/AgendaScreen";
import TimeScreen from "./screens/TimeScreen";
import PassengerScreen from "./screens/PassengerScreen";
import OptionsScreen from "./screens/OptionsScreen";
import CommentScreen from "./screens/CommentScreen";
import JourneysSearchResultScreen from "./screens/JourneysSearchResultScreen";
import JourneyScreen from "./screens/JourneyScreen";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { IJourney, createJourneyInput } from './interfaces/journey';
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const { manifest } = Constants;

console.log({manifest});
const uri = `http://${manifest?.debuggerHost?.split(":")?.shift()?.concat(":4000")}`

const httpLink = createHttpLink({
  uri,
  });

  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await SecureStore.getItemAsync("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  // Initialize Apollo Client
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  PublishScreen: { journey: createJourneyInput };
  ProfileScreen: undefined;
  VehiculeScreen: undefined;
  SearchScreen: undefined;
  ResultsScreen: undefined;
  EndScreen: { journey: createJourneyInput };
  AgendaScreen: { journey: createJourneyInput };
  TimeScreen: { journey: createJourneyInput };
  PassengerScreen: { journey: createJourneyInput };
  OptionsScreen: { journey: createJourneyInput };
  CommentScreen: { journey: createJourneyInput };
  JourneysSearchResultScreen: { journeys: IJourney[] };
  JourneyScreen : { id:number };
};

export type Journey = {
  id: number;
  departure: string;
  arrival: string;
  departureDateTime: string;
  nbPassenger: number;
};

const Tab = createBottomTabNavigator();
const LoginStack = createNativeStackNavigator<RootStackParamList>();
const ProfileStack = createNativeStackNavigator<RootStackParamList>();
const SearchStack = createNativeStackNavigator<RootStackParamList>();
const ResultsStack = createNativeStackNavigator<RootStackParamList>();
const PublishStack = createNativeStackNavigator<RootStackParamList>();
const EndStack = createNativeStackNavigator<RootStackParamList>();
const AgendaStack = createNativeStackNavigator<RootStackParamList>();
const TimeStack = createNativeStackNavigator<RootStackParamList>();
const PassengerStack = createNativeStackNavigator<RootStackParamList>();
const OptionsStack = createNativeStackNavigator<RootStackParamList>();
const CommentStack = createNativeStackNavigator<RootStackParamList>();

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    SecureStore.deleteItemAsync("token");
  };

  useEffect(() => {
    SecureStore.getItemAsync("token")
      .then((token) => {
        if (token) {
          handleLogin();
        } else {
          handleLogout();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: IoniconName;

                switch (route.name) {
                  case "Login":
                    iconName = focused
                      ? "log-in-outline"
                      : "person-circle-outline";
                    break;
                  case "Publier":
                    iconName = "add-circle-outline";
                    break;
                  case "Profil":
                    iconName = "person-circle-outline";
                    break;
                  case "Recherche":
                    iconName = "search-outline";
                    break;
                  case "Mes trajets":
                    iconName = "car-outline";
                    break;
                  default:
                    iconName = "home";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarStyle: {
                backgroundColor: "#ffad60",
              },
              tabBarActiveTintColor: "#d9534f",
              tabBarInactiveTintColor: "black",
              headerShown: false,
            })}
          >
            <Tab.Screen name="Recherche">
              {() => (
                <SearchStack.Navigator initialRouteName="SearchScreen">
                  <SearchStack.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    options={{ headerShown: false }}
                  />
                  <SearchStack.Screen
                    name="JourneysSearchResultScreen"
                    component={JourneysSearchResultScreen}
                    options={{ title: "Résultat de la recherche" }}
                  />
                  <SearchStack.Screen
                    name="JourneyScreen"
                    component={JourneyScreen}
                    options={{ title: "" }}
                  />
                </SearchStack.Navigator>
              )}
            </Tab.Screen>

            <Tab.Screen name="Publier">
              {() => (
                <PublishStack.Navigator
                  initialRouteName="PublishScreen"
                  screenOptions={{ headerShown: false }}
                >
                  <PublishStack.Screen
                    name="PublishScreen"
                    component={PublishScreen}
                  />
                  <PublishStack.Screen name="EndScreen" component={EndScreen} />
                  <PublishStack.Screen
                    name="AgendaScreen"
                    component={AgendaScreen}
                  />
                  <PublishStack.Screen
                    name="TimeScreen"
                    component={TimeScreen}
                  />
                  <PublishStack.Screen
                    name="PassengerScreen"
                    component={PassengerScreen}
                  />
                  <PublishStack.Screen
                    name="OptionsScreen"
                    component={OptionsScreen}
                  />
                  <PublishStack.Screen
                    name="CommentScreen"
                    component={CommentScreen}
                  />
                </PublishStack.Navigator>
              )}
            </Tab.Screen>

            <Tab.Screen name="Mes trajets">
              {() => (
                <ResultsStack.Navigator
                  initialRouteName="ResultsScreen"
                  screenOptions={{ headerShown: false }}
                >
                  <ResultsStack.Screen
                    name="ResultsScreen"
                    component={ResultsScreen}
                  />
                </ResultsStack.Navigator>
              )}
            </Tab.Screen>

            <Tab.Screen name="Profil">
              {() => (
                <ProfileStack.Navigator
                  initialRouteName="ProfileScreen"
                  screenOptions={{ headerShown: false }}
                >
                  <ProfileStack.Screen
                    name="ProfileScreen"
                    children={(props) => (
                      <ProfileScreen {...props} onUserLogout={handleLogout} />
                    )}
                  />
                  <ProfileStack.Screen
                    name="VehiculeScreen"
                    component={VehiculeScreen}
                  />
                </ProfileStack.Navigator>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <LoginStack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{ headerShown: false }}
          >
            <LoginStack.Screen name="LoginScreen">
              {(props) => <LoginScreen {...props} onUserLogin={handleLogin} />}
            </LoginStack.Screen>

            <LoginStack.Screen
              name="RegisterScreen"
              component={CreateAccount}
            />
          </LoginStack.Navigator>
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
};
export default App;
