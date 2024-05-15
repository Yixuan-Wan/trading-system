<template>
    <div class="content-container">
        <div class="head-box">
            <h2>Market Depth</h2>
        </div>
        <div class="content">
            <div class="product-box">
                <el-menu
                    default-active="1-1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    style="text-align: left; border: none;">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-box"></i>
                        <span>Energy</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1" @click="updateMarket(1)">Oil</el-menu-item>
                        <el-menu-item index="1-2" @click="updateMarket(2)">Natural Gas</el-menu-item>
                        <el-menu-item index="1-3" @click="updateMarket(3)">Electricity</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-coordinate"></i>
                        <span>Metals</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="2-1" @click="updateMarket(4)">gold</el-menu-item>
                        <el-menu-item index="2-2" @click="updateMarket(5)">silver</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    
                    </el-menu>
            </div>
            <div class="market-box">
              <el-form :inline="true" class="demo-form-inline" >
                <el-form-item :label="'Buy Market total: ' + buyNum">
                </el-form-item>
                <el-form-item :label="'Sell Market total: ' + sellNum">
                </el-form-item>
                <el-form-item label="  level">
                  <el-input v-model="currentLevel" placeholder="level" style="width: 80px;"></el-input>
                </el-form-item>
                <el-form-item label=" - ">
                  <el-input :value="parseInt(currentLevel) + 2" placeholder="level" style="width: 80px;" disabled></el-input>
                </el-form-item>
              
                <el-form-item>
                  <el-button type="primary" @click="getMarketDepth">Search</el-button>
                </el-form-item>
              </el-form>
                <el-table
                    :data="tableData"
                    style="margin: auto; width: 90%; ">
                    <el-table-column
                        prop="levelBuy"
                        label="Level"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="buyVol"
                        label="Buy Vol"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="Price">
                    </el-table-column>
                    <el-table-column
                        prop="sellVol"
                        label="Sell Vol"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="levelSell"
                        label="Level"
                        width="150">
                    </el-table-column>
                    </el-table>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
        return {
          tableData: [],
          currentLevel:1,
          endLevel:3,
          buyNum:"",
          sellNum:"",
          product_id:1
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleCurrentChange(){

      },
      getMarketDepth(){
        this.$axios.get('http://localhost:8080/market/'+this.product_id+'?startLevel='+(this.currentLevel-1))
        .then(response => {
          console.log(response.data.data)
          this.tableData = response.data.data;
        })
        .catch(error => {
          console.error('请求出错:', error);
        });
      },
      getMarketNum(){
        this.$axios.get("http://localhost:8080/market/num?productId="+this.product_id)
        .then(response => {
          // console.log(response);
          this.buyNum  = response.data.data.buyNum
          this.sellNum = response.data.data.sellNum
        })
      },
      updateMarket(product_id){
        this.product_id = product_id
        this.currentLevel = 1
        this.getMarketDepth()
        this.getMarketNum()
      }
    },
    mounted(){
      this.getMarketDepth()
      this.getMarketNum()
      this.product_id = 1;
    }
  }
</script>



<style scoped>
.content-container{
    background-color: #F5F6FA;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.head-box{
    width: 90%;
    text-align: start;
    margin-bottom: 10px;
    margin-top: 25px;
}

.content{
    width: 90%;
    height: 80%;
    /* background-color: #49d729; */
    display: flex;
    justify-content: space-between;
}

.product-box{
    width: 18%;
    height: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
}

.market-box{
    width: 75%;
    height: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
}

.pagination{
    margin-top: 2%;
    text-align: right;
    /* width: 90%; */
    /* margin: auto; */
}



</style>


