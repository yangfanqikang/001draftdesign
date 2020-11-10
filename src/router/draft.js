export default [
  {
    path: "/index",
    name: "index",
    component: () => import("@v/draft/index")
  },
  {
    path: "/IndexRender",
    name: "IndexRender",
    component: () => import("@v/draft/IndexRender")
  },
  {
    path: "/DesignCenter",
    name: 'DesignCenter',
    component: () => import('@v/DesignCenter')
  },
  {
    path: "/VueDesign",
    name: 'VueDesign',
    component: () => import('@v/VueDesign')
  },
  {
    path: "/GridLayoutDemo",
    name: 'GridLayoutDemo',
    component: () => import('@v/GridLayoutDemo')
  },
  {
    path: "/BabelRender",
    name: 'BabelRender',
    component: () => import('@v/draft/BabelRender')
  },
  {
    path: "/LabelRender",
    name: 'LabelRender',
    component: () => import('@v/draft/LabelRender')
  },
  {
    path: "/GridDesign",
    name: 'GridDesign',
    component: () => import('@v/GridDesign')
  }
]
