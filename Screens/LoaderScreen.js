import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
const loader1 = "../assets/Gif/loading2.gif";
import { selectOrigin } from "../feature/navSlice";

const LoaderScreen = () => {
  const route = useRoute();
  const { markers, advertisInfo } = route.params;
  // console.log("This is Markers", markers);
  // console.log("This is Advertisment", advertisInfo);
  const navigation = useNavigation();
  const userloc = useSelector(selectOrigin);

  var rad = function (x) {
    return (x * Math.PI) / 180;
  };

  const DistanceFind = () => {
    var R = 6378137;
    markers?.map(async (marker, index) => {
      var dLat = rad(marker.data.location.latitude - userloc.latitude);
      var dLong = rad(marker.data.location.longitude - userloc.longitude);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(userloc.latitude)) *
          Math.cos(rad(marker.data.location.latitude)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      // console.log("Distance Between", d);
      if (d > 601) {
        const index1 = advertisInfo.findIndex(
          (advertis) => advertis.id === marker.id
        );
        if (index1 >= 0) {
          advertisInfo.splice(index1, 1);
        }
        markers.splice(index, 1);
      }
    });
    console.log(markers);
    // console.log("This is advertise", advertisInfo);
    const timeout = setTimeout(() => {
      navigation.navigate("MapScreens", {
        distancedata: markers,
        advertisInfo: advertisInfo,
      });
    }, 5000);
  };

  useEffect(() => {
    DistanceFind();
  },[]);

  return (
    <View style={loaderStyles.mainContainer}>
      <View style={loaderStyles.lowerContainer}>
        <ImageBackground
          source={require(loader1)}
          style={loaderStyles.bakcgroundImage}
        ></ImageBackground>
        <Text style={loaderStyles.loadText}>
          Please Wait We Find Nearest Medical Shop
        </Text>
      </View>
      <View style={loaderStyles.footerView}>
        <Text style={loaderStyles.footerText}>&#169; Powered by Medisale</Text>
      </View>
    </View>
  );
};

export default LoaderScreen;

const loaderStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  bakcgroundImage: {
    width: widthPercentageToDP("50"),
    height: widthPercentageToDP("50"),
    borderRadius: 100,
  },
  lowerContainer: {
    marginBottom: heightPercentageToDP("10%"),
    alignItems: "center",
    justifyContent: "center",
  },
  loadText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500",
    color: "#1D2C42",
    textAlign: "center",
  },
  footerView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#F4F6FA",
    width: widthPercentageToDP("100%"),
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        height: heightPercentageToDP("4%"),
      },
      android: {
        height: heightPercentageToDP("5%"),
      },
    }),
  },
  footerText: {
    color: "#38405F",
    fontSize: 12,
  },
});
