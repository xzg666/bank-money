export default [
  {
    "name": "/ledger",
    "path": "//ledger",
    "hidden": false,
    "redirect": "noRedirect",
    "component": "Layout",
    "alwaysShow": true,
    "meta": {
      "title": "业务台账登记",
      "icon": "dashboard",
      "noCache": false
    },
    "children": [
      {
        "name": "History",
        "path": "history",
        "hidden": false,
        "component": "ledger/history/index",
        "meta": {
          "title": "历史记录",
          "icon": "druid",
          "noCache": false
        }
      },
      {
        "name": "Register",
        "path": "register",
        "hidden": false,
        "component": "ledger/register/index",
        "meta": {
          "title": "台账登记",
          "icon": "link",
          "noCache": false
        }
      },
      {
        "name": "List",
        "path": "list",
        "hidden": false,
        "component": "ledger/list/index",
        "meta": {
          "title": "台账记录",
          "icon": "build",
          "noCache": false
        }
      },
      {
        "name": "Flow/flow_business",
        "path": "flow/flow_business",
        "hidden": false,
        "component": "ledger/flow/flow_bussiness",
        "meta": {
          "title": "实收流水(业务部门)",
          "icon": "money",
          "noCache": false
        }
      },
      {
        "name": "Ledger/flow_finance",
        "path": "ledger/flow_finance",
        "hidden": false,
        "component": "ledger/flow/flow_finance",
        "meta": {
          "title": "实收流水(财务部门)",
          "icon": "money",
          "noCache": false
        }
      }
    ]
  },
]