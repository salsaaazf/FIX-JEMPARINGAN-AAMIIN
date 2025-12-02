import { ref } from 'vue'
import { defineStore } from 'pinia'; 
import { KeyRound, Target } from 'lucide-vue-next';

export const useJemparinganStore = defineStore('jemparingan', {
  state: () => ({
    redHits: [  { nomorPemanah: 1, nama: 'Pemanah 1' }, //ini semua cuma dummy biar akuu bisa lihat hasilnya keluar ga ditable
  { nomorPemanah: 2, nama: 'Pemanah 2' },
  { nomorPemanah: 3, nama: 'Pemanah 3' },
  { nomorPemanah: 4, nama: 'Pemanah 4' },
  { nomorPemanah: 5, nama: 'Pemanah 5' },
  { nomorPemanah: 6, nama: 'Pemanah 6' },
  { nomorPemanah: 7, nama: 'Pemanah 7' },
  { nomorPemanah: 8, nama: 'Pemanah 8' },
  { nomorPemanah: 9, nama: 'Pemanah 9' },
  { nomorPemanah: 10, nama: 'Pemanah 10' },
  { nomorPemanah: 11, nama: 'Pemanah 11' },
  { nomorPemanah: 12, nama: 'Pemanah 12' },
  { nomorPemanah: 13, nama: 'Pemanah 13' },
  { nomorPemanah: 14, nama: 'Pemanah 14' },
  { nomorPemanah: 15, nama: 'Pemanah 15' },
  { nomorPemanah: 16, nama: 'Pemanah 16' },
  { nomorPemanah: 17, nama: 'Pemanah 17' },
  { nomorPemanah: 18, nama: 'Pemanah 18' },], 
    whiteHits: [  { nomorPemanah: 1, nama: 'Pemanah 1' }, //ini semua cuma dummy biar akuu bisa lihat hasilnya keluar ga ditable
  { nomorPemanah: 2, nama: 'Pemanah 2' },
  { nomorPemanah: 3, nama: 'Pemanah 3' },
  { nomorPemanah: 4, nama: 'Pemanah 4' },
  { nomorPemanah: 5, nama: 'Pemanah 5' },
  { nomorPemanah: 7, nama: 'Pemanah 7' },
  { nomorPemanah: 8, nama: 'Pemanah 8' },
  { nomorPemanah: 9, nama: 'Pemanah 9' },
  { nomorPemanah: 10, nama: 'Pemanah 10' },
  { nomorPemanah: 11, nama: 'Pemanah 11' },
  { nomorPemanah: 12, nama: 'Pemanah 12' },
  { nomorPemanah: 13, nama: 'Pemanah 13' },
  { nomorPemanah: 15, nama: 'Pemanah 15' },
  { nomorPemanah: 16, nama: 'Pemanah 16' },
  { nomorPemanah: 17, nama: 'Pemanah 17' },
  { nomorPemanah: 18, nama: 'Pemanah 18' },
  { nomorPemanah: 19, nama: 'Pemanah 19' },
  { nomorPemanah: 20, nama: 'Pemanah 20' },
  { nomorPemanah: 21, nama: 'Pemanah 21' },
  { nomorPemanah: 22, nama: 'Pemanah 22' },], //dummy selesai

    matchInfo: {
      round: '_',
      target: '_',
    }
  }),
  
  getters: {
    finalRecap: (state) => {
      const summary = {}; 

      // --- A. Proses Data Merah (redHits) ---
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
        // Tambahkan 3 poin merah
        summary[nomorPemanah].red += 3;
      });

      // --- B. Proses Data Putih (whiteHits) ---
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
        // Tambahkan 1 poin putih
        summary[nomorPemanah].white += 1;
      });
      
      // --- C. Hitung Total dan Konversi ke Array ---
      const finalArray = Object.values(summary).map(player => {
        player.total = player.red + player.white;
        return player;
      });

      // Urutkan berdasarkan total (opsional)
      return finalArray.sort((a, b) => b.total - a.total);
    },
  },

  actions: {
    setRedHits(dataArray) {
      this.redHits = dataArray;
    },
    setWhiteHits(dataArray) {
      this.whiteHits = dataArray;
    },
    resetScores() {
        this.redHits = [];
        this.whiteHits = [];
    },
    setMatchInfo(round, target) {
      this.matchInfo.round = round;
      this.matchInfo.target = target;
    }
  }
});