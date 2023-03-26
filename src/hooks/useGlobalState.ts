import { isDarkMode } from 'src/redux/globalState'
import { useAppSelector } from 'src/redux/hooks'

export const useDarkMode = () => {
  const darkMode = useAppSelector(isDarkMode)

  return [darkMode]
}
