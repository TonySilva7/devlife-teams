import 'styled-components/native'
import theme from '../theme/index'

declare module 'styled-components/native' {
  type CustomTheme = typeof theme

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CustomTheme {}
}
