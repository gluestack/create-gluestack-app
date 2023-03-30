import { createProvider } from "@gluestack-ui/provider";
import { StyledProvider } from "@dank-style/react";
import { config } from "./gluestack-ui.config";
import React from "react";

const TempProvider = createProvider({ StyledProvider }) as any;
TempProvider.displayName = "Provider";

export const GluestackUIProvider = ({ children }: any) => {
  return <TempProvider config={config.theme}>{children}</TempProvider>;
};
