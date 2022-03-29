import { dynamicTableHeight } from '../table'

const TableMixin = {
  data() {
    return {
      tableMaxHeight: null
    }
  },
  mounted() {
    if (this.$refs.table) {
      setTimeout(() => {
        this.tableMaxHeight = dynamicTableHeight(this.$refs.table.$el, 40)
      }, 1000)
    } else {
      this.tableMaxHeight = 100
    }
  }
}

export default TableMixin
