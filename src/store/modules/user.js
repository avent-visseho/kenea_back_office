import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    otp: null, // Add this to store the username temporarily
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
      this.otp = null; // Clear otp on logout
    },
    setotp(username) {
      this.otp = username; // Store the username
    },
  },
});