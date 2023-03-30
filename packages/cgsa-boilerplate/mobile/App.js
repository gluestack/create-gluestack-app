import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

// import SharedHeader from "@project/components";
import GluesatckUIProvider, { Text, Button } from "@project/components";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <SharedHeader id='id' title='T111asasitle'/> */}
      <GluestackComponents />
      <StatusBar style="auto" />
    </View>
  );
}

const GluestackComponents = () => {
  return (
    <GluesatckUIProvider>
      <Text color="$green500">Hello World</Text>
      <Button>
        <Button.Text>Button</Button.Text>
      </Button>
    </GluesatckUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
