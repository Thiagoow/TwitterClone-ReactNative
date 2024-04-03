import { useMemo } from 'react'
import { StyleSheet, View, ScrollView, ScrollViewProps } from 'react-native'
import { colors } from '#theme/colors'

type AppLayoutProps = {
  children: React.ReactNode
  fullHeight?: boolean
} & ScrollViewProps

const AppLayout = ({ children, fullHeight, ...rest }: AppLayoutProps) => {
  return useMemo(
    () => (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[styles.backgroundRadius, fullHeight ? styles.fullHeight : {}]}
          showsVerticalScrollIndicator={false}
          {...rest}
        >
          {children}
        </ScrollView>
      </View>
    ),
    [children, fullHeight, Object.keys(rest)]
  )
}

export default AppLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor
  },
  backgroundRadius: {
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: colors.extraLightGreyColor
  },
  fullHeight: {
    flex: 1
  },
  contentPadding: {
    paddingVertical: 23,
    paddingLeft: 27
  }
})
