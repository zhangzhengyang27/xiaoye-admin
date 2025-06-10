import { reactive } from 'vue'
import { isPhoneNumber } from '@/utils/common'
import type { FormRules } from 'element-plus'

/**
 * 6位数字验证码正则
 * @example '123456' // valid
 */
export const REGEXP_SIX = /^\d{6}$/

/**
 * 密码正则（8-18位数字、字母、符号的任意两种组合）
 * @example 'Abc123!' // valid
 */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/

/** 公共验证器函数 */
const validators = {
  /** 验证手机号格式 */
  phone: (value: string, callback: (error?: Error) => void) => {
    if (!value) return callback(new Error('请输入手机号'))
    if (!isPhoneNumber(value)) return callback(new Error('手机号格式不正确'))
    callback()
  },
  /** 验证6位数字验证码 */
  verifyCode: (value: string, callback: (error?: Error) => void) => {
    if (!value) return callback(new Error('请输入验证码'))
    if (!REGEXP_SIX.test(value)) return callback(new Error('验证码格式应为6位数字'))
    callback()
  },
  /** 验证密码格式 */
  password: (value: string, callback: (error?: Error) => void) => {
    if (!value) return callback(new Error('请输入密码'))
    if (!REGEXP_PWD.test(value)) {
      return callback(new Error('密码格式应为8-18位数字、字母、符号的任意两种组合'))
    }
    callback()
  },
}

/** 公共规则定义 */
const commonRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: (_, v, cb) => validators.phone(v, cb), trigger: 'blur' },
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: (_, v, cb) => validators.verifyCode(v, cb), trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: (_, v, cb) => validators.password(v, cb), trigger: 'blur' },
  ],
}

/**
 * 登录表单验证规则
 * @property password - 密码验证规则
 * @property verifyCode - 验证码验证规则
 */
const loginRules = reactive<FormRules>({
  password: commonRules.password,
  verifyCode: commonRules.verifyCode,
})

/**
 * 手机号登录验证规则
 * @property phone - 手机号验证规则
 * @property verifyCode - 验证码验证规则
 */
const phoneRules = reactive<FormRules>({
  phone: commonRules.phone,
  verifyCode: commonRules.verifyCode,
})

/**
 * 更新信息验证规则
 * @property phone - 手机号验证规则
 * @property verifyCode - 验证码验证规则
 * @property password - 密码验证规则
 */
const updateRules = reactive<FormRules>({
  phone: commonRules.phone,
  verifyCode: commonRules.verifyCode,
  password: commonRules.password,
})

export { loginRules, phoneRules, updateRules, validators }
