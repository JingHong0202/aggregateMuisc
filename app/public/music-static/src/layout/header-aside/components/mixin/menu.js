import util from "@/libs/util.js";

export default {
  methods: {
    handleMenuSelect(index, indexPath) {
      if (/^d2-menu-empty-\d+$/.test(index) || index === undefined) {
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        util.open(index);
      } else if (/(addplaylist)|(addplayer)/.test(index)) {
        
      } else {
        this.$router.push({
          path: index
        });
      }
    }
  }
};
