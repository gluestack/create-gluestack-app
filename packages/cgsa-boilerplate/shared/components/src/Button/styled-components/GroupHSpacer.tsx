// @ts-nocheck
import { styled } from "@dank-style/react";
import { View } from "react-native";

export default styled(
  View,
  {
    variants: {
      variant: {
        row: {},
        column: {},
      },

      space: {
        xs: {
          w: 4,
        },
        sm: {
          w: 6,
        },
        md: {
          w: 8,
        },
        lg: {
          w: 8,
        },
      },
    },
  },
  { ancestorStyle: ["_groupHSpacer"] }
);
