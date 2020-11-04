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
    path: "/BabelRender",
    name: 'BabelRender',
    component: () => import('@v/draft/BabelRender')
  },
  {
    path: "/LabelRender",
    name: 'LabelRender',
    component: () => import('@v/draft/LabelRender')
  }
]
