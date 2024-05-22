<template>
    <div class="content-container">
        <div class="head-box">
            <h2>Transaction Center</h2>
        </div>
        <div class="content">
            <el-table
                :data="tableData"
                height="500"
                style="margin: auto; width: 96%; margin-top: 10px;">

                <el-table-column
                    prop="transactionId"
                    label="transaction Id"
                >
                </el-table-column>
                <el-table-column
                    prop="brokerName"
                    label="Broker"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="Product"
                    width="100"
                    :filters="productFilters"
                    :filter-method="filterProduct">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="Period"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="Qty"
                    width="100">
                </el-table-column>

                <el-table-column label="Initiator">
                    <el-table-column
                    prop="trader1Name"
                    label="Trader"
                    width="100">
                    </el-table-column>

                    <el-table-column
                    prop="trader1Company"
                    label="Company"
                    width="100">
                    </el-table-column>

                    <el-table-column
                    prop="side1"
                    label="Side"
                    width="100">
                    </el-table-column>
                </el-table-column>

                <el-table-column label="Completion">
                    <el-table-column
                    prop="trader2Name"
                    label="Trader"
                    width="100">
                    </el-table-column>

                    <el-table-column
                    prop="trader2Company"
                    label="Company"
                    width="100">
                    </el-table-column>

                    <el-table-column
                    prop="side2"
                    label="Side"
                    width="100">
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
          productFilters: [], // 过滤器选项
          filteredProducts: [], // 过滤后的产品列表
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleCurrentChange(currentPage){
       this.getTransactions(currentPage,5)
      },
      getTransactions(pageNo,pagesize){
        this.$axios.get("http://localhost:8080/transaction/get?pageNo="+pageNo+"&pageSize="+pagesize)
        .then(response => {
            console.log(response.data.data)
            this.tableData = response.data.data.data
            this.pageTotal = response.data.data.totalPages,
            this.getProductFilters();
        })
      },
      filterProduct(value, row) {
        return row.productName.toLowerCase().includes(value.toLowerCase());
        },
        getProductFilters() {
        const products = this.tableData.map(item => item.productName);
        const uniqueProducts = [...new Set(products)];
        this.productFilters = uniqueProducts.map(product => {
            return {
            text: product,
            value: product
            };
        });
        }
    },
    mounted(){
        this.getTransactions(0,5);
        
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


