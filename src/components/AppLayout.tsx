import { useMemo } from 'react'
import { StyleSheet, View, ScrollView, ScrollViewProps } from 'react-native'
import { colors } from '#theme/colors'
import { useMainProvider } from '#providers/MainProvider'

type AppLayoutProps = {
  children: React.ReactNode
  fullHeight?: boolean
} & ScrollViewProps

const AppLayout = ({ children, fullHeight, ...rest }: AppLayoutProps) => {
  const { isDark } = useMainProvider()

  return useMemo(
    () => (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.backgroundRadius,
            fullHeight ? styles.fullHeight : {},
            { backgroundColor: isDark ? colors.darkTxtColor : colors.whiteColor }
          ]}
          showsVerticalScrollIndicator={false}
          {...rest}
        >
          {children}
        </ScrollView>
      </View>
    ),
    [isDark, children, fullHeight, Object.keys(rest)]
  )
}

export default AppLayout

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundRadius: {
    width: '100%'
  },
  fullHeight: {
    flex: 1
  },
  contentPadding: {
    paddingVertical: 23,
    paddingLeft: 27
  }
})
