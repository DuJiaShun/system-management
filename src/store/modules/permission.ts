import { defineStore } from 'pinia'
import { getSideMenu } from '@/api/menu'

export const useAppStore = defineStore('permission', () => {
 function loadSideMenu() {
    return new Promise<void>((resolve, reject) => {
      getSideMenu().then(res => {
        console.log(res);
        resolve(res)
      }).catch(error => {
        reject(error)
      })

    })
  }
  return { loadSideMenu }
})