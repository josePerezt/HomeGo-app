import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, PermissionsAndroid } from "react-native";
import { useEffect, useState } from "react";

// Libreria para renderizar el mapa con google Maps en Android.
import MapView from "react-native-maps";

// Libreria para activar la location del Mobile
import * as Location from "expo-location";

export default function App() {
  const [ubi, setUbi] = useState(null);

  const ubicationExacta = async () => {
    let { coords } = await Location.getCurrentPositionAsync();
    return setUbi({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  useEffect(() => {
    (async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permiso de ubicación",
            message:
              "Necesitamos acceder a tu ubicación para proporcionarte servicios basados en la ubicación.",
            buttonNeutral: "Preguntar después",
            buttonNegative: "Cancelar",
            buttonPositive: "Aceptar",
          }
        );
        ubicationExacta();
        console.log(ubi);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permiso de ubicación concedido");
        } else {
          console.log("Permiso de ubicación denegado");
        }
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Google Maps HomeGo</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: ubi.latitude,
          longitude: ubi.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
  },
  map: {
    width: "100%",
    height: "80%",
  },
});
