<template>
    <div class="content-container">
        <div class="head-box">
            <h2>My Orders</h2>
        </div>
        <div class="content">
            <el-table
                :data="tableData"
                style="margin: auto; width: 96%; margin-top: 10px;"
                height="410">
                <el-table-column
                    prop="orderId"
                    label="Order Id"
                >
                </el-table-column>
                <el-table-column
                    prop="brokerId"
                    label="Broker Id"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="productId"
                    label="Product Id"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="Qty"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="remainQuantity"
                    label="Remain Qty"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="Price"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="Create Time"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="Update Time"
                    width="160">
                </el-table-column>
                
<!-- 
                <el-table-column label="Initiator">
                    <el-table-column
                    prop="traderId"
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
                </el-table-column> -->

                
                
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
          traderId:""
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
        this.currentPage = page;
        this.getLimitOrderList()
      },
      getLimitOrderList(){
        this.$axios.get("http://localhost:8080/order/list?traderId="+this.traderId+"&pageNo="+this.currentPage+"&pageSize=5")
        .then(response => {
            this.tableData = response.data.data.data
            this.pageTotal = response.data.data.totalPages
        })
      },
    },
    mounted(){
        this.traderId = window.localStorage.getItem("traderId")
        this.getLimitOrderList()
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


