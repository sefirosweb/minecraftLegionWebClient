"use strict";(self.webpackChunkminecraftlegionwebclient=self.webpackChunkminecraftlegionwebclient||[]).push([[966,878],{87491:function(e,a,n){var t=n(80184);a.Z=function(e){return(0,t.jsxs)("button",{type:"button",className:"btn btn-secondary",onClick:e.onClick,children:[(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-trash",viewBox:"0 0 16 16",children:[(0,t.jsx)("path",{d:"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"}),(0,t.jsx)("path",{fillRule:"evenodd",d:"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"})]}),(0,t.jsx)("span",{className:"visually-hidden"})]})}},69878:function(e,a,n){n.r(a),n.d(a,{default:function(){return l}});n(72791);var t=n(52641)("1.8.1"),s=n(80184),i=[{displayName:"Carrot",name:"carrot"},{displayName:"Potato",name:"potato"},{displayName:"Beetroot",name:"beetroot"},{displayName:"Wheat",name:"wheat"},{displayName:"Melon",name:"melon"},{displayName:"Sweet Berries",name:"sweet_berries"},{displayName:"Pumpkin",name:"pumpkin"},{displayName:"Oak Sapling",name:"oak_sapling"},{displayName:"Cabirch Saplingrrot",name:"cabirch_saplingrrot"},{displayName:"Jungle Sapling",name:"jungle_sapling"},{displayName:"Acacia Sapling",name:"acacia_sapling"},{displayName:"Dark Oak Sapling",name:"dark_oak_sapling"},{displayName:"Spruce Sapling",name:"spruce_sapling"},{displayName:"Cactus",name:"cactus"},{displayName:"Bamboo",name:"bamboo"},{displayName:"Sugar Cane",name:"sugar_cane"}],l=function(e){return(0,s.jsx)(s.Fragment,{children:function(){var a;switch(e.type){case"all":default:a="itemsArray",a=t.itemsArray;break;case"foods":a="foodsArray",a=t.foodsArray;break;case"plants":a="foodsArray",a=i}var n=new RegExp(e.item,"gi"),l=a.filter((function(e){return e.displayName.match(n)}));return l.length>10&&l.splice(0,l.length-10),l.map((function(e,a){return(0,s.jsx)("option",{value:e.name,children:e.displayName},a)}))}()})}},71966:function(e,a,n){n.r(a);var t=n(70885),s=n(72791),i=n(69878),l=n(60364),r=n(32525),c=n(87491),o=n(80184),d={getBotBySocketId:r.U0};a.default=(0,l.$j)((function(e){var a=e.botsReducer,n=e.configurationReducer;return{botsOnline:a.botsOnline,socket:n.socket,selectedSocketId:n.selectedSocketId}}),d)((function(e){var a=(0,s.useState)(""),n=(0,t.Z)(a,2),l=n[0],r=n[1],d=(0,s.useState)(1),m=(0,t.Z)(d,2),u=m[0],h=m[1],p=e.getBotBySocketId(e.selectedSocketId);if(void 0===p)return null;var x=function(a,n){e.socket.emit("sendAction",{action:"changeConfig",socketId:p.socketId,value:{configToChange:"DeleteItemToBeReady",value:a}})};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-12",children:(0,o.jsxs)("label",{children:["This is a minimun requeried for start bot to work,",(0,o.jsx)("br",{}),"Example, Guard need a sword and shield, Miner need a 1 pickaxe"]})})}),(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-6",children:(0,o.jsxs)("div",{className:"form-group",children:[(0,o.jsx)("label",{htmlFor:"inputItem",children:"Select Item"}),(0,o.jsx)("input",{className:"form-control",type:"text",list:"itemsList",value:l,onChange:function(e){r(e.target.value)}}),(0,o.jsx)("datalist",{id:"itemsList",children:(0,o.jsx)(i.default,{item:l})})]})}),(0,o.jsx)("div",{className:"col-2",children:(0,o.jsxs)("div",{className:"form-group",children:[(0,o.jsx)("label",{children:"Quantity"}),(0,o.jsx)("input",{type:"text",className:"form-control",value:u,onChange:function(e){var a=Number(e.target.value);Number.isInteger(a)&&h(a)}})]})}),(0,o.jsx)("div",{className:"col-2",children:(0,o.jsxs)("div",{className:"form-group",children:[(0,o.jsx)("label",{children:"."}),(0,o.jsx)("button",{className:"form-control btn btn-primary",onClick:function(a){if(""===l||0===u)return null;e.socket.emit("sendAction",{action:"changeConfig",socketId:p.socketId,value:{configToChange:"InsertItemToBeReady",value:{item:l,quantity:u}}})},children:"Insert"})]})})]}),(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-12",children:(0,o.jsxs)("table",{className:"table",children:[(0,o.jsx)("thead",{className:"thead-dark",children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{scope:"col",children:"#"}),(0,o.jsx)("th",{scope:"col",children:"Item"}),(0,o.jsx)("th",{scope:"col",children:"Quantity"}),(0,o.jsx)("th",{scope:"col"})]})}),(0,o.jsx)("tbody",{children:p.config.itemsToBeReady.map((function(e,a){return(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{scope:"row",children:a}),(0,o.jsx)("td",{children:e.item}),(0,o.jsx)("td",{children:e.quantity}),(0,o.jsx)("td",{children:(0,o.jsx)(c.Z,{onClick:x.bind(void 0,a)})})]},a)}))})]})})})]})}))}}]);
//# sourceMappingURL=966.22d44765.chunk.js.map