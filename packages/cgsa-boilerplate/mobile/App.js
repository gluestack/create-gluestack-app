import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import GluesatckUIProvider, { Text, Box, Image } from '@project/components';
import { SafeAreaView } from 'react-native';
import RocketIcon from './Icons/RocketIcon';
import DocumentDataIcon from './Icons/DocumentDataIcon';
import LightBulbPersonIcon from './Icons/LightBulbPersonIcon';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GluesatckUIProvider>
        <View style={styles.container}>
          <GluestackComponents />
          <StatusBar style='auto' />
        </View>
      </GluesatckUIProvider>
    </SafeAreaView>
  );
}

const FeatureCard = ({ SvgIcon, name, desc }) => {
  return (
    <Box
      flexDirection='column'
      borderWidth={1}
      borderColor='$borderDark700'
      m='$2'
      p='$4'
      rounded='$md'
    >
      <Box alignItems='center' display='flex' flexDirection='row'>
        <SvgIcon />
        <Text fontSize={22} color='$white' fontWeight={500} ml='$2'>
          {name}
        </Text>
      </Box>
      <Text color='$textDark400' mt='$2'>
        {desc}
      </Text>
    </Box>
  );
};

const Container = () => {
  return (
    <Box flex={1} bg='$black' h='$full' w='$full'>
      <Box position='absolute'>
        <Image source={require('./assets/gradient.png')} />
      </Box>
      <Box
        flex={1}
        alignItems='center'
        justifyContent='space-between'
        mt={60}
        mb={20}
      >
        <Box
          bg='#64748B33'
          py='$2'
          px='$6'
          rounded='$full'
          alignItems='center'
          flexDirection='row'
        >
          <Text color='$white' fontWeight='$normal'>
            Get started by editing
          </Text>
          <Text color='$white' fontWeight='$medium' ml='$2'>
            pages/index.tsx
          </Text>
        </Box>
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Image source={require('./assets/logo.png')} />
        </Box>
        <Box>
          <FeatureCard
            SvgIcon={DocumentDataIcon}
            name='Docs'
            desc='Find in-depth information about gluestack features and API.'
          />
          <FeatureCard
            SvgIcon={LightBulbPersonIcon}
            name='Learn'
            desc='Learn about gluestack in an interactive course with quizzes!'
          />
          <FeatureCard
            SvgIcon={RocketIcon}
            name='Deploy'
            desc='Instantly drop your gluestack site to a shareable URL with vercel.'
          />
        </Box>
      </Box>
    </Box>
  );
};

const GluestackComponents = () => {
  return <Container />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
