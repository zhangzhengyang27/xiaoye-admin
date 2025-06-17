type Effect = 'light' | 'dark'

/**
 * T 是一个泛型参数，它必须是 HTMLElement 或其子类型。默认值为 HTMLDivElement，即如果未指定泛型参数，T 将被推断为 HTMLDivElement
 * Nullable<T>：表示这个类型可以是 T 类型的值，也可以是 null。
 * 换句话说，ElRef 类型既可以是一个特定的 HTML 元素（如 HTMLDivElement），也可以是 null
 *
 * 此类型通常用于表示对 DOM 元素的引用，允许变量既存储元素本身，也支持 null 值（例如，在元素尚未挂载或已被卸载时）
 * @example
 * const divRef: ElRef<HTMLDivElement> = document.getElementById('myDiv');
 */
type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

/**
 * Nullable<T>：表示这个类型可以是 T 类型的值，也可以是 null
 */
type Nullable<T> = T | null

type NonNullable<T> = T extends null | undefined ? never : T
