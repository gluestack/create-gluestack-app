import React from "react";
import { View, Text } from "react-native";
export default function SharedHeader({ id, title }) {
    return React.createElement(View, null,
        React.createElement(Text, { id: id }, title));
}
