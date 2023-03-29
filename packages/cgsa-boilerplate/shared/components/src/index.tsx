import React from "react";
import { View, Text } from "react-native";

type ISharedHeader = {
  id: string;
  title: string;
}

export default function SharedHeader({id, title}: ISharedHeader) {
  return <View><Text id={id}>{title}</Text></View>;
}
