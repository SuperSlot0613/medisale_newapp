import React from "react";
import Background from "../src/components/Background";
import Logo from "../src/components/Logo";
import Header from "../src/components/Header";
import Button from "../src/components/Button";
import Paragraph from "../src/components/Paragraph";
import { Block, Checkbox, Text, theme } from "galio-framework";
import argonTheme from "../constants/Theme";
import { StyleSheet } from "react-native";
import ArButton from "../Component/ArButton";
import Icon from "../Component/Icon";
import useAuth from "../Hooks/useAuth";
import { SafeAreaProvider } from "react-native-safe-area-context";

const DeliveryBoyPage = ({ navigation }) => {
  return (
    <Background>
      <Logo />
      <Header>MediSale</Header>
      <Paragraph>The easiest way to Buy Medicine.</Paragraph>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("LoginScreen", {
            seller: "true",
          })
        }
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("BoySingUp")}
      >
        Sign Up
      </Button>
      <Block flex={0.25} middle style={styles.socialConnect}>
        <Text color="#8898AA" size={12}>
          Sign up with
        </Text>
        <Block row style={{ marginTop: theme.SIZES.BASE }}>
          <ArButton style={{ ...styles.socialButtons, marginRight: 30 }}>
            <Block row>
              <Icon
                name="logo-github"
                family="Ionicon"
                size={14}
                color={"black"}
                style={{ marginTop: 2, marginRight: 5 }}
              />
              <Text style={styles.socialTextButtons}>GITHUB</Text>
            </Block>
          </ArButton>
          <ArButton
            style={styles.socialButtons}
            onPress={() => signWithGoogleId()}
          >
            <Block row>
              <Icon
                name="logo-google"
                family="Ionicon"
                size={14}
                color={"black"}
                style={{ marginTop: 2, marginRight: 5 }}
              />
              <Text style={styles.socialTextButtons}>GOOGLE</Text>
            </Block>
          </ArButton>
        </Block>
      </Block>
    </Background>
  );
};
export default DeliveryBoyPage;

const styles = StyleSheet.create({
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
});
