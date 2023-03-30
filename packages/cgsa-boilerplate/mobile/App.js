import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import GluesatckUIProvider, { Text, Button } from "@project/components";

export default function App() {
  return (
    <View style={styles.container}>
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
