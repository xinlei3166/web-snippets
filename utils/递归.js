let l = [
    {'name': '一级分类', 'id': 1, 'pid': null},
    {'name': '二级分类', 'id': 2, 'pid': 1},
    {'name': '三级分类', 'id': 3, 'pid': 2},
    {'name': '四级分类', 'id': 4, 'pid': 3},
];

function recursion(obj) {
    obj.childs = [];
    for (let i of l) {
        if (i.pid === obj.id) {
            obj.childs.push(recursion(i));
        }
    }
    return obj;
}

for (let obj of l) {
    if (obj.pid === null) {
        const res = recursion(obj);
        console.log(JSON.stringify(res))
    }
}

const routes = [
    {
        title: '首页',
        icon: '',
        path: '/index',
        element: 1,
        children: [
            {
                title: '首页',
                icon: '',
                path: '/index',
                element: 11,
                children: [
                    {
                        title: '首页',
                        icon: '',
                        path: '/index',
                        element: 111,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        title: '首页',
        icon: '',
        path: '/index',
        element: 2,
        children: [
            {
                title: '首页',
                icon: '',
                path: '/index',
                element: 22
            }
        ]
    }
]

function recursive(routes) {
    let routerRoutes = []
    for (const route of routes) {
        const obj = { path: route.path, element: route.element, children: [] }
        if (route.children && route.children.length > 0) {
            obj.children = recursive(route.children)
        }
        routerRoutes.push(obj)
    }
    return routerRoutes
}

console.log(JSON.stringify(recursive(routes)))
