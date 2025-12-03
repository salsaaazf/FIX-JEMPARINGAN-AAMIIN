import { ref } from 'vue'
import { defineStore } from 'pinia'; 
import { KeyRound, Target } from 'lucide-vue-next';

export const useJemparinganStore = defineStore('jemparingan', {
  state: () => ({
    redHits: [], 
    whiteHits: [], 

    tableEntries: [],

    matchInfo: {
      round: '_',
      target: '_',
    }
  }),
  
  getters: {
    finalRecap: (state) => {
      const summary = {}; 

      state.redHits.forEach(hit => {
        const { nomorPemanah, nama } = hit;
        
        if (!summary[nomorPemanah]) {
          summary[nomorPemanah] = {
            nomorPemanah,
            nama,
            red: 0,
            white: 0,
            total: 0,
          };
        }
        
        summary[nomorPemanah].red += 3;
      });

     
      state.whiteHits.forEach(hit => {
        const { nomorPemanah, nama } = hit;

        if (!summary[nomorPemanah]) {
          summary[nomorPemanah] = {
            nomorPemanah,
            nama,
            red: 0,
            white: 0,
            total: 0,
          };
        }
       
        summary[nomorPemanah].white += 1;
      });
      
      
      const finalArray = Object.values(summary).map(player => {
        player.total = player.red + player.white;
        return player;
      });

      
      return finalArray.sort((a, b) => b.total - a.total);
    },
  },

  actions: {
    getStorageKey(round, target) {
      return `jemparingan_data_${round}_${target}`; // Contoh: jemparingan_data_1_A
    },

    saveSessionData() {
        if (this.matchInfo.round === '_' || this.matchInfo.target === '_') {
            return; // Jangan simpan jika match info belum di-set
        }
      const key = this.getStorageKey(this.matchInfo.round, this.matchInfo.target);
        const dataToSave = JSON.stringify({
            redHits: this.redHits,
            whiteHits: this.whiteHits,
            tableEntries: this.tableEntries
        });
        localStorage.setItem(key, dataToSave);
    },

    loadSessionData(round, target) {
      const key = this.getStorageKey(round, target);
      const storedData = localStorage.getItem(key);
      
      // 1. Reset state Pinia (agar tabel kosong jika Round baru/data tidak ada)
      this.redHits = [];
      this.whiteHits = [];
      this.tableEntries = [];
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          this.redHits = parsedData.redHits || [];
          this.whiteHits = parsedData.whiteHits || [];
          this.tableEntries = parsedData.tableEntries || [];
        } catch(e) {
          console.error("Error loading session data:", e);
        }
      }
      
      // 3. Set match info dan pindah
      this.setMatchInfo(round, target);
    },

    setRedHits(dataArray) {
      this.redHits = dataArray;
      this.saveSessionData();
    },
    setWhiteHits(dataArray) {
      this.whiteHits = dataArray;
      this.saveSessionData();
    },
    resetScores() {
        this.redHits = [];
        this.whiteHits = [];
    },
    setMatchInfo(round, target) {
      this.matchInfo.round = round;
      this.matchInfo.target = target;
    },
    addTableEntry(entry) {
        this.tableEntries.push(entry);
        this.saveSessionData();
    }
  }
});