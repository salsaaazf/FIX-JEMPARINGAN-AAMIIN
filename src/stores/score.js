import { defineStore } from 'pinia'

export const useScoreStore = defineStore('score', {
  state: () => ({
    currentRound: 1,
    currentBandul: 'red',
    tempScannedArrows: [],
    confirmedScores: [],
  }),

  actions: {
    setRound(value) {
      this.currentRound = value
    },

    setBandul(value) {
      this.currentBandul = value
    },

    updateTempScannedArrows(arrows) {
      this.tempScannedArrows = arrows
    },

    confirmCurrentBandulScores() {
      this.confirmedScores.push({
        round: this.currentRound,
        bandul: this.currentBandul,
        arrows: this.tempScannedArrows,
      })

      this.tempScannedArrows = [] // reset setelah confirm
    },
  },
})
