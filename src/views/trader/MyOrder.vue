<template>
    <div class="content-container">
        <div class="head-box">
            <h2>My Orders</h2>
        </div>
        <div class="content">
            <el-table
                :data="tableData"
                style="margin: auto; width: 96%; margin-top: 10px;">
                <el-table-column
                    prop="tradeId"
                    label="TradeId"
                >
                </el-table-column>
                <el-table-column
                    prop="broker"
                    label="Broker"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="product"
                    label="Product"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="period"
                    label="Period"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="qty"
                    label="Qty"
                    width="120">
                </el-table-column>

                <el-table-column label="Initiator">
                    <el-table-column
                    prop="trader1"
                    label="Trader"
                    width="130">
                    </el-table-column>

                    <el-table-column
                    prop="company1"
                    label="Company"
                    width="130">
                    </el-table-column>

                    <el-table-column
                    prop="side1"
                    label="Side"
                    width="130">
                    </el-table-column>
                </el-table-column>

                
                
            </el-table>

            <div class="pagination">
                <el-pagination
                :current-page="currentPage"
                layout="prev, pager, next" 
                :page-count="pageTotal"
                @current-change="handleCurrentChange"
                />
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
        return {
          tableData: [{
            tradeId:"312345",
            broker:"M",
            product:"Gold",
            period:"SEP 16",
            price:"1246",
            qty:"50",
            trader1:"Sam Wang",
            company1:"ABC Corp",
            side1:"Sell",
            trader2:"Anna Liu",
            company2:"MS",
            side2:"Buy"
          }],
          pageTotal:5,
          currentPage:1
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

      }
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
    background-color: white;
    padding: 10px;
    border-radius: 10px;
}
.pagination{
    margin-top: 2%;
    text-align: right;
}

</style>


