import Template from '@src/template';
import userGroup from './userGroup'; //用户组
import user from './user'; //用户
import userdetails from './userdetails'; //用户详情
import Notbrush from './Notbrush'; //用户详情
import greetPage from './greetPage';
module.exports = {
    path: '/jurisdiction',
    component: Template,
    meta: {
        title: '菜单'
    },
    children: [
        {
            path: 'userGroup',
            name: 'jurisdiction_userGroup',
            component: userGroup,
            meta: {
                title: '刷单管理'
            }
        },
        {
            path: 'user',
            name: 'jurisdiction_user',
            component: user,
            meta: {
                title: '产品详情'
            }
        },
        {
            path: 'greetPage',
            name: 'jurisdiction_greetPage',
            component: greetPage,
            meta: {
                title: '欢迎进入'
            },
        },
        {
            path: 'userdetails',
            name: 'jurisdiction_userdetails',
            component: userdetails,
            meta: {
                title: '用户详情'
            },
        },
        {
            path: 'Notbrush',
            name: 'jurisdiction_Notbrush',
            component: Notbrush,
            meta: {
                title: '未刷单产品'
            },
        }
    ]
}