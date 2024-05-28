<template>
    <div class="content-container">
        <div class="head-box">
            <h2>Limit Orders</h2>
        </div>
        <div class="link-box">
            <el-link type="primary" href="#/trader/order"> Go Back</el-link>
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
                    prop="orderSide"
                    label="Side"
                    width="160">
                </el-table-column>
                <el-table-column
                    label="Cancel"
                    width="160">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="cancelOrder(scope.row)"  size="small">Cancel</el-button>
                    </template>
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
        this.$axios.get("http://localhost:8080/order/list/limit?traderId="+this.traderId+"&pageNo="+this.currentPage+"&pageSize=5")
        .then(response => {
            console.log(response);
            this.tableData = response.data.data.data
            this.pageTotal = response.data.data.totalPages
        })
      },
      cancelOrder(row){
        if(row.remainQuantity==0){
            this.$message.error("ERROR: There is no quantity left in the order")
            return;
        }
        this.$prompt('Please input the cancel quantity(Remain Quantity: '+row.remainQuantity+")", 'Cancel Order ', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d+$/,
          inputErrorMessage: 'Invalid Number'
        }).then(({ value }) => {
        //   this.$message({
        //     type: 'success',
        //     message: '你的邮箱是: ' + value
        //   });
        this.CreateCancelOrder(row.orderId,value)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input Cancelled'
          });       
        });
      },
      CreateCancelOrder(orderId,quantity){
      
        const cancelOrder = {
            deleteOrderId: orderId,
            quantity: quantity,
        }
        // console.log(marketOrder)
        this.$axios.post("http://localhost:8080/order/add/cancel",cancelOrder)
        .then(response =>{
            
            if(response.data.data.isSuccess==1){
                this.$message({
                    type: 'success',
                    message: 'Cancelled successfully'
                });
                this.getLimitOrderList()
            }else{
                this.$message.error("ERROR: Insufficient quantity")
            }
        })
    },
    },
    mounted(){
        this.traderId = window.sessionStorage.getItem("traderId")
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
.link-box{
    width: 90%;
    /* background-color: antiquewhite; */
    text-align: left;
}

</style>


