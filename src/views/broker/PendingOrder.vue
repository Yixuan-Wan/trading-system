<template>
    <div class="content-container">
        <div class="head-box">
            <h2>Pending Orders</h2>
        </div>
        <div class="content">
            <el-table
                :data="tableData"
                style="margin: auto; width: 96%; margin-top: 10px;"
                height="450">
                <el-table-column
                    prop="orderId"
                    label="Order Id"
                >
                </el-table-column>
                <el-table-column
                    prop="brokerName"
                    label="Broker"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="Product"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="Period"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="Qty"
                    width="120">
                </el-table-column>

                <el-table-column label="Initiator">
                    <el-table-column
                    prop="traderName"
                    label="Trader"
                    width="130">
                    </el-table-column>

                    <el-table-column
                    prop="traderCompany"
                    label="Company"
                    width="130">
                    </el-table-column>

                    <el-table-column
                    prop="orderSide"
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
          tableData: [],
          pageTotal:5,
          currentPage:1,
          brokerId:""
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleCurrentChange(page){
        this.currentPage = page
        this.getPendingOrders()
      },
      getPendingOrders(){
        this.$axios.get("http://localhost:8080/order/list/limit?brokerId="+this.brokerId+"&pageNo="+this.currentPage+"&pageSize=4")
        .then(response => {
            // console.log(response)
            this.pageTotal = response.data.data.totalPages
            this.tableData = response.data.data.data
        })
      }
    },
    mounted(){
        this.brokerId = window.sessionStorage.getItem("brokerId");
        this.getPendingOrders()
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


