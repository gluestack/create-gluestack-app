import React from "react";
// import SharedComponent from "@project/components";
import GluestackUIProvider, { Box, Text, Spinner } from "@project/components";

// @ts-ignore
export default function Wrapper(props: any) {
  return <GluestackUIProvider>{props.children}</GluestackUIProvider>;
}
