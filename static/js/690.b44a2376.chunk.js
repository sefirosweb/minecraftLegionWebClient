"use strict";(self.webpackChunkminecraftlegionwebclient=self.webpackChunkminecraftlegionwebclient||[]).push([[690],{61070:function(e,n,t){t.d(n,{Z:function(){return g}});var s=t(72791),a=t(60364),c=t(4942),r=t(1413),i=t(45987),o=t(81694),d=t.n(o),l=t(10162),m=t(11701),u=t(80184),h=["min","now","max","label","visuallyHidden","striped","animated","className","style","variant","bsPrefix"],v=["isChild"],x=["min","now","max","label","visuallyHidden","striped","animated","bsPrefix","variant","className","children"];function f(e,n,t){var s=(e-n)/(t-n)*100;return Math.round(1e3*s)/1e3}function k(e,n){var t,s=e.min,a=e.now,o=e.max,l=e.label,m=e.visuallyHidden,v=e.striped,x=e.animated,k=e.className,j=e.style,b=e.variant,Z=e.bsPrefix,g=(0,i.Z)(e,h);return(0,u.jsx)("div",(0,r.Z)((0,r.Z)({ref:n},g),{},{role:"progressbar",className:d()(k,"".concat(Z,"-bar"),(t={},(0,c.Z)(t,"bg-".concat(b),b),(0,c.Z)(t,"".concat(Z,"-bar-animated"),x),(0,c.Z)(t,"".concat(Z,"-bar-striped"),x||v),t)),style:(0,r.Z)({width:"".concat(f(a,s,o),"%")},j),"aria-valuenow":a,"aria-valuemin":s,"aria-valuemax":o,children:m?(0,u.jsx)("span",{className:"visually-hidden",children:l}):l}))}var j=s.forwardRef((function(e,n){var t=e.isChild,a=(0,i.Z)(e,v);if(a.bsPrefix=(0,l.vE)(a.bsPrefix,"progress"),t)return k(a,n);var c=a.min,o=a.now,h=a.max,f=a.label,j=a.visuallyHidden,b=a.striped,Z=a.animated,g=a.bsPrefix,p=a.variant,I=a.className,y=a.children,N=(0,i.Z)(a,x);return(0,u.jsx)("div",(0,r.Z)((0,r.Z)({ref:n},N),{},{className:d()(I,g),children:y?(0,m.UI)(y,(function(e){return(0,s.cloneElement)(e,{isChild:!0})})):k({min:c,now:o,max:h,label:f,visuallyHidden:j,striped:b,animated:Z,bsPrefix:g,variant:p},n)}))}));j.displayName="ProgressBar",j.defaultProps={min:0,max:100,animated:!1,isChild:!1,visuallyHidden:!1,striped:!1};var b=j,Z={setSelectedSocketId:t(37348).AG},g=(0,a.$j)((function(e){var n=e.botsReducer,t=e.configurationReducer;return{botsOnline:n.botsOnline,selectedSocketId:t.selectedSocketId}}),Z)((function(e){var n=e.selectedSocketId,t=e.setSelectedSocketId,a=e.botsOnline;(0,s.useEffect)((function(){var e=function(e){27===e.keyCode&&t(void 0)};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[t]);return(0,u.jsxs)("ul",{className:"list-group",children:[(0,u.jsxs)("li",{className:"list-group-item active",children:["Bots Online (",a.length,")"]}),a.map((function(e){return(0,u.jsx)("li",{className:"list-group-item ".concat(e.combat?"botlistCombat":"botlist"),children:(0,u.jsxs)("div",{className:" ".concat(e.combat?"botCombat":""),children:[(0,u.jsx)("span",{className:"pointer ".concat(n===e.socketId?"is-selected":""),onClick:function(){t(e.socketId)},children:e.name}),(0,u.jsxs)("div",{children:[(0,u.jsx)(b,{className:"mt-1",variant:"danger",now:e.health/20*100}),(0,u.jsx)(b,{className:"mt-1",variant:"warning",now:e.food/20*100})]})]})},e.socketId)}))]})}))},96690:function(e,n,t){t.r(n),t.d(n,{default:function(){return j}});var s=t(72791),a=t(60364),c=t(43504),r=t(61070),i=t(70885),o=t(89743),d=t(2677),l=t(43360),m=t(16871),u=t(32525),h=t(80184),v={updateBotStatus:u.O7,getBotBySocketId:u.U0},x=(0,a.$j)((function(e){var n=e.configurationReducer;return{socket:n.socket,selectedSocketId:n.selectedSocketId,serverBots:n.serverBots,master:n.master}}),v)((function(e){var n=(0,m.s0)(),t=(0,s.useState)(""),a=(0,i.Z)(t,2),c=a[0],r=a[1],u=function(){v("sendMessage",c),r("")},v=function(n,t){e.socket.emit("sendAction",{action:"action",socketId:e.selectedSocketId,toBotData:{type:n,value:t}})};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.Z,{className:"mb-3",children:(0,h.jsx)(d.Z,{children:(0,h.jsx)("div",{className:"form-group",children:(0,h.jsx)("input",{type:"text",placeholder:"Send chat message",className:"form-control",onKeyPress:function(e){13===e.charCode&&u()},onChange:function(e){r(e.target.value)},value:c})})})}),(0,h.jsx)(o.Z,{className:"mb-3",children:(0,h.jsxs)(d.Z,{children:[(0,h.jsx)(l.Z,{onClick:u,className:"mb-1",children:"Send Message"})," ",(0,h.jsx)(l.Z,{onClick:function(){var n=e.getBotBySocketId(e.socketId);if(null===n.stateMachinePort){var t=Math.floor(50*Math.random()+1)+4500;e.socket.emit("sendAction",{action:"startStateMachine",socketId:e.socketId,value:{port:t}}),n.stateMachinePort=t,e.updateBotStatus(n)}window.open("http://".concat(e.serverBots,":").concat(n.stateMachinePort),"_blank")},className:"mb-1",children:"Show State Machine"})," ",(0,h.jsx)(l.Z,{onClick:function(){var n=e.getBotBySocketId(e.socketId);if(null===n.inventoryPort){var t=Math.floor(50*Math.random()+1)+4500;e.socket.emit("sendAction",{action:"startInventory",socketId:e.socketId,value:{port:t}}),n.inventoryPort=t,e.updateBotStatus(n)}window.open("http://".concat(e.serverBots,":").concat(n.inventoryPort),"_blank")},variant:"success",className:"mb-1",children:"Show Item Inventory"})," ",(0,h.jsx)(l.Z,{onClick:function(){var n=e.getBotBySocketId(e.socketId);if(null===n.viewerPort){var t=Math.floor(50*Math.random()+1)+4500;e.socket.emit("sendAction",{action:"startViewer",socketId:e.socketId,value:{port:t}}),n.viewerPort=t,e.updateBotStatus(n)}window.open("http://".concat(e.serverBots,":").concat(n.viewerPort),"_blank")},variant:"success",className:"mb-1",children:"Show Viewer"})," ",(0,h.jsx)(l.Z,{onClick:function(){e.socket.emit("sendAction",{action:"sendDisconnect",socketId:e.socketId,value:"Disconnect Bot"}),n("/")},variant:"danger",className:"mb-1",children:"Disconnect"})]})}),(0,h.jsx)(o.Z,{className:"mb-3",children:(0,h.jsxs)(d.Z,{children:[(0,h.jsx)(l.Z,{onClick:function(){return v("stay","")},variant:"secondary",children:"Stay"})," ",(0,h.jsx)(l.Z,{onClick:function(){return v("follow",e.master)},variant:"secondary",children:"Follow Master"})," ",(0,h.jsx)(l.Z,{onClick:function(){return v("endCommands","")},variant:"warning",children:"End commands"})]})}),(0,h.jsxs)(o.Z,{className:"mb-3",children:[(0,h.jsxs)(d.Z,{md:4,children:[(0,h.jsx)(o.Z,{className:"mb-3",children:(0,h.jsx)(d.Z,{xs:{span:4,offset:4},className:"d-grid",children:(0,h.jsx)(l.Z,{onClick:function(){return v("moveOneByOne","x+")},variant:"secondary",children:"X+"})})}),(0,h.jsxs)(o.Z,{children:[(0,h.jsx)(d.Z,{xs:4,className:"d-grid mb-3",children:(0,h.jsx)(l.Z,{onClick:function(){return v("moveOneByOne","z-")},variant:"secondary",children:"Z-"})}),(0,h.jsx)(d.Z,{xs:4,className:"d-grid mb-3",children:(0,h.jsx)(l.Z,{onClick:function(){return v("moveOneByOne","x-")},variant:"secondary",children:"X-"})}),(0,h.jsx)(d.Z,{xs:4,className:"d-grid mb-3",children:(0,h.jsx)(l.Z,{onClick:function(){return v("moveOneByOne","z+")},variant:"secondary",children:"Z+"})})]})]}),(0,h.jsx)(d.Z,{md:2,className:"d-grid mb-3",children:(0,h.jsx)(l.Z,{onClick:function(){return v("interactWithPlayer","")},variant:"secondary",children:"Interact With Player"})}),(0,h.jsx)(d.Z,{md:2,className:"d-grid mb-3",children:(0,h.jsx)(l.Z,{onClick:function(){return v("interactWithBed","")},variant:"secondary",children:"Interect With Bed"})}),(0,h.jsx)(d.Z,{md:2,className:"d-grid mb-3",children:(0,h.jsx)(l.Z,{onClick:function(){return v("tossAllItems","")},variant:"danger",children:"Toss all items"})})]})]})})),f=t(37348),k={getBotIndexBySocketId:u.YO,setSelectedSocketId:f.AG},j=(0,a.$j)((function(e){var n=e.botsReducer,t=e.configurationReducer;return{botsOnline:n.botsOnline,logs:n.logs,selectedSocketId:t.selectedSocketId}}),k)((function(e){var n=e.logs,t=e.selectedSocketId,a=(e.socketId,e.getBotIndexBySocketId),i=(e.match,e.botsOnline),m=e.setSelectedSocketId,u=(0,s.useRef)(null);return(0,s.useEffect)((function(){var e;null===(e=u.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})}),[n]),(0,s.useEffect)((function(){a(t)<0&&m(void 0)}),[i,t,a,m]),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(o.Z,{className:"mt-3",children:[(0,h.jsx)(d.Z,{md:8,className:"mb-3",children:(0,h.jsx)("h1",{children:"Dashboard"})}),(0,h.jsx)(d.Z,{md:2,className:"mb-3",children:t?(0,h.jsx)(l.Z,{as:c.rU,to:"/configurebot/generalconfig",variant:"warning",children:"Configure Bot"}):""})]}),(0,h.jsxs)(o.Z,{children:[(0,h.jsxs)(d.Z,{xs:{span:12,order:2},md:{span:9,order:1},lg:10,children:[(0,h.jsx)(o.Z,{className:"mb-3",children:(0,h.jsx)(d.Z,{xs:12,children:(0,h.jsx)("div",{className:"form-group",children:(0,h.jsxs)("div",{className:"textAreaStyle form-control",children:[n.filter((function(e){return!t||e.socketId===t})).map((function(e,n){return(0,h.jsxs)("div",{children:[e.time," ",e.botName," ",e.message]},n)})),(0,h.jsx)("div",{ref:u})]})})})}),(0,h.jsx)(o.Z,{children:(0,h.jsx)(d.Z,{xs:12,children:t?(0,h.jsx)(x,{socketId:t}):(0,h.jsx)("div",{className:"pendingSelectBot",children:"Select any bot for do actions"})})})]}),(0,h.jsx)(d.Z,{xs:{span:12,order:1},md:{span:3,order:2},lg:2,className:"mb-3",children:(0,h.jsx)(r.Z,{})})]})]})}))}}]);
//# sourceMappingURL=690.b44a2376.chunk.js.map