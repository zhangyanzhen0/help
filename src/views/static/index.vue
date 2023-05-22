<template>
  <div class="route-buttons">
    <router-link v-for="(route, index) in routes"
                 :key="index"
                 :to="route.path"
                 class="route-button">
      <el-button type="danger"
                 round
                 plain>{{ route.name }}</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routes: [],
      showButton: true
    };
  },
  methods: {
    printRoutes () {
      const routes = this.$router.options.routes.slice(1, -1); // 从第二条路由开始到倒数第二条路由
      this.routes = routes;
      console.log(this.routes);
      this.showButton = false; // 隐藏按钮
    }
  },
  created () {
    this.printRoutes()
  }
};
</script>

<style >
body {
  margin: 0;
  padding: 0;
  background-image: url("@/imgs/keli.png");
  background-size: cover;
  opacity: 0.9 !important; /* 使用 !important 提高优先级 */
  background-repeat: no-repeat;
}
.route-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100vh; /* 可以根据需要设置高度 */
}

.print-button {
  background-color: #007bff !important;
  color: #fff !important;
  border: none !important;
  padding: 8px 16px !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  transition: background-color 0.3s ease !important;
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