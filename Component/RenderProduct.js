import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_BASKET,
  selectBasket,
  DECREASE_ITEM_QUANTITY,
  INCREASE_ITEM_QUANTITY,
  REMOVE_FROM_BASKET,
  selectUserAddress,
} from "../feature/navSlice";
import { Block, theme } from "galio-framework";
import { collection, getDocs } from "firebase/firestore";

const RenderProduct = ({
  id,
  image,
  name,
  price,
  description,
  category,
  quantity,
}) => {
  const dispatch = useDispatch();
  return (
    <Block
      key={id}
      style={{
        width: "100%",
        height: 100,
        marginVertical: 6,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "30%",
          height: 100,
          padding: 14,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
          marginRight: 22,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
            resizeMode: "cover",
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "space-around",
        }}
      >
        <View style={{}}>
          <Text
            style={{
              fontSize: 14,
              maxWidth: "100%",
              color: "black",
              fontWeight: "600",
              letterSpacing: 1,
            }}
          >
            {name}
          </Text>
          <View
            style={{
              marginTop: 4,
              flexDirection: "row",
              alignItems: "center",
              opacity: 0.6,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                maxWidth: "85%",
                marginRight: 4,
              }}
            >
              &#8377;{price}
            </Text>
            <Text>
              (~&#8377;
              {parseInt(price) + price / 20})
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => dispatch(DECREASE_ITEM_QUANTITY(id))}
            >
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: "gray",
                  opacity: 0.5,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: "black",
                  }}
                />
              </View>
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity
              onPress={() => dispatch(INCREASE_ITEM_QUANTITY(id))}
            >
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: "gray",
                  opacity: 0.5,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: "black",
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(REMOVE_FROM_BASKET(id));
              ToastAndroid.show(
                "Items Deleted From Basket",
                ToastAndroid.SHORT
              );
            }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              style={{
                fontSize: 16,
                color: "black",
                backgroundColor: "#f5f5f5",
                padding: 8,
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Block>
  );
};

export default RenderProduct;
