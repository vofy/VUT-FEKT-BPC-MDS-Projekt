import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Image,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import '@fontsource/silkscreen';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"row"} alignItems={"center"} height={"100%"}>
          <Image src="pexel.svg" height="100%" p={3} />
          <Text fontSize={30} fontFamily={"Silkscreen"}>Pexel</Text>
        </Stack>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
