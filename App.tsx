/* eslint-disable camelcase */
import { Loading } from '@components/Loading'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { Groups } from '@screens/Groups'
import theme from '@theme/index'
import { SafeAreaView, StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        style={{ height: '100%', backgroundColor: theme.COLORS.GRAY_600 }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Groups /> : <Loading />}
      </SafeAreaView>
    </ThemeProvider>
  )
}
