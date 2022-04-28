import request from '@/utils/request'

const dicts = {
    // namespaced: true,
    state: {
        dictData: {}
        /* 
        催收方式:collection_type
        催收方式—添加代办:collection_type_todo
        催收类型:collection_mode
        待办状态:todo_status
        贷款管理部:dkglb
        发起方式:start_type
        待办类型:todo_type
        业务类型:business_type
        证件类型:cert_type
        性别:sys_user_sex
        最高学历:highest_degree
        家庭月收入:home_income
        个人月收入:personal_income
        催收登记页面_处理状态:collect_deal_status
        贷款担保类型:guarantee_type
        催收人员:collect_users
        业务类型：business_type
        贷款类型:loan_type
        是否:yes_no,
        还款方式:repayment_type,
        面谈地址类型:talk_adress_type
        函件类型:letters_type
        客户标签:custom_label
        消息中心业务类型  tx_busi_type

        增信状态:addCredit_status
        增信类型:addCredit_type
        供应商星级: supplier_level
        金额校验: amount_check
        流程类别: workFlow_type
        购房次数:num_house_dict
        抵押类型:mortgage_type_dict
        委托业务状态:wdywzt
        委贷整体状态:all_status
        是否按时放款:is_lending

        电子保函理赔状态:dzbh_lp_status
        电子保函开票状态:dzbh_kp_status
        电子保函开票类型:dzbh_kp_type
        电子保函担保状态:dzbh_db_status
        电子保函申请状态:dzbh_sq_status
        电子保函审核结果:dzbh_shjg
        电子保函退保状态:dzbh_tbzt
        电子保函支付状态:dzbh_zfzt
        电子保函申请审核状态:dzbh_sqshzt
        电子保函账户类型:dzbh_zhlx
        电子保函卡类型:dzbh_klx
        电子保函订单类型:dzbh_ddlx
        电子保函业务类型:dzbh_yylx
        电子保函支付方式:dzbh_zfsf
        电子保函是否支付超时:dzbh_sfzfcs
        电子保函接口调用状态:dzbh_dyzt
         电子保函接口调用方:dzbh_dyf
        */
    },

    mutations: {
        setDict: (state, dicts) => {
            state.dictData = dicts
        }
    },

    actions: {
        Set_Dict({ commit }) {
            request({
                url: '/system/dict/data/getAll',
                methods: 'get'
            }).then(res => {
                if (res.code === 200) {
                    commit('setDict', res.data)
                }
            })
        },
    }
}

export default dicts