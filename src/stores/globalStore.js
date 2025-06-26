// src/stores/layoutStore.js
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    scrollInfo: {},
    ImmediateScrollInfo: {}
  }),
  actions: {
    setScrollInfo(data) {
      this.scrollInfo = data;
    },
    setImmediateScrollInfo(data) {
      this.ImmediateScrollInfo = data;
    }
  },
  getters: {
    getScrollInfo(option = null) {
      if (option === 'immediate') {
        return this.ImmediateScrollInfo;
      }
      return this.scrollInfo;
    },
    getScrollPosition(option = null) {
      if (option === 'immediate') {
        return this.ImmediateScrollInfo.position;
      }
      return this.scrollInfo.position;
    }
  }
});
