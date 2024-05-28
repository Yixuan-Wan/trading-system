<template>
    <div class="top-bar">
        <div class="logo-container">
            <img src="@/assets/logo.png" alt="logo" />
        </div>
        <div class="profile-container">
            <div class="image-container">
                <img src="@/assets/trader.png" alt="image" />
            </div>
            <div class="info-container">
                <div class="name">{{ name }}</div>
                <div class="level">{{ type }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:'TopBar',
    
    data() {
        return {
            type:'Morgan Stanley',
            name:"Trader A"
        }
    },
    mounted(){

        this.name = window.sessionStorage.getItem("userName");
        this.type = window.sessionStorage.getItem("company")
      
    }
}
</script>

<style scoped>
.top-bar {
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
.logo-container img {
    height: 30px;
    width: auto;
}

.profile-container {
    display: flex;
    align-items: center;
}

.occupy{
    width: 300px;
}

.image-container {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
}

.image-container img {
    width: 100%;
    height: auto;
}

.info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 40px;
}

.name{
    font-size: 14px;
    font-weight: bold;
}

.level{
    font-size: 12px;
    color: #565656;
}
</style>