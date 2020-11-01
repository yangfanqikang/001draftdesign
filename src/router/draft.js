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
  }
]
