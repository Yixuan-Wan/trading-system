import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '@/views/LogIn.vue'
import SignUp from '@/views/SignUp.vue'
import DashBoard from '@/views/trader/DashBoard.vue'
import TraderHomepage from '@/views/trader/TraderHomepage.vue'
import MarketDepth from '@/views/trader/MarketDepth.vue'
import OrderBlotter from '@/views/trader/OrderBlotter.vue'
import CreateOrder from '@/views/trader/CreateOrder.vue'
import CreateStep1 from '@/views/trader/CreateStep1.vue'
import CreateStep2 from '@/views/trader/CreateStep2.vue'
import CreateStep3 from '@/views/trader/CreateStep3.vue'
import BrokerHomePage from '@/views/broker/BrokerHomePage.vue'
import PendingOrder from '@/views/broker/PendingOrder.vue'
import BrokerTransaction from '@/views/broker/BrokerTransaction.vue'
import MyOrder from '@/views/trader/MyOrder.vue'
import MyOrderLimit from '@/views/trader/MyOrderLimit.vue'
import MyOrderMarket from '@/views/trader/MyOrderMarket.vue'
import MyOrderStop from '@/views/trader/MyOrderStop.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/trader',
    name: 'trader',
    component: TraderHomepage,
    redirect: '/trader/market',
    children:[
      {
        path: 'dashboard',
        name: 'dashboard-trader',
        component: DashBoard,
      },
      {
        path: 'market',
        name: 'market-trader',
        component: MarketDepth,
      },
      {
        path: 'blotter',
        name: 'blotter-trader',
        component: OrderBlotter,
      },
      {
        path: 'create',
        name: 'create-trader',
        component: CreateOrder,
        redirect:"/trader/create/step1",
        children:[
          {
            path:'step1',
            name:'step1',
            component: CreateStep1
          },
          {
            path:'step2',
            name:'step2',
            component: CreateStep2
          },
          {
            path:'step3',
            name:'step3',
            component: CreateStep3
          },
        ]
      },
      {
        path:"order",
        name:"order-trader",
        component: MyOrder
      },
      {
        path:"order-limit",
        name:"order-limit-trader",
        component: MyOrderLimit
      },
      {
        path:"order-market",
        name:"order-market-trader",
        component: MyOrderMarket
      },
      {
        path:"order-stop",
        name:"order-stop-trader",
        component: MyOrderStop
      }
    ]
  },{
    path:'/broker',
    name:'broker',
    component: BrokerHomePage,
    redirect:'/broker/market',
    children:[{
      path:'market',
      name:'market-broker',
      component: MarketDepth
    },{
      path:'pending-order',
      name: 'pending-order',
      component: PendingOrder
    },{
      path:'transaction',
      name: 'transaction-broker',
      component: BrokerTransaction
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
