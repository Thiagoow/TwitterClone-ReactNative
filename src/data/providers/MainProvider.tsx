import { ReactNode, createContext, useContext, useMemo } from 'react'
import { MainProviderUseCase } from '#src/domain/useCases/MainProvider'

export type MainProviderProps = {
  children: ReactNode
  useCase: MainProviderUseCase
}

const MainProviderContext = createContext<any>(null)

export function useMainProvider() {
  return useContext(MainProviderContext)
}

export default (props: MainProviderProps) => {
  const { children, useCase } = props
  const { user, setUser, isDark, toggleDark } = useCase

  return useMemo(
    () => (
      <MainProviderContext.Provider
        value={{
          user,
          setUser,
          isDark,
          toggleDark
        }}
      >
        {children}
      </MainProviderContext.Provider>
    ),
    [children, user, setUser, isDark, toggleDark]
  )
}
