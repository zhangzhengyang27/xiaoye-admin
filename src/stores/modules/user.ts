import { defineStore } from 'pinia'
import { type userType, store, router, resetRouter, routerArrays, storageLocal } from '../utils'
import { type UserResult, type RefreshTokenResult, getLogin, refreshTokenApi } from '@/api/user'
import { useMultiTagsStoreHook } from './multiTags'
