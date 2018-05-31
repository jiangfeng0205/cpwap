import Vue from 'vue'
import Router from 'vue-router'
import Authentication from '@/components/Authentication'
import Carnurse from '@/components/Carnurse'
import Findcar from '@/components/Findcar'

import Vehicletool from '@/components/vehicletool'
import PeccancyQuery from '@/components/vehicletool/children/PeccancyQuery'
import PeccancyDetail from '@/components/vehicletool/children/PeccancyDetail'
import CarCalculator from '@/components/vehicletool/children/CarCalculator'

import VehicleEvaluation from '@/components/VehicleEvaluation'
import ProvincePage from '@/components/ProvincePage'
import Contract from '@/components/Contract'
import Contracted from '@/components/Contracted'
import Sign from '@/components/Sign'

import Index from '@/components/Index'
import Login from '@/components/Login'
import Metype from '@/components/Metype'
import Pay from '@/components/Pay'
import Register from '@/components/Register'
import ArticleContent from '@/components/article/Content'
import Cansuccess from '@/components/Cansuccess'
import implementList from '@/components/implement/list'
import router from '../components/router.vue'

Vue.use(Router)

export default new Router({
    //mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/authentication',
            name: 'authentication',
            component: Authentication
        },
        {
            path: '/carnurse',
            name: 'carnurse',
            component: Carnurse
        },
        {
            path: '/findcar',
            name: 'findcar',
            component: Findcar
        },
        {
            path: '/vehicletool',
            name: 'vehicletool',
            component: Vehicletool
        },
        {
            path: '/peccancquery',
            name: 'peccancquery',
            component: PeccancyQuery
        },
        {
            path: '/peccancydetail',
            name: 'peccancydetail',
            component: PeccancyDetail
        },
        {
            path: '/vehicleevaluation',
            name: 'vehicleevaluation',
            component: VehicleEvaluation
        },
        {
            path: '/carcalculator',
            name: 'carcalculator',
            component: CarCalculator 
        },
        {
            path: '/provincepage',
            name: 'provincepage',
            component: ProvincePage
        },
        {
            path: '/contract',
            name: 'contract',
            component: Contract
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/contracted',
            name: 'contracted',
            component: Contracted
        },
        {
            path: '/sign',
            name: 'sign',
            component: Sign
        },
        {
            path: '/metype',
            name: 'metype',
            component: Metype
        },
        {
            path: '/pay',
            name: 'pay',
            component: Pay
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/article/content',
            name: 'content',
            component: ArticleContent
        },
        {
            path: '/carnurse/success',
            name: 'can_success',
            component: Cansuccess
        },
        {
            path: '/implement/list',
            name: 'implement_list',
            component: implementList
        },
        {
            path: '/server',
            name: 'router3',
            component: router,
            children: [
                {
                    path: '/server/navigation',
                    name: 'server_navigation',
                    component: function (resolve) {
                        require(['../components/server/Navigation.vue'], resolve)
                    }
                },
                {
                    path: '/server/start',
                    name: 'server_start',
                    component: function (resolve) {
                        require(['../components/server/Start.vue'], resolve)
                    }
                },
                {
                    path: '/server/list',
                    name: 'ServerSList',
                    component: function (resolve) {
                        require(['../components/server/List.vue'], resolve)
                    }
                },
                {
                    path: '/server/content',
                    name: 'server_content',
                    component: function (resolve) {
                        require(['../components/server/Content.vue'], resolve)
                    }
                },
                {
                    path: '/server/map',
                    name: 'messageList',
                    component: function (resolve) {
                        require(['../components/server/Map.vue'], resolve)
                    }
                },
                {
                    path: '/server/terrace',
                    name: 'serverTerrace',
                    component: function (resolve) {
                        require(['../components/server/Terrace .vue'], resolve)
                    }
                },
                {
                    path: '/server/pay',
                    name: 'messageList',
                    component: function (resolve) {
                        require(['../components/server/PayTerrace.vue'], resolve)
                    }
                },
                {
                    path: '/server/details',
                    name: 'messageList',
                    component: function (resolve) {
                        require(['../components/server/details.vue'], resolve)
                    }
                },
            ]
        },
        {
            path: '/message',
            name: 'router3',
            component: router,
            children: [
                {
                    path: '/message/list',
                    name: 'messageList',
                    component: function (resolve) {
                        require(['../components/message/list.vue'], resolve)
                    }
                },
                {
                    path: '/message/content',
                    name: 'messageContent',
                    component: function (resolve) {
                        require(['../components/message/content.vue'], resolve)
                    }
                }
            ]
        },
        {
            path: '/order',
            name: 'router3',
            component: router,
            children: [
                {
                    path: '/order/list',
                    name: 'orderList',
                    component: function (resolve) {
                        require(['../components/order/list.vue'], resolve)
                    }
                },
                {
                    path: '/order/details',
                    name: 'orderDetails',
                    component: function (resolve) {
                        require(['../components/order/details.vue'], resolve)
                    }
                },
                {
                    path: '/order/releasepage',
                    name: 'releasepage',
                    component: function (resolve) {
                        require(['../components/order/releasePage.vue'], resolve)
                    }
                },
                {
                    path: '/order/city',
                    name: 'city',
                    component: function (resolve) {
                        require(['../components/order/city.vue'], resolve)
                    }
                },
                {
                    path: '/order/pay',
                    name: 'pay',
                    component: function (resolve) {
                        require(['../components/order/Pay.vue'], resolve)
                    }
                }
            ]
        },
        {
            path: '/find',
            name: 'router3',
            component: router,
            children: [
                {
                    path: '/find/index',
                    name: 'findIndex',
                    component: function (resolve) {
                        require(['../components/find/index.vue'], resolve)
                    }
                },
                {
                    path: '/find/car',
                    name: 'findCar',
                    component: function (resolve) {
                        require(['../components/find/car.vue'], resolve)
                    }
                },
                {
                    path: '/find/city',
                    name: 'findCity',
                    component: function (resolve) {
                        require(['../components/find/city.vue'], resolve)
                    }
                },
                {
                    path: '/find/voiture',
                    name: 'findVoiture',
                    component: function (resolve) {
                        require(['../components/find/voiture.vue'], resolve)
                    }
                },
                {
                    path: '/find/cardmodel',
                    name: 'findVcardmodel',
                    component: function (resolve) {
                        require(['../components/find/cardmodel.vue'], resolve)
                    }
                },
                {
                    path: '/find/agreement',
                    name: 'findAgreement',
                    component: function (resolve) {
                    require(['../components/find/agreement.vue'], resolve)
                    },
                },
                {
                    path: '/find/distributionPeople',
                    name: 'distributionPeople',
                    component: function (resolve) {
                        require(['../components/find/distributionPeople.vue'], resolve)
                    }
                }
            ]
        },
        {
            path: '/user',
            name: 'router3',
            component: router,
            children: [
                {
                    path: '/user/index',
                    name: 'listdIndex',
                    component: function (resolve) {
                        require(['../components/user/index.vue'], resolve)
                    }
                },
                {
                    path: '/user/auth',
                    name: 'listdAuth',
                    component: function (resolve) {
                        require(['../components/user/Authen.vue'], resolve)
                    }
                },
                {
                    path: '/user/firmname',
                    name: 'listdFirm',
                    component: function (resolve) {
                        require(['../components/user/firmname.vue'], resolve)
                    }
                },
                {
                    path: '/user/ordercount',
                    name: 'ordercount',
                    component: function (resolve) {
                        require(['../components/user/orderCount.vue'], resolve)
                    }
                },
                {
                    path: '/user/datacollection',
                    name: 'datacollection',
                    component: function (resolve) {
                        require(['../components/user/dataCollection.vue'], resolve)
                    }
                },
                {
                    path: '/user/aboutus',
                    name: 'listdSet',
                    component: function (resolve) {
                        require(['../components/user/aboutus.vue'], resolve)
                    }
                },
                {
                    path: '/user/setting',
                    name: 'listdSet',
                    component: function (resolve) {
                        require(['../components/user/setting.vue'], resolve)
                    }
                },
                {
                path: '/user/nickname',
                name: 'listdFirm',
                component: function (resolve) {
                  require(['../components/user/nickname.vue'], resolve)
                }
              },
              {
                path: '/user/password',
                name: 'listdPassword',
                component: function (resolve) {
                  require(['../components/user/password.vue'], resolve)
                }
              },
                {
                    path: '/user/reset',
                    name: 'listdreset',
                    component: function (resolve) {
                        require(['../components/user/reset.vue'], resolve)
                    }
                },
            //  资料认证datum
              {
                path: '/user/datum',
                name: 'listdDatum',
                component: function (resolve) {
                  require(['../components/user/datum.vue'], resolve)
                }
              },
              {//我的团队
                path: '/user/myteam',
                name: 'myteam',
                component: function (resolve) {
                  require(['../components/user/myteam/index.vue'], resolve)
                }
              },
              {
                path: '/user/teamstatus',
                name: 'teamstatus',
                component: function (resolve) {
                  require(['../components/user/myteam/children/teamStatus.vue'], resolve)
                }
              }
              
            ]
        },
    ]
})
