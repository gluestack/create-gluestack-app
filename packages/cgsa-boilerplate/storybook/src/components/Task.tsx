import React from "react";
import GluestackUIProvider, {
  Box,
  Button,
  Text,
  Spinner,
  Center,
  Input,
  Progress,
  Heading,
  Pressable,
  Link,
} from "@project/components";
import Wrapper from "../Wrapper";

// @ts-ignore
export default function Task() {
  return (
    <Wrapper>
      <Box
        h="$20"
        w="$210"
        bg="$primary500"
        p="$3"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="$white" marginLeft={"$2"}>
          jhgfjygh
        </Text>
        <Spinner size="large" />

        <Progress value={60}>
          <Progress.FilledTrack />
        </Progress>
      </Box>

      <Input>
        <Input.Input placeholder="Enter Text here" />
      </Input>

      <Link href="https://gluestack.io/">
        <Text>gluestack</Text>
      </Link>

      <Button>
        <Button.Text>Button</Button.Text>
      </Button>

      <Heading>I am a Heading</Heading>

      <Text>Text</Text>
// error due to ts
      {/* <Center bg="$red500" h={200} w={300}>
        <Text color="white" fontWeight="bold">
          This is the center.
        </Text>
      </Center> */}
    </Wrapper>
  );
}
