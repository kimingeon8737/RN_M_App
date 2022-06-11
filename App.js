import react, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import { Button } from "react-native-web";
import ImgButton from "./component/ImgButton";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "c328554c90d805715b816b923d859de9";

export default function App() {
  const [city, setcity] = useState("로딩중...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setcity(location[0].city);
    // city = location[0].city;
    console.log(location);
    const respone = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`
    );
    const json = await respone.json();
    console.log(json);
  };
  useEffect(() => {
    ask();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <ImgButton color="blue" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(120, 80%, 80%)",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
