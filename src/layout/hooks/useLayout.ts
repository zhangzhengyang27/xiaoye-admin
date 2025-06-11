// import { computed } from 'vue'
// import { routerArrays } from '../types'
import { useGlobal } from './useGlobal'

export function useLayout() {
  const { $storage, $config } = useGlobal<GlobalPropertiesApi>()

  return {
    $storage,
    $config,
  }
}
