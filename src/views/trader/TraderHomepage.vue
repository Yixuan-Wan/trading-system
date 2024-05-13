<template>
    <div id="app">
      <TopBar :userName="userName" :userLevel="userLevel"></TopBar>
      <!-- 顶部栏 -->
      
  
      <div class="main-container">
        <!-- 侧边栏 -->
        <div class="sidebar">
          <NavBar></NavBar>
        </div>
  
        <!-- 内容区域 -->
        <div class="my-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TopBar from "@/components/TopBar.vue";
  import NavBar from "@/components/NavBar.vue";
  
  export default {
    name: "UserHomePage",
    components: {
      TopBar,
      NavBar,
    },
    data() {
      return {
        userName: "John Doe", // 你的用户名称
        userLevel: "Admin",   // 你的用户级别
      };
    },
  };
  </script>
  
  <style scoped>
  #app {
    margin: 0px;
    padding: 0px;
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    overflow: hidden;
    display:flex;
    flex-direction: column;
    height: 100vh;
  }
  
  
  .main-container {
    display: flex;
    width: 100%;
    height: 100%;
  }
  
  .sidebar {
    width: 15vw;
    height: 100%;
    background-color: white;
  }
  
  .my-content{
    width: 85vw;
  }
  
  </style>
  