<template>
    <div class="nav-bar">
      <div class="menu-items">
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          :class="index==pageIndex ? 'nav-item-active':'nav-item'"
          @click="navigate(item.route,index)"
        >
          <img :src="index==pageIndex ? item.iconActive : item.icon" :alt="item.name" />
          <span>{{ item.name }}</span>
        </div>
      </div>
      
    </div>

  </template>
  
  
  <script>


  export default {
    name:"NavBar",
    
    data() {
        return {
            pageIndex: 0,
            menuItems: [
                // {
                //   isActive: true,
                //   name: 'DashBoard',
                //   icon: require('@/assets/dashboard.png'),
                //   iconActive: require('@/assets/dashboard-white.png'),
                //   route: '/dashboard',
                // },
                {
                  isActive: false,
                  name: 'Market Depth',
                  icon: require('@/assets/market.png'),
                  iconActive: require('@/assets/market-white.png'),
                  route: '/market',
                },
                {
                  isActive: false,        
                  name: 'Pending Orders',
                  icon: require('@/assets/list.png'),
                  iconActive: require('@/assets/list-white.png'),
                  route: '/pending-order',
                },
                {
                  isActive: false,
                  name: 'Transactions',
                  icon: require('@/assets/dashboard.png'),
                  iconActive: require('@/assets/dashboard-white.png'),
                  route: '/transaction',
                },
                

            ],
        };
    },
    methods: {
        navigate(route,idx) {
            this.pageIndex = idx;
            this.$router.push('/broker'+route);
        },
        logout() {
            this.$router.push('/');
        },
        handleMouseLeave(item, index) {
            if (index !== 0) {
                item.isActive = false;
            }
        }
    },
    mounted(){
      const path = this.$route.path
      console.log(path)   
    }

  };
  </script>
  
  <style scoped>
  .nav-bar {
    width: 210px;
    background-color: white;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  
  .nav-item {
    display: flex;
    align-items: center;
    height: 50px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .nav-item:hover, .nav-item.active {
    background-color: #4880ff;
    border-radius: 6px;
    width: 190px;
    color: white;
  }

  .nav-item-active{
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #4880ff;
    border-radius: 6px;
    width: 190px;
    color: white;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 14px;
  }
  

  .nav-item img,
  .nav-item-active img {
    width: 25px;
    height: 25px;
    margin: 0 10px;
    }

  .nav-item span {
    font-size: 14px;
    color: black;
  }
  
  .nav-item.active span, .nav-item:hover span {
    color: white;
  }
  
  </style>
  