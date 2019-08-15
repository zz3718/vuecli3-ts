import { loadModules, loadCss } from 'esri-loader'
const options = { version: '3.22' }
loadCss(options.version)

// import { autoList, layers } from '@/utils/data.js'
// const maxIndex = autoList.length - 1

// const VectorTileServer = 'http://172.18.2.90:6081/arcgis/rest/services/Hosted/HZ_Dark/VectorTileServer'

// const mapExtent = {
//   spatialReference: {
//     latestWkid: 4490,
//     wkid: 4490
//   },
//   xmax: 121.31414657807291,
//   xmin: 117.73958118592718,
//   ymax: 30.550523245135203,
//   ymin: 29.20318705886489
// }
// let map = null
let esri = null
export default {
  data() {
    return {
      startZoom: 0,
      zoom: 0,
      geometry: null,
      geometries: [],
      graphicsLayer: null,
      simpleFillSymbol: null,
      crossLayers: [],
      showSlider: false,
      layerIndex: 0,
      interval: 6000
    }
  },
  computed: {

  },
  methods: {
    loadEsri() {
      return loadModules([
        "esri/map",
        "esri/geometry/Point",
        "esri/geometry/Extent",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/VectorTileLayer",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/GraphicsLayer",
        "esri/tasks/IdentifyTask",
        "esri/tasks/IdentifyParameters",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "esri/graphic",
        "dojo/domReady!"
      ], options).then(([
        Map,
        Point,
        Extent,
        tasksQuery,
        QueryTask,
        ArcGISDynamicMapServiceLayer,
        VectorTileLayer,
        ArcGISTiledMapServiceLayer,
        GraphicsLayer,
        IdentifyTask,
        IdentifyParameters,
        SimpleFillSymbol,
        SimpleLineSymbol,
        Color,
        Graphic
      ]) => {
        esri = {
          Map,
          Point,
          Extent,
          tasksQuery,
          QueryTask,
          ArcGISDynamicMapServiceLayer,
          VectorTileLayer,
          ArcGISTiledMapServiceLayer,
          GraphicsLayer,
          IdentifyTask,
          IdentifyParameters,
          SimpleFillSymbol,
          SimpleLineSymbol,
          Color,
          Graphic
        }
        this.graphicsLayer = new esri.GraphicsLayer()
        this.simpleFillSymbol = new esri.SimpleFillSymbol(
          esri.SimpleFillSymbol.STYLE_SOLID,
          new esri.SimpleLineSymbol(esri.SimpleLineSymbol.STYLE_SOLID, new esri.Color([84, 168,
            229
          ]), 1),
          new esri.Color([174, 201, 243, 0.1])
        )
      })
    },
    map(id, options) {
      return this.loadEsri().then(() => {
        const BASE_LAYER = new esri.VectorTileLayer(VectorTileServer, {
          id: 'VectorTileServer'
        })
        map = new esri.map(id, Object.assign({
          center: [119.65, 29.37],
          showAttribution: false,
          logo: false,
          slider: false
        }, options))
        map.addLayers([BASE_LAYER])
        this.map.once('load', this.mapReady)
        return map
      })
    },
    mapReady() {
      this.showSlider = true
      const zoom = map.getZoom() - 1
      this.startZoom = zoom
      map.setZoom(zoom)
      this.setTimer(this.pType)
      map.on('click', this.mapClick)
      map.on('zoom-end', this.zoomEnd)
    },
    zoomEnd(o) {
      this.zoom = o.level
    },
    incre() {
      map.setZoom(map.getZoom() + 1)
    },
    decre() {
      map.setZoom(map.getZoom() - 1)
    },
    mapClick(e) {

    },
    addDynamicLayer(url, where) {
      
    }
  }
}

