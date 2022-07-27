"use strict";(self.webpackChunkminecraftlegionwebclient=self.webpackChunkminecraftlegionwebclient||[]).push([[519],{32519:function(e,n,r){r.r(n);r(72791);var a=r(89743),o=r(2677),i=r(75630),d=r(60364),t=r(32525),c=r(59718),l=r(94946),s=r(80184),h={getBotBySocketId:t.U0};n.default=(0,d.$j)((function(e){var n=e.botsReducer,r=e.configurationReducer;return{botsOnline:n.botsOnline,socket:r.socket,selectedSocketId:r.selectedSocketId}}),h)((function(e){var n=e.socket,r=e.botsOnline,d=e.selectedSocketId,t=r.find((function(e){return e.socketId===d}));if(void 0===t)return null;var h=function(e){n.emit("sendAction",{action:"changeConfig",socketId:t.socketId,value:{configToChange:"changeTunnel",value:e.target.value}})},g=function(e){n.emit("sendAction",{action:"changeConfig",socketId:t.socketId,value:{configToChange:"changeWorldMiner",value:e.target.value}})},x=function(e){n.emit("sendAction",{action:"changeConfig",socketId:t.socketId,value:{configToChange:"changeOrientation",value:e.target.value}})},u=function(e){var r=Number(e.target.value);if(!Number.isInteger(r)&&"-"!==e.target.value)return null;var a=e.target.id;n.emit("sendAction",{action:"changeConfig",socketId:t.socketId,value:{configToChange:"changePosMiner",value:{coord:a,pos:e.target.value}}})};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a.Z,{className:"mb-3",children:(0,s.jsx)(o.Z,{children:(0,s.jsx)("label",{children:"Depending the tunnel type and orientation have a different behavior"})})}),(0,s.jsxs)(a.Z,{className:"mb-3",children:[(0,s.jsx)(o.Z,{md:6,children:(0,s.jsx)(i.Z,{children:(0,s.jsxs)(i.Z.Group,{as:a.Z,children:[(0,s.jsx)(o.Z,{md:3,children:"Tunel type?"}),(0,s.jsxs)(o.Z,{md:9,children:[(0,s.jsx)(i.Z.Check,{type:"radio",id:"handleChangeTunnel",label:"Make a Hole",value:"vertically",onChange:h,checked:"vertically"===t.config.minerCords.tunel}),(0,s.jsx)(i.Z.Check,{type:"radio",id:"handleChangeTunnel",label:"Make a Tunel",value:"horizontally",onChange:h,checked:"horizontally"===t.config.minerCords.tunel})]})]})})}),(0,s.jsx)(o.Z,{md:6,children:(0,s.jsx)(i.Z,{children:(0,s.jsxs)(i.Z.Group,{as:a.Z,children:[(0,s.jsx)(o.Z,{md:3,children:"Orientation?"}),(0,s.jsxs)(o.Z,{md:9,children:[(0,s.jsx)(i.Z.Check,{type:"radio",id:"handleChangeOrientation",label:"X+",value:"x+",onChange:x,checked:"x+"===t.config.minerCords.orientation}),(0,s.jsx)(i.Z.Check,{type:"radio",id:"handleChangeOrientation",label:"X-",value:"x-",onChange:x,checked:"x-"===t.config.minerCords.orientation}),(0,s.jsx)(i.Z.Check,{type:"radio",id:"handleChangeOrientation",label:"Z+",value:"z+",onChange:x,checked:"z+"===t.config.minerCords.orientation}),(0,s.jsx)(i.Z.Check,{type:"radio",id:"handleChangeOrientation",label:"Z-",value:"z-",onChange:x,checked:"z-"===t.config.minerCords.orientation})]})]})})})]}),(0,s.jsxs)(a.Z,{className:"mb-3",children:[(0,s.jsx)(o.Z,{md:6,children:(0,s.jsx)(c.Z,{id:"reverseMode",onChange:function(){return e=!t.config.minerCords.reverse,console.log(e),void n.emit("sendAction",{action:"changeConfig",socketId:t.socketId,value:{configToChange:"changeReverseModeMiner",value:e}});var e},label:"Reverse Mode?",checked:t.config.minerCords.reverse})}),(0,s.jsx)(o.Z,{md:6,children:(0,s.jsx)(i.Z,{children:(0,s.jsxs)(i.Z.Group,{as:a.Z,children:[(0,s.jsx)(o.Z,{md:3,children:"World?"}),(0,s.jsxs)(o.Z,{md:9,children:[(0,s.jsx)(i.Z.Check,{type:"radio",id:"handleChangeWorld",label:"Overworld",value:"minecraft:overworld",onChange:g,checked:"minecraft:overworld"===t.config.minerCords.world}),(0,s.jsx)(i.Z.Check,{type:"radio",id:"handleChangeWorld",label:"Nether",value:"minecraft:the_nether",onChange:g,checked:"minecraft:the_nether"===t.config.minerCords.world}),(0,s.jsx)(i.Z.Check,{type:"radio",id:"handleChangeWorld",label:"End",value:"minecraft:the_end",onChange:g,checked:"minecraft:the_end"===t.config.minerCords.world})]})]})})})]}),(0,s.jsxs)("div",{className:"p-3 mb-3 border rounded",children:[(0,s.jsx)("h5",{children:"Start Coords"}),(0,s.jsxs)(a.Z,{children:[(0,s.jsxs)(i.Z.Group,{as:o.Z,sm:"4",md:"3",lg:"2",controlId:"xStart",children:[(0,s.jsx)(i.Z.Label,{children:(0,s.jsx)("span",{className:"badge bg-primary text-white",children:"X Start"})}),(0,s.jsx)(i.Z.Control,{type:"text",value:t.config.minerCords.xStart,onChange:u})]}),(0,s.jsxs)(i.Z.Group,{as:o.Z,sm:"4",md:"3",lg:"2",controlId:"yStart",children:[(0,s.jsx)(i.Z.Label,{children:(0,s.jsx)("span",{className:"badge bg-warning text-dark",children:"Y Start"})}),(0,s.jsx)(i.Z.Control,{type:"text",value:t.config.minerCords.yStart,onChange:u})]}),(0,s.jsxs)(i.Z.Group,{as:o.Z,sm:"4",md:"3",lg:"2",controlId:"zStart",children:[(0,s.jsx)(i.Z.Label,{children:(0,s.jsx)("span",{className:"badge bg-secondary text-white",children:"Z Start"})}),(0,s.jsx)(i.Z.Control,{type:"text",value:t.config.minerCords.zStart,onChange:u})]})]})]}),(0,s.jsxs)("div",{className:"p-3 mb-3 border rounded",children:[(0,s.jsx)("h5",{children:"End Coords"}),(0,s.jsxs)(a.Z,{children:[(0,s.jsxs)(i.Z.Group,{as:o.Z,sm:"4",md:"3",lg:"2",controlId:"xEnd",children:[(0,s.jsx)(i.Z.Label,{children:(0,s.jsx)("span",{className:"badge bg-primary text-white",children:"X End"})}),(0,s.jsx)(i.Z.Control,{type:"text",value:t.config.minerCords.xEnd,onChange:u})]}),(0,s.jsxs)(i.Z.Group,{as:o.Z,sm:"4",md:"3",lg:"2",controlId:"yEnd",children:[(0,s.jsx)(i.Z.Label,{children:(0,s.jsx)("span",{className:"badge bg-warning text-dark",children:"Y End"})}),(0,s.jsx)(i.Z.Control,{type:"text",value:t.config.minerCords.yEnd,onChange:u})]}),(0,s.jsxs)(i.Z.Group,{as:o.Z,sm:"4",md:"3",lg:"2",controlId:"zEnd",children:[(0,s.jsx)(i.Z.Label,{children:(0,s.jsx)("span",{className:"badge bg-secondary text-white",children:"Z End"})}),(0,s.jsx)(i.Z.Control,{type:"text",value:t.config.minerCords.zEnd,onChange:u})]})]})]}),(0,s.jsx)(a.Z,{className:"mb-5",children:(0,s.jsx)(o.Z,{children:(0,s.jsx)("label",{children:(0,s.jsx)("img",{src:l,width:"100%",alt:"House_XYZ"})})})})]})}))},59718:function(e,n,r){r(72791);var a=r(75630),o=r(89743),i=r(2677),d=r(80184);n.Z=function(e){var n=e.id,r=e.checked,t=e.label,c=e.onChange;return(0,d.jsx)(a.Z,{children:(0,d.jsxs)(a.Z.Group,{as:o.Z,className:"mb-3",controlId:"formPlaintextEmail",children:[(0,d.jsx)(a.Z.Label,{column:!0,sm:"4",children:t}),(0,d.jsx)(i.Z,{sm:"8",children:(0,d.jsx)(a.Z.Check,{type:"switch",id:n,checked:r,label:!0===r?"Yes":"No",onChange:c})})]})})}},94946:function(e,n,r){e.exports=r.p+"static/media/HouseXYZ.4a620559fc7565bbc09c.png"}}]);
//# sourceMappingURL=519.e5036fd0.chunk.js.map