import { Text, View, ViewProps, StyleSheet } from 'react-native'

type GroupsProps = ViewProps

export function Groups({ ...rest }: GroupsProps) {
  return (
    <View style={styles.container} {...rest}>
      <Text>Hello Groups</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
