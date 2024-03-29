import { createPinia } from "pinia";

// 实例化pinia
export const pinia = createPinia();

// 统一导出
export * from "./modules/user"
export * from "./modules/app"
export * from "./modules/permission"