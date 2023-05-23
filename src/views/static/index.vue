<template>
  <div>
    <div class="search-bar">
      <el-input
        v-model="searchText"
        placeholder="Please input"
        class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="Select" style="width: 115px">
            <el-option label="无选择" value="" />
            <el-option label="cms" value="cms_" />
            <el-option label="oms" value="oms_" />
            <el-option label="pms" value="pms_" />
            <el-option label="sms" value="sms_" />
            <el-option label="ums" value="ums_" />
            \
          </el-select>
        </template>
        <template #append>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </template>
      </el-input>
    </div>
    <div class="root">
      <div class="route-buttons">
        <div
          class="button-row"
          v-for="(row, rowIndex) in filteredButtonRows"
          :key="rowIndex"
        >
          <router-link
            v-for="(route, index) in row"
            :key="index"
            :to="route.path"
            class="route-button"
          >
            <el-button type="danger" round plain>#{{ route.name }}</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonRows: [],
      searchText: '', // 搜索框文本
      select: '',
    }
  },
  created() {
    this.splitRoutes()
  },
  computed: {
    filteredButtonRows() {
      console.log(this.select + this.searchText)
      // 根据搜索框文本过滤按钮行
      if (!(this.select + this.searchText)) {
        return this.buttonRows
      } else {
        return this.buttonRows.map((row) =>
          row.filter((route) =>
            route.name
              .toLowerCase()
              .includes((this.select + this.searchText).toLowerCase())
          )
        )
      }
    },
  },
  methods: {
    splitRoutes() {
      const routes = this.$router.options.routes.slice(1, -1)
      const rowCount = Math.ceil(routes.length / 6) // 假设每行最多显示6个按钮
      for (let i = 0; i < rowCount; i++) {
        const startIndex = i * 6
        const endIndex = (i + 1) * 6
        const row = routes.slice(startIndex, endIndex)
        this.buttonRows.push(row)
      }
    },
    search() {
      // 执行搜索逻辑
      // 这里可以添加你的搜索逻辑代码
    },
  },
}
</script>

<style scoped>
.search-bar {
  opacity: 0.9 !important; /* 使用 !important 提高优先级 */
}
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 95vh;
  margin: 0;
  padding: 0;
  background-image: url('@/imgs/keli.png') !important;
  background-size: cover;
  opacity: 0.9 !important; /* 使用 !important 提高优先级 */
  background-repeat: no-repeat;
}

.route-buttons {
  display: grid;
  grid-gap: 20px;
  justify-items: center;
  align-items: center;
}

.button-row {
  display: flex;
  justify-content: center;
  gap: 50px;
}
body {
}
.route-button:hover {
  animation: floatAnimation 1s infinite;
}

@keyframes floatAnimation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
