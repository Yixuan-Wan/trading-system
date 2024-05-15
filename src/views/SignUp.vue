<template>
    <div id="app">
        <div class="container">
            <div class="title">Welcome to Trading Center</div>
            <div class="subtitle">Login to Your Account</div>
            <div class="input-title">Email</div>
            <input type="text" placeholder="please enter your email" v-model="mail">
            <div class="input-title">Name</div>
            <input type="text" placeholder="please enter your name" v-model="name">
            <div class="input-title">Company</div>
            <input type="text" placeholder="please enter your company" v-model="company">
            <div class="input-title">Password</div>
            <input type="password" v-model="password" placeholder="please enter your password">
            <button class="btn" @click="signup">SignUp</button>
            <div class="register-link">Already have an account? <router-link to="/">Login to Account</router-link></div>
        </div>
    </div>
</template>

<script>


export default{
    data() {
        return {
            name:"",
            mail:"",
            company:"",
            password:""
        }
    },
    methods: {
        signup() {
            const userInfo={
                name:this.name,
                mail : this.mail,
                company: this.company,
                password: this.password
            }
            this.$axios.post("http://localhost:8080/trader/register",userInfo)
            .then(response =>{
                console.log(response)
                if(response.data.code==200){
                    this.$router.push("/")
                }
            })
        }
    }
}

</script>

<style scoped>
    #app{
        height: 100vh;
        background-image: url('@/assets/background.png');
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        width: 28%;
        height: 75%;
        background-color: rgba(255, 255, 255);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        padding-top: 30px;
    }

    .title {
        font-size: 24px;
        margin: 10px;
    }
    .subtitle {
        font-size: 16px;
        margin: 10px;
        color: grey;
    }
    .input-title{
        /* margin-top: 20px; */
        font-size: 14px;
        width: 85%;
        text-align: left;
    }
    input {
        width: 80%;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
    }
    .btn {
        width: 80%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        margin-top: 40px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .btn:hover {
        background-color: #0056b3;
    }
    .register-link {
        margin-top: 20px;
        font-size: 14px;
    }
    .register-link a {
        color: #007bff;
        text-decoration: none;
    }
    .register-link a:hover {
        text-decoration: underline;
    }
</style>