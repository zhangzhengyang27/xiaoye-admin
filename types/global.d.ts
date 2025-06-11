/**
 * 对应 `public/platform-config.json` 文件的类型声明
 */
interface PlatformConfigs {
  Version?: string
  Title?: string
  FixedHeader?: boolean
  HiddenSideBar?: boolean
  MultiTagsCache?: boolean
  MaxTagsLevel?: number
  KeepAlive?: boolean
  Locale?: string
  Layout?: string
  Theme?: string
  DarkMode?: boolean
  OverallStyle?: string
  Grey?: boolean
  Weak?: boolean
  HideTabs?: boolean
  HideFooter?: boolean
  Stretch?: boolean | number
  SidebarStatus?: boolean
  EpThemeColor?: string
  ShowLogo?: boolean
  ShowModel?: string
  MenuArrowIconNoTransition?: boolean
  CachingAsyncRoutes?: boolean
  TooltipEffect?: Effect
  ResponsiveStorageNameSpace?: string
  MenuSearchHistory?: number
  MapConfigure?: {
    amapKey?: string
    options: {
      resizeEnable?: boolean
      center?: number[]
      zoom?: number
    }
  }
}
