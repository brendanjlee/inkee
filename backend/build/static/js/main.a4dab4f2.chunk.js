(this.webpackJsonpsplat=this.webpackJsonpsplat||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var o=n(1),c=n.n(o),a=n(56),s=n.n(a),i=(n(70),n(32)),r=n(4),l=(n(71),n(3)),u=n(49),d=(n(72),n.p+"static/media/inkee-logo.b7363c11.png"),j=n(0),b=c.a.createContext(),f=function(e){var t=e.children,n=e.socket,c=void 0===n?null:n,a=Object(o.useRef)(null),s=Object(o.useRef)(null),i=Object(o.useState)(!1),l=Object(r.a)(i,2),u=l[0],d=l[1],f=Object(o.useState)(!0),m=Object(r.a)(f,2),v=m[0],h=m[1],O=Object(o.useState)({x:0,y:0,color:"black",lineThickness:5}),g=Object(r.a)(O,2),p=g[0],x=g[1],y=function(){if(!c){var e=a.current,t=e.getContext("2d"),n=new Image(e.width,e.height);n.crossOrigin="anonymous",n.onload=function(){t.drawImage(n,0,0,e.width/2,e.height/2)},n.src="https://i.ibb.co/z4Gb7Sw/output-onlinepngtools-1.png"}},w=function(e,t,n,o,a,i,r){s.current.beginPath(),s.current.moveTo(e,t),s.current.lineTo(n,o),s.current.strokeStyle=i,s.current.lineWidth=a,s.current.stroke(),c&&r&&c.emit("drawingEvent",{x0:e,y0:t,x1:n,y1:o,lineThickness:a,color:i})},C=function(e){var t=a.current,n=t.getContext("2d");n.fillStyle="white",n.fillRect(0,0,t.width,t.height),h(!0),c&&e&&c.emit("clearCanvas")};return Object(j.jsx)(b.Provider,{value:{canvasRef:a,prepareCanvas:function(){var e=a.current;e.style.width="100%",e.style.height="100%",e.width=2*e.offsetWidth,e.height=2*e.offsetHeight;var t=e.getContext("2d");t.scale(2,2),t.lineCap="round",t.strokeStyle="black",t.lineWidth=5,s.current=t,y()},startDrawing:function(e){var t=e.nativeEvent;v&&(C(!1),h(!1));var n=t.offsetX,o=t.offsetY;d(!0);var c=p;c.x=n,c.y=o,x(c)},inDrawing:function(e){var t=e.nativeEvent;if(u){var n=t.offsetX,o=t.offsetY;w(p.x,p.y,n,o,p.lineThickness,p.color,!0);var c=p;c.x=n,c.y=o,x(c)}},finishDrawing:function(e){var t=e.nativeEvent;if(u){var n=t.offsetX,o=t.offsetY;w(p.x,p.y,n,o,p.lineThickness,p.color,!0),d(!1)}},clearCanvas:C,changeColor:function(e){return function(){var t=p;t.color=e,x(t)}},changeLineWidth:function(e){var t=p;t.lineThickness=e,x(t)},draw:w,undoStroke:function(e){s.current.undo(),e&&c&&c.emit("undo")},redoStroke:function(e){s.current.undo(),e&&c&&c.emit("redo")}},children:t})},m=function(){return Object(o.useContext)(b)};var v=function(e){var t=e.socket,n=void 0===t?null:t,c=m(),a=c.canvasRef,s=c.prepareCanvas,i=c.startDrawing,r=c.finishDrawing,l=c.inDrawing,u=c.draw,d=c.clearCanvas;return Object(o.useEffect)((function(){s()}),[]),Object(o.useEffect)((function(){var e=function(e){u(e.x0,e.y0,e.x1,e.y1,e.lineThickness,e.color,!1)},t=function(){d(!1)};return n&&(n.on("drawingEvent",e),n.on("clearCanvas",t)),function(){n&&(n.off("drawingEvent",e),n.off("clearCanvas",t))}}),[n]),Object(j.jsx)("canvas",{id:"canvas",onMouseDown:i,onMouseUp:r,onMouseMove:l,ref:a})},h=n(111),O=function(){var e=m().clearCanvas;return Object(j.jsx)("button",{className:"btn2",onClick:e,children:"Clear"})};var g=function(e){var t=e.socket,n=e.history,c=new URLSearchParams(window.location.search).get("gameId"),a=Object(o.useState)(""),s=Object(r.a)(a,2),i=s[0],l=s[1];null!==c&&localStorage.setItem("inviteCode",c),Object(o.useEffect)((function(){var e=function(e){localStorage.setItem("inviteCode",e),n.push({pathname:"/game"})},o=function(){localStorage.setItem("inviteCode",c),n.push({pathname:"/prestartLobby"})};return t&&(t.on("startGame",e),t.on("inviteCode",o)),function(){t&&(t.off("startGame",e),t.off("inviteCode",o))}}),[t]);var u=function(){var e=document.getElementById("canvas"),t=e.toDataURL("image/png"),n=document.createElement("canvas");return n.width=e.width,n.height=e.height,t===n.toDataURL("image/png")?(console.log("Draw a nice avatar!"),!1):(console.log(t),l(t),!0)},b=function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,c=document.getElementById("username_input");""!==c.value?(localStorage.setItem("username",c.value),console.log(c.value),u()&&(o?t.emit("joinRoom",{userData:{uid:localStorage.getItem("username"),avatar:i},inviteCode:localStorage.getItem("inviteCode")}):n.push({pathname:e}))):alert("Username cannot be empty!")};return Object(j.jsx)("div",{className:"root",children:Object(j.jsx)(f,{children:Object(j.jsx)("div",{className:"purpleSplat",children:Object(j.jsxs)("div",{className:"orangeSplat",children:[Object(j.jsx)("div",{className:"header",children:Object(j.jsx)("img",{className:"logo",src:d,alt:"inkee-logo"})}),Object(j.jsx)("form",{children:Object(j.jsx)("input",{className:"username",id:"username_input",type:"text",placeholder:"enter username..."})}),Object(j.jsxs)("div",{align:"center",children:[Object(j.jsx)("div",{className:"homeDrawArea",children:Object(j.jsx)(v,{})}),Object(j.jsx)("div",{children:Object(j.jsx)(O,{})}),Object(j.jsx)("div",{children:Object(j.jsx)(h.a,{onClick:function(){b("/joinLobby",localStorage.getItem("inviteCode"))},className:"btn",variant:"secondary",size:"lg",children:"join game"})}),Object(j.jsx)("div",{children:!localStorage.getItem("inviteCode")&&Object(j.jsx)(h.a,{onClick:function(){b("/createLobby")},className:"btn",variant:"outline-primary",size:"lg",children:"create game"})})]})]})})})})};var p=function(){return Object(j.jsx)("div",{className:"header",children:Object(j.jsx)("img",{className:"logo",src:d,alt:"inkee-logo"})})},x=n(57);n(89);var y=function(e){var t=e.socket,n=e.history,c=Object(o.useState)(2),a=Object(r.a)(c,2),s=a[0],i=a[1],l=Object(o.useState)(30),u=Object(r.a)(l,2),d=u[0],b=u[1],f=Object(o.useState)(""),m=Object(r.a)(f,2),v=m[0],O=m[1],g=Object(o.useState)(null),p=Object(r.a)(g,2),y=p[0],w=p[1];window.history.replaceState(null,"Inkee Create Lobby","/"),Object(o.useEffect)((function(){return t.on("inviteCode",(function(e){console.log(e),localStorage.setItem("inviteCode",e),n.push({pathname:"/prestartLobby"})})),function(){t.off("inviteCode")}}),[t,n]);var C=function(e){e.preventDefault();var n=function(e,t){console.log("Parse Custom Words");var n=[];if(e.length>0){for(var o=e.split(/\r\n|\r|\n/),c=0;c<o.length;c++)for(var a=o[c].split(/[ ,]+/).filter(Boolean),s=0;s<a.length;s++){var i=a[s].toLowerCase();n.includes(i)||n.push(i)}console.log("textAreaContent Created")}if(null!=t){for(var r=0;r<t.length;r++){var l=t[r];l=l.toLowerCase(),n.includes(l)||n.push(l)}console.log("csvContent Created")}return n.length<10&&n.length>0&&alert("Entered less than 10 custom words"),n}(v,y),o={num_rounds:s,round_length:d,custom_words:[]};n.length>0&&(o.custom_words=n);var c={uid:localStorage.getItem("username"),avatar:"tempAvatar"};t.emit("createGame",{gameConfiguration:o,userData:c}),console.log("socket emit invite code")};return Object(j.jsx)("div",{className:"lobbyRoot",children:Object(j.jsxs)("form",{onSubmit:C,className:"form",children:[Object(j.jsxs)("select",{id:"numRounds",name:"numRounds",onChange:function(e){i(e.target.value)},value:s,className:"select",children:[Object(j.jsx)("option",{hidden:!0,children:"choose rounds"}),Object(j.jsx)("option",{value:"1rounds",children:"1"}),Object(j.jsx)("option",{value:"2rounds",children:"2"}),Object(j.jsx)("option",{value:"3rounds",children:"3"}),Object(j.jsx)("option",{value:"4rounds",children:"4"}),Object(j.jsx)("option",{value:"5rounds",children:"5"}),Object(j.jsx)("option",{value:"6rounds",children:"6"}),Object(j.jsx)("option",{value:"7rounds",children:"7"}),Object(j.jsx)("option",{value:"8rounds",children:"8"}),Object(j.jsx)("option",{value:"9rounds",children:"9"}),Object(j.jsx)("option",{value:"10rounds",children:"10"})]}),Object(j.jsxs)("select",{id:"roundLength",name:"roundLength",onChange:function(e){b(e.target.value)},value:d,className:"select",children:[Object(j.jsx)("option",{hidden:!0,children:"drawing time"}),Object(j.jsx)("option",{value:"30seconds",children:"30"}),Object(j.jsx)("option",{value:"40seconds",children:"40"}),Object(j.jsx)("option",{value:"50seconds",children:"50"}),Object(j.jsx)("option",{value:"60seconds",children:"60"}),Object(j.jsx)("option",{value:"70seconds",children:"70"}),Object(j.jsx)("option",{value:"80seconds",children:"80"}),Object(j.jsx)("option",{value:"90seconds",children:"90"}),Object(j.jsx)("option",{value:"120seconds",children:"120"}),Object(j.jsx)("option",{value:"180seconds",children:"180"})]}),Object(j.jsxs)("div",{className:"wordlist",children:[Object(j.jsx)("textarea",{className:"words",placeholder:"enter custom words...",value:v,onChange:function(e){var t=e.target.value;O(t)}}),Object(j.jsx)("div",{className:"csvReader",children:Object(j.jsx)(x.a,{onDrop:function(e){for(var t=[],n=0;n<e.length;n++){var o=e[n].data;t.includes(o[0])||t.push(o[0])}w(t)},onError:function(e,t,n,o){console.log(e)},addRemoveButton:!0,onRemoveFile:function(e){w(null)},children:Object(j.jsx)("span",{children:"drop a csv file or upload"})})})]}),Object(j.jsx)(h.a,{variant:"primary",onClick:C,children:"start game"})]})})};n(90);var w=function(e){var t=e.socket,n=e.history;window.history.replaceState(null,"Inkee Join Lobby","/"),Object(o.useEffect)((function(){var e=function(e){localStorage.setItem("inviteCode",e),n.push({pathname:"/game"})},o=function(e){localStorage.setItem("inviteCode",e),n.push({pathname:"/prestartLobby"})};return t.on("startGame",e),t.on("inviteCode",o),function(){t.off("startGame",e),t.off("inviteCode",o)}}),[t,n]);var c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1?arguments[1]:void 0,o={userData:{uid:localStorage.getItem("username"),avatar:"tempAvatar"},inviteCode:e};n&&""===e?alert("Game ID text box is empty!"):n&&""!==e?(o.inviteCode=e,t.emit("joinRoom",o)):n||t.emit("joinRandomRoom",o)};return Object(j.jsx)("div",{className:"root",children:Object(j.jsx)("div",{className:"greenSplat",children:Object(j.jsxs)("div",{className:"orangeSplatTwo",children:[Object(j.jsx)(p,{}),Object(j.jsxs)("form",{className:"form-group",children:[Object(j.jsx)("input",{id:"id_input",className:"username",type:"text",placeholder:"enter game ID..."}),Object(j.jsx)("br",{}),Object(j.jsx)(h.a,{variant:"primary",onClick:function(){c(document.getElementById("id_input").value,!0)},children:"join with ID"})]}),Object(j.jsx)(h.a,{variant:"primary",onClick:function(){c(document.getElementById("id_input").value,!1)},children:"join random game"})]})})})},C=n(27),k=(n(91),n(101)),S=n(103),N=n(105),I=n(107),E=n(109),L=n(102),R=n(104),D=n(106),B=n(108),G=n(110);var P=function(e){var t=e.socket,n=e.history,c=Object(o.useState)(""),a=Object(r.a)(c,2),s=a[0],i=a[1],l=Object(o.useState)(window.location.origin),u=Object(r.a)(l,2),d=u[0],b=u[1],f=Object(o.useState)([]),m=Object(r.a)(f,2),v=(m[0],m[1]),O=Object(o.useState)({}),g=Object(r.a)(O,2),p=(g[0],g[1]);return window.history.replaceState(null,"Inkee Prestart Lobby","/".concat(localStorage.getItem("inviteCode"))),Object(o.useEffect)((function(){var e=document.querySelector("#copy.copyBtn"),t=function(e){e.preventDefault(),document.querySelector("#gameLink").select(),document.execCommand("copy")};return e.addEventListener("click",t),function(){e.removeEventListener("click",t)}}),[]),Object(o.useEffect)((function(){var e=function(e){v((function(t){return[].concat(Object(C.a)(t),[e])}))},n=function(e){v((function(t){return t.filter((function(t){return t.uid!==e}))}))},o=function(e){v(e)};return t.on("getPlayers",o),t.on("newUser",e),t.on("disconnection",n),t.emit("getPlayers"),function(){t.off("getPlayers",o),t.off("newUser",e),t.off("disconnection",n)}}),[t]),Object(o.useEffect)((function(){var e=function(e){p((function(t){var n=e.key,o=e.value;return t[n]=o,t}))},n=function(e){p(e.settings)};return t.on("settingUpdate",e),t.on("loadSettings",n),t.emit("getSettings"),function(){t.off("settingUpdate",e),t.off("loadSettings",n)}}),[t]),Object(o.useEffect)((function(){var e=function(){n.push({pathname:"/game"})};return t.on("startGame",e),function(){t.off("startGame",e)}}),[t,n]),Object(o.useEffect)((function(){i(localStorage.getItem("inviteCode")),b(d+"/"+s)}),[n]),Object(j.jsx)("div",{className:"prestartRoot",children:Object(j.jsxs)("div",{className:"form",children:[Object(j.jsxs)("p",{className:"gameId",children:["game ID: ",s]}),Object(j.jsx)("div",{children:Object(j.jsx)("input",{className:"linkBox",type:"text",id:"gameLink",value:window.location.origin+"/"+s,readOnly:!0})}),Object(j.jsxs)("div",{className:"shareContainer",children:[Object(j.jsx)("button",{className:"copyBtn",type:"button",id:"copy",children:"Copy Link"}),Object(j.jsxs)("div",{className:"shareBtn",children:[Object(j.jsx)(k.a,{url:d,quote:"Join my Inkee.io game!",children:Object(j.jsx)(L.a,{size:43})}),Object(j.jsx)(S.a,{url:window.location.origin+"/"+s,quote:"Join my Inkee.io game!",children:Object(j.jsx)(R.a,{size:43})}),Object(j.jsx)(N.a,{url:window.location.origin+"/"+s,quote:"Join my Inkee.io game!",children:Object(j.jsx)(D.a,{size:43})}),Object(j.jsx)(I.a,{url:window.location.origin+"/"+s,quote:"Join my Inkee.io game!",children:Object(j.jsx)(B.a,{size:43})}),Object(j.jsx)(E.a,{url:window.location.origin+"/"+s,quote:"Join my Inkee.io game!",children:Object(j.jsx)(G.a,{size:43})})]})]}),Object(j.jsx)(h.a,{onClick:function(){t.emit("startGame")},variant:"primary",children:"ready"})]})})},T=(n(92),function(){var e=m().changeColor;return Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{id:"colorButton",className:"color",onClick:e("blue")}),Object(j.jsx)("button",{id:"colorButton",className:"color",onClick:e("red")}),Object(j.jsx)("button",{id:"colorButton",className:"color",onClick:e("green")}),Object(j.jsx)("button",{id:"colorButton",className:"color",onClick:e("yellow")}),Object(j.jsx)("button",{id:"colorButton",className:"color",onClick:e("pink")}),Object(j.jsx)("button",{id:"colorButton",className:"color",onClick:e("orange")}),Object(j.jsx)("button",{id:"colorButton",className:"color",onClick:e("purple")}),Object(j.jsx)("button",{id:"colorButton",className:"color",onClick:e("brown")}),Object(j.jsx)("button",{id:"colorButton",className:"color",onClick:e("black")})]})});function M(e){var t=e.users,n=(void 0===t?[]:t).map((function(e){return Object(j.jsxs)("div",{className:"userProfile",children:[Object(j.jsx)("div",{children:Object(j.jsx)("b",{children:e.uid})}),Object(j.jsxs)("div",{children:["Score: ",e.score]})]},e.uid)}));return Object(j.jsx)("div",{className:"profiles",children:n})}var _=function(){var e=m().changeLineWidth;return Object(j.jsx)("div",{children:Object(j.jsx)("input",{id:"typeinp",type:"range",min:"1",max:"15",defaultValue:"5",step:"1",onChange:function(t){var n=parseInt(t.target.value);e(n)}})})};var A=function(e){var t=e.name,n=void 0===t?"":t,o=e.message,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=c.correctGuess,s=void 0!==a&&a,i=c.closeGuess,r=void 0!==i&&i,l=document.createElement("p"),u=document.createTextNode("".concat(o)),d=document.getElementById("chat");if(""!==n){var j=document.createElement("span");j.textContent="".concat(n,": "),j.classList.add("fw-bold"),l.append(j)}l.classList.add("p-2","mb-0"),l.append(u),r&&l.classList.add("closeAnswer"),s&&l.classList.add("correctAnswer"),d.appendChild(l),d.scrollTop=d.scrollHeight},U=function(e){var t=e.socket,n=(e.history,Object(o.useState)([])),c=Object(r.a)(n,2),a=c[0],s=c[1],i=Object(o.useState)([]),l=Object(r.a)(i,2),u=l[0],d=l[1];return window.history.replaceState(null,"Inkee","/".concat(localStorage.getItem("inviteCode"))),Object(o.useEffect)((function(){var e=function(e){d(e)};t.on("getPlayers",e);var n=function(e){d((function(t){return[].concat(Object(C.a)(t),[e])}))};t.on("newPlayer",n);var o=function(e){d((function(t){return t.filter((function(t){return t.uid!==e}))}))};return t.on("disconnection",o),t.emit("getPlayers"),function(){t.off("getPlayers",e),t.off("newPlayer",n),t.off("disconnection",o)}}),[t]),Object(o.useEffect)((function(){var e=document.querySelector("#sendMessage"),n=function(n){if("Enter"===n.key){n.preventDefault();var o=e.value;e.value="",t.emit("chatMessage",{message:o}),console.log(o)}};return e.addEventListener("keypress",n),t.on("chatMessage",(function(e){console.log(e),s([].concat(Object(C.a)(a),[e])),A({name:e.uid,message:e.message})})),t.on("closeGuess",(function(e){console.log(e),s([].concat(Object(C.a)(a),[e])),A({name:e.uid,message:e.message},{closeGuess:!0})})),t.on("correctGuess",(function(e){console.log(e),s([].concat(Object(C.a)(a),[e])),A({name:e.uid,message:e.message},{correctGuess:!0})})),function(){t.off("ERROR"),t.off("correctGuess"),t.off("closeGuess"),t.off("chatMessage"),e.removeEventListener("keypress",n)}}),[t,a]),Object(j.jsx)("div",{className:"gameRoot",children:Object(j.jsx)(f,{socket:t,children:Object(j.jsx)("div",{className:"purpleSplatTwo",children:Object(j.jsx)("div",{className:"limeSplat",children:Object(j.jsxs)("div",{className:"inkeeLogo",children:[Object(j.jsxs)("div",{className:"topContainer",children:[Object(j.jsx)("div",{className:"word",children:"word"}),Object(j.jsx)("div",{className:"time",children:" 3:19 "})]}),Object(j.jsxs)("div",{className:"middleContainer",children:[Object(j.jsx)(M,{users:u}),Object(j.jsx)("div",{className:"drawArea",children:Object(j.jsx)(v,{socket:t})}),Object(j.jsx)("div",{className:"chat",id:"chat"})]}),Object(j.jsxs)("div",{className:"bottomContainer",children:[Object(j.jsx)("div",{className:"sendMessage",children:Object(j.jsx)("input",{type:"text",id:"sendMessage",placeholder:"enter guess..."})}),Object(j.jsx)(O,{}),Object(j.jsx)(_,{}),Object(j.jsx)(T,{})]})]})})})})})},q=n(64);var z=function(){var e=Object(o.useState)(null),t=Object(r.a)(e,2),n=t[0],c=t[1],a=Object(l.f)();return Object(o.useEffect)((function(){return localStorage.clear(),function(){localStorage.clear()}}),[]),Object(o.useEffect)((function(){var e;e="localhost"===window.location.hostname?"http://".concat(window.location.hostname,":8080"):"wss://".concat(window.location.hostname,"/");var t=Object(q.a)(e,{transports:["websocket","polling"],upgrade:!0,secure:!0});return t.on("connect_error",(function(){t.io.opts.transports=["polling","websocket"]})),t.on("ERROR",(function(e){console.log(e)})),c(t),function(){t.removeAllListeners(),t.close()}}),[c]),Object(j.jsx)(u.a,{children:Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)(l.c,{children:[Object(j.jsx)(l.a,{path:"/",exact:!0,render:function(e){return Object(j.jsx)(g,Object(i.a)({socket:n,history:a},e))}}),Object(j.jsx)(l.a,{path:"/createLobby",render:function(e){return Object(j.jsx)(y,Object(i.a)({socket:n,history:a},e))}}),Object(j.jsx)(l.a,{path:"/joinLobby",render:function(e){return Object(j.jsx)(w,Object(i.a)({socket:n,history:a},e))}}),Object(j.jsx)(l.a,{path:"/prestartLobby",render:function(e){return Object(j.jsx)(P,Object(i.a)({socket:n,history:a},e))}}),Object(j.jsx)(l.a,{path:"/game",render:function(e){return Object(j.jsx)(U,Object(i.a)({socket:n,history:a},e))}})]})})})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,112)).then((function(t){var n=t.getCLS,o=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),o(e),c(e),a(e),s(e)}))};s.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(z,{})}),document.getElementById("root")),J()},70:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){},78:function(e,t){},80:function(e,t){},89:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){},92:function(e,t,n){}},[[100,1,2]]]);
//# sourceMappingURL=main.a4dab4f2.chunk.js.map