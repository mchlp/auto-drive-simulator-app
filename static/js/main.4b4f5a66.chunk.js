(this["webpackJsonpauto-drive-network-app"]=this["webpackJsonpauto-drive-network-app"]||[]).push([[0],{115:function(e,t){},118:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(16),c=n.n(o),i=n(20),s=n(3),l=n(12),d=n(122),u=n(125),p=n(124),m=n(9),f=n(10),v=n(14),h=n(34),y=n.n(h),O=function(){function e(){Object(m.a)(this,e)}return Object(f.a)(e,null,[{key:"generateShortUuid",value:function(){return this.shortUuidGenerator.generate()}},{key:"getCoordFromWaypoint",value:function(e,t){return e.startsWith("intersection")?t.intersections[e].coord:e.startsWith("location")?t.locations[e].coord:null}},{key:"getDistanceBetweenArrayCoords",value:function(e,t){for(var n=0,a=0;a<e.length;a++)n+=Math.pow(t[a]-e[a],2);return Math.sqrt(n)}},{key:"initUtils",value:function(t,n,a,r,o){e.canvasProps=t,e.canvasWidth=n,e.canvasHeight=a,e.canvasOffsetLeft=r,e.canvasOffsetTop=o,e.ready=!0}},{key:"mapArrayCoord",value:function(t){return t?t.map(e.mapSingleCoord):null}},{key:"unmapArrayCoord",value:function(t){return t?t.map(e.unmapSingleCoord):null}},{key:"scaleSingleCoord",value:function(t){return t*e.canvasProps.zoom}},{key:"unscaleSingleCoord",value:function(t){return t/e.canvasProps.zoom}},{key:"mapSingleCoord",value:function(t,n){var a=e.scaleSingleCoord(t);return 0===n?a+=e.canvasWidth/2-e.canvasProps.centerX:1===n&&(a+=e.canvasHeight/2-e.canvasProps.centerY),a}},{key:"unmapSingleCoord",value:function(t,n){var a=t;return 0===n?a-=e.canvasWidth/2-e.canvasProps.centerX:1===n&&(a-=e.canvasHeight/2-e.canvasProps.centerY),e.unscaleSingleCoord(a)}}]),e}();O.ready=!1,O.shortUuidGenerator=y()(y.a.constants.flickrBase58);var E,b={ROAD_DRIVING_SIDE:{LEFT:"left",RIGHT:"right"},VEHICLE_STATE:{SPAWNED:"spawned",DEPARTURE_READY:"departure_ready",EN_ROUTE:"en_route",ARRIVED:"arrived"},ROAD_TYPES:{TYPES:{LOCAL:"LOCAL",MINOR:"MINOR",MAJOR:"MAJOR"},WIDTH:{LOCAL:50,MINOR:60,MAJOR:100}},VEHICLE_DIRECTION:{TOWARDS_START:"towards_start",TOWARDS_END:"towards_end"},DISPLAY:{INTERSECTION_RADIUS:45,LOCATION_RADIUS:30}},g=b,S=function(){function e(){Object(m.a)(this,e)}return Object(f.a)(e,null,[{key:"render",value:function(e,t,n){var a=function(n){Object.entries(t.roads).forEach((function(a){a[0];var r=a[1],o=O.mapArrayCoord(O.getCoordFromWaypoint(r.start,t)),c=O.mapArrayCoord(O.getCoordFromWaypoint(r.end,t));if(o&&c)if("pavement"===n)r.type===g.ROAD_TYPES.TYPES.LOCAL?e.lineWidth=O.scaleSingleCoord(g.ROAD_TYPES.WIDTH.LOCAL):r.type===g.ROAD_TYPES.TYPES.MINOR?e.lineWidth=O.scaleSingleCoord(g.ROAD_TYPES.WIDTH.MINOR):r.type===g.ROAD_TYPES.TYPES.MAJOR&&(e.lineWidth=O.scaleSingleCoord(g.ROAD_TYPES.WIDTH.MAJOR)),e.strokeStyle="black",e.lineJoin="round",e.setLineDash([]),e.beginPath(),e.moveTo.apply(e,Object(v.a)(o)),e.lineTo.apply(e,Object(v.a)(c)),e.stroke();else if("center-line"===n){if(e.lineWidth=O.scaleSingleCoord(1),e.strokeStyle="yellow",r.type===g.ROAD_TYPES.TYPES.LOCAL)e.setLineDash([O.scaleSingleCoord(5),O.scaleSingleCoord(5)]),e.beginPath(),e.moveTo.apply(e,Object(v.a)(o)),e.lineTo.apply(e,Object(v.a)(c)),e.stroke();else if(r.type===g.ROAD_TYPES.TYPES.MINOR)e.setLineDash([]),e.beginPath(),e.moveTo.apply(e,Object(v.a)(o)),e.lineTo.apply(e,Object(v.a)(c)),e.stroke();else if(r.type===g.ROAD_TYPES.TYPES.MAJOR){e.setLineDash([]),e.beginPath(),e.moveTo.apply(e,Object(v.a)(o)),e.lineTo.apply(e,Object(v.a)(c)),e.stroke();var i={x:c[0]-o[0],y:c[1]-o[1]},s={x:-i.y/Math.sqrt(Math.pow(i.x,2)+Math.pow(i.y,2)),y:i.x/Math.sqrt(Math.pow(i.x,2)+Math.pow(i.y,2))};e.strokeStyle="white",e.setLineDash([O.scaleSingleCoord(3),O.scaleSingleCoord(5)]),e.beginPath(),e.moveTo(o[0]+O.scaleSingleCoord(25*s.x),o[1]+O.scaleSingleCoord(25*s.y)),e.lineTo(c[0]+O.scaleSingleCoord(25*s.x),c[1]+O.scaleSingleCoord(25*s.y)),e.stroke(),e.beginPath(),e.moveTo(o[0]-O.scaleSingleCoord(25*s.x),o[1]-O.scaleSingleCoord(25*s.y)),e.lineTo(c[0]-O.scaleSingleCoord(25*s.x),c[1]-O.scaleSingleCoord(25*s.y)),e.stroke()}e.lineJoin="round"}}))};a("pavement"),a("center-line")}}]),e}(),T=function(){function e(){Object(m.a)(this,e)}return Object(f.a)(e,null,[{key:"render",value:function(e,t,n){Object.entries(t.locations).forEach((function(t){var a=t[0],r=t[1],o=O.mapArrayCoord(r.coord);e.lineWidth=2,e.strokeStyle="grey",e.fillStyle="#ff0000",e.setLineDash([]),e.beginPath(),e.arc(o[0],o[1],O.scaleSingleCoord(g.DISPLAY.LOCATION_RADIUS),0,2*Math.PI),e.stroke(),e.fill(),n&&(e.font=O.scaleSingleCoord(50)+"px Arial",e.strokeStyle="white",e.strokeWidth=O.scaleSingleCoord(2),e.strokeText(a,o[0],o[1]),e.fillStyle="black",e.fillText(a,o[0],o[1]))}))}}]),e}(),D=function(){function e(){Object(m.a)(this,e)}return Object(f.a)(e,null,[{key:"render",value:function(e,t,n){Object.entries(t.intersections).forEach((function(t){var a=t[0],r=t[1],o=O.mapArrayCoord(r.coord);e.lineWidth=2,e.strokeStyle="grey",e.fillStyle="#00ff00",e.setLineDash([]),e.beginPath(),e.arc(o[0],o[1],O.scaleSingleCoord(g.DISPLAY.INTERSECTION_RADIUS),0,2*Math.PI),e.stroke(),e.fill(),n&&(e.font=O.scaleSingleCoord(50)+"px Arial",e.strokeStyle="white",e.strokeWidth=O.scaleSingleCoord(2),e.strokeText(a,o[0],o[1]),e.fillStyle="black",e.fillText(a,o[0],o[1]))}))}}]),e}(),C=function(){function e(){Object(m.a)(this,e)}return Object(f.a)(e,null,[{key:"render",value:function(e,t,n){Object.entries(t.vehicles).forEach((function(t){var a=t[0],r=t[1],o=O.mapArrayCoord(r.coord);if(e.lineWidth=2,e.strokeStyle="grey",e.fillStyle="blue",e.setLineDash([]),e.beginPath(),e.arc(o[0],o[1],O.scaleSingleCoord(10),0,2*Math.PI),e.stroke(),e.fill(),n){e.lineJoin="round",e.miterLimit=2;var c="".concat(a," | Src: ").concat(r.originId," | Dest: ").concat(r.destinationId);e.font=O.scaleSingleCoord(15)+"px Arial",e.strokeStyle="black",e.strokeWidth=O.scaleSingleCoord(1),e.strokeText(c,o[0],o[1]),e.fillStyle="yellow",e.fillText(c,o[0],o[1])}}))}}]),e}(),P=n(19),w=n(60),A={APP_MODE_LIST:{VIEW_MAP:"view_map",CREATE_MAP:"create_map"}},L="UPDATE_MAP_DATA_LOADED",j="UPDATE_AVERAGE_RENDERS_PER_SECOND",_="UPDATE_AVERAGE_UPDATES_PER_SECOND",R="UPDATE_CUR_MODE",I="UPDATE_SELECTED_COMPONENT",k="UPDATE_HOVERED_COMPONENT",M="UPDATE_SHOW_DYNAMIC_LABELS",N="UPDATE_SHOW_STATIC_LABELS",U="UPDATE_SHOW_TOGGLE_DYNAMIC_LABELS",x="UPDATE_SHOW_FPS_WARNING",Y="UPDATE_CUR_TRIP_VEHICLE",W="UPDATE_CANVAS_DIMENSIONS",F="UPDATE_CANVAS_PROPS_BY_DIFF",z="UPDATE_CANVAS_PROPS",V="UPDATE_CANVAS_PROPS_BY_ZOOM_FACTOR",H={setCanvasPropsZoom:function(e,t){return{type:V,payload:{zoomOffsetFromViewCentre:t,zoomFactor:e}}},setCanvasPropsDiff:function(e){return{type:F,payload:e}},setCanvasProps:function(e){return{type:z,payload:e}},setCanvasDimensions:function(e){return{type:W,payload:e}},setCurMode:function(e){return{type:R,payload:e}},setSelectedComponent:function(e){return{type:I,payload:e}},setHoveredComponent:function(e){return{type:k,payload:e}},setShowDynamicLabels:function(e){return{type:M,payload:e}},setShowStaticLabels:function(e){return{type:N,payload:e}},setShowToggleDynamicLabels:function(e){return{type:U,payload:e}},setShowFpsWarning:function(e){return{type:x,payload:e}},setCurTripVehicle:function(e){return{type:Y,payload:e}},setMapDataLoaded:function(e){return{type:L,payload:e}},setAverageUpdatesPerSecond:function(e){return{type:_,payload:e}},setAverageRendersPerSecond:function(e){return{type:j,payload:e}}},X={mapDataLoaded:!1,averageUpdatesPerSecond:Number.POSITIVE_INFINITY,averageRendersPerSecond:Number.POSITIVE_INFINITY,curMode:A.APP_MODE_LIST.VIEW_MAP,selectedComponent:null,hoveredComponent:null,showLabels:{dynamic:!0,static:!0},showToggleDynamicLabels:!0,showLowFpsWarning:!1,shownLowFpsWarning:!1,curTripVehicle:null,canvasDimensions:{width:0,height:0},canvasProps:{centerX:0,centerY:0,zoom:.5}},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case j:return Object(s.a)(Object(s.a)({},e),{},{averageRendersPerSecond:t.payload});case _:return Object(s.a)(Object(s.a)({},e),{},{averageUpdatesPerSecond:t.payload});case L:return Object(s.a)(Object(s.a)({},e),{},{mapDataLoaded:t.payload});case V:var n=t.payload,a=n.zoomOffsetFromViewCentre,r=n.zoomFactor,o={x:a.x+e.canvasProps.centerX,y:a.y+e.canvasProps.centerY};return Object(s.a)(Object(s.a)({},e),{},{canvasProps:{centerX:e.canvasProps.centerX-o.x*(1-r),centerY:e.canvasProps.centerY-o.y*(1-r),zoom:e.canvasProps.zoom*r}});case F:return Object(s.a)(Object(s.a)({},e),{},{canvasProps:{centerX:t.payload.centerX?e.canvasProps.centerX+t.payload.centerX:e.canvasProps.centerX,centerY:t.payload.centerY?e.canvasProps.centerY+t.payload.centerY:e.canvasProps.centerY,zoom:t.payload.zoom?e.canvasProps.zoom*t.payload.zoom:e.canvasProps.zoom}});case z:return Object(s.a)(Object(s.a)({},e),{},{canvasProps:Object(s.a)(Object(s.a)({},e.canvasProps),t.payload)});case W:return Object(s.a)(Object(s.a)({},e),{},{canvasDimensions:Object(s.a)(Object(s.a)({},e.canvasDimensions),t.payload)});case R:return Object(s.a)(Object(s.a)({},e),{},{curMode:t.payload});case I:return Object(s.a)(Object(s.a)({},e),{},{selectedComponent:t.payload});case k:return Object(s.a)(Object(s.a)({},e),{},{hoveredComponent:t.payload});case M:return Object(s.a)(Object(s.a)({},e),{},{showLabels:Object(s.a)(Object(s.a)({},e.showLabels),{},{dynamic:t.payload})});case N:return Object(s.a)(Object(s.a)({},e),{},{showLabels:Object(s.a)(Object(s.a)({},e.showLabels),{},{static:t.payload})});case U:return Object(s.a)(Object(s.a)({},e),{},{showToggleDynamicLabels:t.payload});case x:return t.payload&&!e.shownLowFpsWarning?Object(s.a)(Object(s.a)({},e),{},{showLowFpsWarning:!0,shownLowFpsWarning:!0}):Object(s.a)(Object(s.a)({},e),{},{showLowFpsWarning:!1});case Y:return Object(s.a)(Object(s.a)({},e),{},{curTripVehicle:t.payload});default:return e}},B=n(61);function G(){return E}var q={mapData:null,lastUpdateTimeElapsedList:[]};q.lastUpdateTime=performance.now(),q.lastReduxUpdateTime=performance.now();var Z=function(e){var t=!!q.mapData;q.mapData=e,t||G().dispatch(H.setMapDataLoaded(!0));var n=performance.now(),a=n-q.lastUpdateTime;if(q.lastUpdateTimeElapsedList.push(a),q.lastUpdateTimeElapsedList.length>100&&q.lastUpdateTimeElapsedList.shift(),n-q.lastReduxUpdateTime>1e3){var r=1e3/(q.lastUpdateTimeElapsedList.reduce((function(e,t){return e+t}),0)/q.lastUpdateTimeElapsedList.length);q.lastUpdateTimeElapsedList.length<100&&(r=Number.POSITIVE_INFINITY),G().dispatch(H.setAverageUpdatesPerSecond(r)),q.lastReduxUpdateTime=n}q.lastUpdateTime=n};q.init=function(e){e.on("update-map-data",Z)},q.cleanup=function(e){e.off("update-map-data",Z)};var K=q,Q=function(){function e(){Object(m.a)(this,e)}return Object(f.a)(e,null,[{key:"getMapData",value:function(){return K.mapData}},{key:"getShowLabels",value:function(){var e=G().getState(),t=e.showToggleDynamicLabels,n=e.showLabels.dynamic;return t&&n}},{key:"_renderStatic",value:function(e){var t=this.getMapData(),n=this.getShowLabels(),a=G().getState().canvasDimensions,r=a.width,o=a.height;if(t&&e){var c=e.getContext("2d");c.clearRect(0,0,r,o),c.fillStyle="#dddddd",c.fillRect(0,0,r,o);var i=new Image;i.src="/logo192.png",i.onload=function(){c.drawImage(i,0,0,50,50)},S.render(c,t,n),T.render(c,t,n),D.render(c,t,n)}}},{key:"_renderDynamic",value:function(e){var t=this.getMapData(),n=this.getShowLabels(),a=G().getState().canvasDimensions,r=a.width,o=a.height;if(t&&e){var c=e.getContext("2d");c.clearRect(0,0,r,o),C.render(c,t,n)}}},{key:"renderAll",value:function(e,t){this._renderStatic(e),this._renderDynamic(t);var n=performance.now(),a=n-this.lastRenderTime;if(this.lastRenderTimeElapsedList.push(a),this.lastRenderTimeElapsedList.length>100&&this.lastRenderTimeElapsedList.shift(),n-this.lastReduxUpdateTime>1e3){var r=1e3/(this.lastRenderTimeElapsedList.reduce((function(e,t){return e+t}),0)/this.lastRenderTimeElapsedList.length);this.lastRenderTimeElapsedList.length<100&&(r=Number.POSITIVE_INFINITY),G().dispatch(H.setAverageRendersPerSecond(r)),this.lastReduxUpdateTime=n}this.lastRenderTime=n}}]),e}();Q.lastRenderTimeElapsedList=[],Q.lastRenderTime=performance.now(),Q.lastReduxUpdateTime=performance.now();var $=n(7);var ee=Object($.b)((function(e){return{curMode:e.curMode,mapLoaded:e.mapDataLoaded,showDynamicLabels:e.showLabels.dynamic,showToggleDynamicLabels:e.showToggleDynamicLabels,canvasProps:e.canvasProps,canvasDimensions:e.canvasDimensions}}))((function(e){var t=e.showToggleDynamicLabels,n=e.dispatch,o=e.canvasProps,c=e.canvasDimensions,i=e.mapLoaded,s=Object(a.useRef)(null),l=Object(a.useRef)(null),d=Object(a.useRef)(null);Object(a.useEffect)((function(){n(H.setCanvasDimensions({height:window.innerHeight,width:window.innerWidth})),n(H.setCanvasProps({centerX:0,centerY:0,zoom:.5}))}),[]);var u=Object(a.useRef)(!1),p=Object(a.useRef)(null),m=function(e){var t=0,a=0;switch(e.key){case"ArrowUp":a=50;break;case"ArrowDown":a=-50;break;case"ArrowLeft":t=50;break;case"ArrowRight":t=-50}n(H.setCanvasPropsDiff({centerX:t,centerY:a,zoom:1}))};Object(a.useEffect)((function(){return window.addEventListener("keydown",m),function(){window.removeEventListener("keydown",m)}}),[]),Object(a.useEffect)((function(){if(d.current){var e=d.current;return e.addEventListener("wheel",h,{passive:!1}),function(){e.removeEventListener("wheel",h)}}}),[d,i]),Object(a.useEffect)((function(){O.initUtils(o,c.width,c.height,d.current.offsetLeft,d.current.offsetTop)}),[c,o]),Object(a.useEffect)((function(){window.requestAnimationFrame((function e(){Q.renderAll(s.current,l.current),window.requestAnimationFrame(e)}))}),[]);var f=function(e){u.current=!1,p.current=null},v=Object(a.useRef)(null),h=function(e){if(e.preventDefault(),e.stopPropagation(),i){var t=e.pageX,a=e.pageY,r=e.deltaY,o=1;r>0?o=.8:r<0&&(o=1.25);var l={x:t-s.current.offsetLeft,y:a-s.current.offsetTop},d={x:l.x-c.width/2,y:l.y-c.height/2};n(H.setCanvasPropsZoom(o,d))}return!1};return Object(a.useEffect)((function(){console.log(o.zoom),console.log(t),o.zoom<.4?t&&n(H.setShowToggleDynamicLabels(!1)):t||n(H.setShowToggleDynamicLabels(!0))}),[o.zoom,t,n]),r.a.createElement("div",{onMouseDown:function(e){e.preventDefault(),i&&(u.current=!0,p.current={x:e.screenX,y:e.screenY})},onMouseUp:f,onMouseLeave:f,onMouseMove:function(e){var t=performance.now();if(u.current&&(!v.current||t-v.current>1e3/30)){v.current=t;var a={x:p.current.x,y:p.current.y},r={x:e.screenX,y:e.screenY};n(H.setCanvasPropsDiff({zoom:1,centerX:-(r.x-a.x),centerY:-(r.y-a.y)})),p.current=r}},ref:d,style:{height:c.height,width:c.width,position:"absolute",top:0,left:0,zIndex:-1}},i?r.a.createElement("div",null,r.a.createElement("canvas",{style:{position:"absolute",zIndex:2},ref:l,height:c.height,width:c.width}),r.a.createElement("canvas",{style:{position:"absolute",zIndex:1},ref:s,height:c.height,width:c.width})):r.a.createElement("div",null,"Loading map data..."))}));var te=Object($.b)((function(e){return{selectedComponent:e.selectedComponent,hoveredComponent:e.hoveredComponent}}))((function(e){var t,n=e.hoveredComponent,a=e.selectedComponent,o=n||a;return t=o?r.a.createElement("div",null,r.a.createElement("div",null,"Type: ",o.type),r.a.createElement("div",null,"ID: ",o.id),r.a.createElement("div",null,"Coord: [",o.data.coord[0].toFixed(3),","," ",o.data.coord[1].toFixed(3),"]")):r.a.createElement("div",null,"No component selected"),r.a.createElement("div",{style:{fontSize:12}},t)})),ne={},ae=function(e,t,n,a){for(var r=0,o=Object.entries(t.intersections);r<o.length;r++){var c=o[r];if(!a.includes(c[0])){var i=c[1];if(O.getDistanceBetweenArrayCoords(i.coord,e)<g.DISPLAY.INTERSECTION_RADIUS+n)return{type:"intersection",id:c[0],data:c[1]}}}return null},re=function(e,t,n,a){for(var r=0,o=Object.entries(t.locations);r<o.length;r++){var c=o[r];if(!a.includes(c[0])){var i=c[1];if(O.getDistanceBetweenArrayCoords(i.coord,e)<g.DISPLAY.LOCATION_RADIUS+n)return{type:"location",id:c[0],data:c[1]}}}return null};ne.findComponent=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],a=K.mapData,r=[ae,re],o=0,c=r;o<c.length;o++){var i=c[o],s=i(e,a,t,n);if(s)return s}};var oe=ne;var ce=Object($.b)((function(e){return{averageUpdatesPerSecond:e.averageUpdatesPerSecond,averageRendersPerSecond:e.averageRendersPerSecond,mapDataLoaded:e.mapDataLoaded}}))((function(e){var t,n=e.mapDataLoaded,a=e.averageUpdatesPerSecond,o=e.averageRendersPerSecond,c={};if(n){var i=K.mapData;console.log(i),t=r.a.createElement("div",null,r.a.createElement("div",{style:c},"Map ID: ",i.id),r.a.createElement("div",{style:c},"Total Vehicles: ",Object.keys(i.vehicles).length),r.a.createElement("div",{style:c},"Total Intersections:"," ",Object.keys(i.intersections).length),r.a.createElement("div",{style:c},"Total Locations: ",Object.keys(i.locations).length),r.a.createElement("div",{style:c},"Total Roads: ",Object.keys(i.roads).length),r.a.createElement("div",{style:c},"Avg Updates/Sec: ",a.toFixed(2)),r.a.createElement("div",{style:c},"Avg Renders/Sec: ",o.toFixed(2)))}else t=r.a.createElement("div",null,"Map data not loaded.");return r.a.createElement("div",{style:{fontSize:12}},t)})),ie=n(126),se=n(119),le=n(120),de=n(121);function ue(e){var t=e.isOpen,n=e.setIsOpen,a=e.className;return r.a.createElement(ie.a,{isOpen:t,toggle:function(){n(!t)},className:a},r.a.createElement(se.a,{toggle:function(){n(!t)}},"Low FPS Detected"),r.a.createElement(le.a,null,"It has been detected at the map is running at a lower than optimal frame rate. It may help to hide the labels by toggling the ",r.a.createElement("code",null,"Toggle Labels")," checkbox"),r.a.createElement(de.a,null,r.a.createElement(d.a,{color:"primary",onClick:function(){n(!t)}},"OK")))}var pe=n(38);function me(e){var t,n=e.sectionName,o=e.children,c=e.openInitial,i=void 0===c||c,s=Object(a.useState)(i),d=Object(l.a)(s,2),u=d[0],p=d[1];return t=u?pe.a:pe.b,r.a.createElement("div",{className:"mx-2 my-2"},r.a.createElement("div",{className:"font-weight-bold",style:{display:"flex",justifyContent:"space-between",alignContent:"center",alignItems:"center"}},n,r.a.createElement("div",{style:{cursor:"pointer"},onClick:function(){p((function(e){return!e}))}},r.a.createElement(t,null))),u&&r.a.createElement("div",null,o),r.a.createElement("hr",{className:"mb-0"}))}var fe=n(123);Object($.b)((function(e){return{locationList:[]}}))((function(e){var t=e.locationList,n=e.startTrip,a=(e.curTripVehicleId,{fontSize:10});return r.a.createElement("div",{style:{fontSize:10}},r.a.createElement("div",null,r.a.createElement(fe.a,{for:"navigate-origin",className:"font-weight-bold mb-1 mt-2"},"Origin"),r.a.createElement(p.a,{style:a,type:"select",name:"select",id:"navigate-origin"},t.map((function(e){return r.a.createElement("option",{key:e.id,style:a},e.id)})))),r.a.createElement("div",null,r.a.createElement(fe.a,{for:"navigate-dest",className:"font-weight-bold mb-1 mt-2"},"Destination"),r.a.createElement(p.a,{style:a,type:"select",name:"select",id:"navigate-dest"},t.map((function(e){return r.a.createElement("option",{key:e.id,style:a},e.id)})))),r.a.createElement(d.a,{className:"mt-2",color:"primary",style:{fontSize:10},onClick:function(){n(document.getElementById("navigate-origin").value,document.getElementById("navigate-dest").value)}},"Navigate"))}));var ve=Object($.b)((function(e){return{selectedComponent:e.selectedComponent,hoveredComponent:e.hoveredComponent,showToggleDynamicLabels:e.showToggleDynamicLabels,curMode:e.curMode,showDynamicLabels:e.showLabels.dynamic}}))((function(e){e.socket;var t=e.showToggleDynamicLabels,n=e.curMode,a=e.showDynamicLabels,o=e.dispatch;return r.a.createElement("div",{style:{background:"#ffffffcc",margin:10,display:"flex",flexDirection:"column",flexWrap:"wrap",justifyContent:"space-between",width:300,position:"fixed",borderRadius:5}},r.a.createElement(me,{sectionName:"Selected Component"},r.a.createElement(te,null)),r.a.createElement(me,{sectionName:"Start a Trip"}),r.a.createElement(me,{sectionName:"Map Stats"},r.a.createElement(ce,null)),r.a.createElement(me,{sectionName:"Menu Settings"},t&&r.a.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",alignContent:"center"},className:"my-1"},r.a.createElement("input",{type:"checkbox",id:"show-lables-chkbox",className:"mr-1",checked:a,onChange:function(e){o(H.setShowDynamicLabels(e.target.checked))}}),r.a.createElement("label",{htmlFor:"show-labels-chkbox",className:"m-0",onClick:function(e){o(H.setShowDynamicLabels(!a))},style:{userSelect:"none",fontSize:10}},"Toggle Vehicle Labels")),r.a.createElement("div",null,r.a.createElement(d.a,{color:"link",style:{fontSize:10,padding:0},onClick:function(){n===A.APP_MODE_LIST.CREATE_MAP?o(H.setCurMode(A.APP_MODE_LIST.VIEW_MAP)):o(H.setCurMode(A.APP_MODE_LIST.CREATE_MAP))}},n===A.APP_MODE_LIST.CREATE_MAP?"Switch to View Mode":"Switch to Create Mode"))))}));var he=Object($.b)((function(e){return{curMode:e.curMode,mapDataLoaded:e.mapDataLoaded,averageUpdatesPerSecond:e.averageUpdatesPerSecond,selectedComponent:e.selectedComponent,hoveredComponent:e.hoveredComponent,showDynamicLabels:e.showLabels.dynamic,showLowFpsWarning:e.showLowFpsWarning}}))((function(e){var t=e.onMouseMove,n=e.onMouseDown,o=e.curPointerRadius,c=e.curPointerComponentId,i=e.cursorStyle,s=e.socket,l=e.averageUpdatesPerSecond,d=(e.curMode,e.selectedComponent),u=e.hoveredComponent,p=e.dispatch,m=(e.showToggleDynamicLabelOption,e.showDynamicLabels),f=e.showLowFpsWarning,v=e.mapDataLoaded,h=Object(a.useRef)(null);Object(a.useEffect)((function(){if(s){var e=function(e){e&&(p(H.setCurTripVehicle(e)),console.log(e))};return s.on("start-trip-res",e),function(){s.off("start-trip-res",e)}}}),[s]);var y=function(e){var t=e.pageX,n=e.pageY,a=[t-O.canvasOffsetLeft,n-O.canvasOffsetTop];return O.unmapArrayCoord(a)};return Object(a.useEffect)((function(){l<20&&m&&p(H.setShowFpsWarning(!0))}),[l,m]),r.a.createElement("div",null,f&&r.a.createElement(ue,{isOpen:f,setIsOpen:function(e){p(H.setShowFpsWarning(e))}}),r.a.createElement(ve,{socket:s}),r.a.createElement("div",{onMouseMove:function(e){if(v&&h&&h.current&&O.ready){var n=y(e);t&&t(n);var a=oe.findComponent(n,o,[c]);(u?u.id:u)!==(a?a.id:a)&&p(H.setHoveredComponent(a))}},onMouseDown:function(e){if(h&&h.current&&O.ready){var t=y(e);n&&n(t),(!d||u&&d.id!==u.id)&&p(H.setSelectedComponent(u))}},ref:h,style:{cursor:i||(u?"pointer":"move")}},r.a.createElement(ee,null)))})),ye=n(37),Oe="intersection",Ee="location",be="none",ge="road",Se="save_map",Te="delete";var De=Object($.b)((function(e){return{curState:e.curState}}))((function(){var e=Object(a.useRef)(JSON.parse(localStorage.getItem("saved-map-data"))||ye),t=Object(a.useRef)(null),n=Object(a.useState)(null),o=Object(l.a)(n,2),c=o[0],m=o[1],f=Object(a.useState)(null),v=Object(l.a)(f,2),h=v[0],y=v[1],E=Object(a.useState)(null),b=Object(l.a)(E,2),S=b[0],T=b[1],D=Object(a.useState)(null),C=Object(l.a)(D,2),P=(C[0],C[1]),w=Object(a.useState)(ye),A=Object(l.a)(w,2),L=A[0],j=A[1],_=Object(a.useState)(be),R=Object(l.a)(_,2),I=R[0],k=R[1],M=Object(a.useState)(""),N=Object(l.a)(M,2),U=N[0],x=N[1],Y=function(e){"Escape"===e.key&&(k(be),t.current=null)};Object(a.useEffect)((function(){return window.addEventListener("keydown",Y),function(){window.removeEventListener("keydown",Y)}}),[]);var W=Object(a.useRef)(performance.now());Object(a.useEffect)((function(){var e=performance.now();e-W.current>5e3&&(localStorage.setItem("saved-map-data",F()),W.current=e)}),[L]);var F=function(){var t={id:"map_".concat(O.generateShortUuid()),locations:e.current.locations,intersections:e.current.intersections,vehicles:{},roads:e.current.roads};return JSON.stringify(t)},z=function(n){if(n&&n.id){var a=JSON.parse(JSON.stringify(e.current));a.intersections[n.id]&&delete a.intersections[n.id],a.locations[n.id]&&delete a.locations[n.id];for(var r=0,o=Object.keys(e.current.roads);r<o.length;r++){var c=o[r];e.current.roads[c].start!==n.id&&e.current.roads[c].end!==n.id||delete a.roads[c]}e.current=a,t.current=null,j(a)}},V=0;I===Ee?V=g.DISPLAY.LOCATION_RADIUS:I===Oe&&(V=g.DISPLAY.INTERSECTION_RADIUS);var H=null;return I===ge&&c?H="crosshair":I===Te&&(H="no-drop"),r.a.createElement("div",{className:"mt-1"},r.a.createElement("div",null,r.a.createElement(d.a,{color:"primary",className:"m-1",onClick:function(){j(e.current),k(Ee),t.current=null}},"Add Location"),r.a.createElement(d.a,{color:"primary",onClick:function(){j(e.current),k(Oe),t.current=null},className:"m-1"},"Add Intersection"),r.a.createElement(d.a,{color:"primary",onClick:function(){j(e.current),k(ge),y(g.ROAD_TYPES.TYPES.MAJOR)},className:"m-1"},"Build Major Road"),r.a.createElement(d.a,{color:"primary",onClick:function(){j(e.current),k(ge),y(g.ROAD_TYPES.TYPES.MINOR)},className:"m-1"},"Build Minor Road"),r.a.createElement(d.a,{color:"primary",onClick:function(){j(e.current),k(ge),y(g.ROAD_TYPES.TYPES.LOCAL)},className:"m-1"},"Build Local Road"),r.a.createElement(d.a,{color:"primary",onClick:function(){j(e.current),k(Te),t.current=null},className:"m-1"},"Delete Components"),r.a.createElement(d.a,{color:"primary",onClick:function(){m(null),j(e.current),k(be),t.current=null},className:"m-1"},"Reset Pointer"),r.a.createElement(d.a,{color:"success",onClick:function(){k(Se),x(F())},className:"m-1"},"Save Map")),I===Se&&r.a.createElement(u.a,{className:"mt-2"},r.a.createElement("div",{className:"mb-2"},"Copy the map data below to your clipboard."),r.a.createElement(p.a,{type:"text",value:U,readOnly:!0})),r.a.createElement("div",null,r.a.createElement(he,{mapData:L,onMouseMove:function(n){I===Oe?j((function(e){var a=t.current;return a&&a.includes("intersection")||(a="intersection_".concat(O.generateShortUuid())),t.current=a,Object(s.a)(Object(s.a)({},e),{},{intersections:Object(s.a)(Object(s.a)({},e.intersections),{},Object(i.a)({},a,{id:a,coord:n}))})})):I===Ee?j((function(e){var a=t.current;return a&&a.includes("location")||(a="location_".concat(O.generateShortUuid())),t.current=a,Object(s.a)(Object(s.a)({},e),{},{locations:Object(s.a)(Object(s.a)({},e.locations),{},Object(i.a)({},a,{id:a,coord:n}))})})):(j(e.current),t.current=null)},onMouseDown:function(n){if(I===Oe||I===Ee)S||(e.current=L,t.current=null);else if(I===ge){if(S)if(c){var a="road_".concat(O.generateShortUuid()),r=Object(s.a)(Object(s.a)({},e.current),{},{roads:Object(s.a)(Object(s.a)({},e.current.roads),{},Object(i.a)({},a,{id:a,type:h,start:c,end:S.id}))});e.current=r,j(r),m(S.id)}else m(S.id)}else I===Te&&S&&z(S)},onHoverComponentChanged:function(e){T(e)},onSelectComponentChange:function(e){P(e)},curPointerRadius:V,curPointerComponentId:t.current,cursorStyle:H})))}));var Ce=Object($.b)((function(e){return{curMode:e.curMode}}))((function(e){var t,n=e.socket,o=e.curMode;return e.dispatch,Object(a.useEffect)((function(){return K.init(n),function(){K.cleanup(n),n.disconnect()}}),[]),o===A.APP_MODE_LIST.VIEW_MAP?t=r.a.createElement(he,{socket:n}):o===A.APP_MODE_LIST.CREATE_MAP&&(t=r.a.createElement(De,null)),r.a.createElement("div",{className:"App"},t)})),Pe=(n(85),n(63)),we="http://localhost:3001";we="https://auto-drive-simulator-api.herokuapp.com/";var Ae=n.n(Pe)()(we);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement($.a,{store:E=Object(P.createStore)(J,Object(B.composeWithDevTools)(Object(P.applyMiddleware)(w.a)))},r.a.createElement(Ce,{socket:Ae}))),document.getElementById("root"))},37:function(e){e.exports=JSON.parse('{"id":"map_8fzBXojVN4DkjwGhs3p3ks","locations":{},"intersections":{"intersection_0":{"id":"intersection_0","coord":[0,0]},"intersection_1":{"id":"intersection_1","coord":[0,1000]}},"vehicles":{},"roads":{"road_0":{"id":"road_0","type":"MAJOR","start":"intersection_0","end":"intersection_1"}}}')},64:function(e,t,n){e.exports=n(118)}},[[64,1,2]]]);
//# sourceMappingURL=main.4b4f5a66.chunk.js.map