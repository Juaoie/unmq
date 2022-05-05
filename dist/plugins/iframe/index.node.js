var Q=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var M=Object.prototype.hasOwnProperty;var L=(s,e)=>{for(var n in e)Q(s,n,{get:e[n],enumerable:!0})},P=(s,e,n,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of v(e))!M.call(s,t)&&t!==n&&Q(s,t,{get:()=>e[t],enumerable:!(o=N(e,t))||o.enumerable});return s};var R=s=>P(Q({},"__esModule",{value:!0}),s);var S={};L(S,{MessageType:()=>E,default:()=>x,getInternalIframeBroadcasMessageQueueName:()=>p,getInternalIframeMessageQueueName:()=>d});module.exports=R(S);var c=class{static random(){return String(Math.round(Math.random()*1e10))}static getTimeFormat(e){let n=null;e?n=new Date(e):n=new Date;let o=n.getFullYear(),t=n.getMonth()+1,r=n.getDate(),i=n.getHours(),a=n.getMinutes(),l=o+"-";return t<10&&(l+="0"),l+=t+"-",r<10&&(l+="0"),l+=r+" ",i<10&&(l+="0"),l+=i+":",a<10&&(l+="0"),l+=a,l}};c.promiseSetTimeout=(e=0)=>new Promise(n=>setTimeout(n,e)),c.memorySize=e=>{let n=0,o;for(let t=0;t<e.length;t++)o=e.charCodeAt(t),o<127?n++:128<=o&&o<=2047?n+=2:2048<=o&&o<=65535?n+=3:n+=4;return n>=1024*1024?(n/(1024*1024)).toFixed(2)+"MB":n>=1024&&n<1024*1024?(n/1024).toFixed(2)+"KB":n+"B"};var u=class{static error(e){console.error(e)}static log(e){console.log(e)}};u.unmq=null;var h=class{constructor(e){this.id=c.random();this.consumedTimes=-1;this.createTime=new Date().getTime(),this.content=e}getId(){return this.id}};var g=class{constructor(e,n){this.id=c.random();this.createTime=new Date().getTime(),this.consume=e,this.payload=n}getId(){return this.id}consumption(e,n){return{then:t=>{try{if(!n)return this.consume(e.content,this.payload),t(!0);let r=(a=!0)=>t(a),i=this.consume(e.content,r,this.payload);y(i)?i.then(a=>{t(Boolean(a))}).catch(()=>{t(!1)}):typeof i=="boolean"&&(r=()=>{},t(i))}catch(r){u.error("Consumer consumption error"),t(!n)}}}}};var m=class{constructor(e){this.id=c.random();this.ask=!1;this.rcn=3;this.mode="Random";this.async=!1;this.state=!1;this.maxTime=3e3;this.news=[];this.consumerList=[];Object.assign(this,e)}getId(){return this.id}getNews(){return this.news}getConsumerList(){return this.consumerList}removeConsumer(e){let n=this.consumerList.findIndex(o=>o.consume===e);return n===-1?!1:(this.consumerList.splice(n,1),!0)}removeAllConsumer(){return this.consumerList=[],!0}removeAllNews(){return this.news=[],!0}removeConsumerById(e){let n=this.consumerList.findIndex(o=>o.getId()===e);return n===-1?!1:(this.consumerList.splice(n,1),!0)}pushConsumer(e){this.consumerList.findIndex(n=>n.getId()===e.getId())===-1&&this.consumerList.push(e),this.news.length>0&&this.consumerList.length>0&&this.consumeNews()}pushConsume(e,n){let o=new g(e,n);this.pushConsumer(o)}pushNews(e){e.consumedTimes===-1&&(e.consumedTimes=this.rcn),e.consumedTimes>0&&this.news.findIndex(n=>n.getId()===e.getId())===-1&&this.news.push(e),this.news.length>0&&this.consumerList.length>0&&this.consumeNews()}pushContent(e){let n=new h(e);this.pushNews(n)}eject(){return this.news.length>0?this.news.splice(0,1)[0]:null}consumeNews(){if(this.news.length===0||this.consumerList.length===0||!this.async&&this.state)return;let e=this.eject();if(e===null)return;this.state=!0,(()=>{if(this.mode==="Random"){let o=Math.round(Math.random()*(this.consumerList.length-1)),t=this.consumerList[o];return Promise.all([this.consumption(e,t)])}return Promise.all(this.consumerList.map(o=>this.consumption(e,o)))})().then(()=>{}).catch(()=>{e.consumedTimes--,this.pushNews(e)}).finally(()=>{this.state=!1,this.news.length>0&&this.consumeNews()}),this.async&&this.news.length>0&&this.consumeNews()}consumption(e,n){return new Promise((o,t)=>{let r=this.maxTime,i=r>=0?setTimeout(()=>{u.log("\u961F\u5217 \u6D88\u8D39\u8D85\u65F6"),t(!1)},r):null;n.consumption(e,this.ask).then(a=>{a?(u.log("\u961F\u5217 \u6D88\u8D39\u6210\u529F"),o(a)):(u.log("\u961F\u5217 \u6D88\u8D39\u5931\u8D25"),t(a)),r>=0&&clearTimeout(i)})})}};var Me=Array.isArray;var f=s=>typeof s=="function",w=s=>typeof s=="string";var C=s=>s!==null&&typeof s=="object",y=s=>C(s)&&f(s.then)&&f(s.catch);function b(){if(window.top===null)throw"window.top is null";return k(window.top,0,0).filter(e=>e.window!==window.self)}function k(s,e,n){let o=[];o.push({window:s,x:e,y:n}),n+=1;for(let t=0;t<s.length;t++)o.push(...k(s[t],e,n)),e+=1;return o}var E=(t=>(t[t.GeneralMessage=0]="GeneralMessage",t[t.FindExchangeMessage=1]="FindExchangeMessage",t[t.SendCoordinateMessage=2]="SendCoordinateMessage",t[t.OnlineNotificationMessage=3]="OnlineNotificationMessage",t))(E||{}),d=s=>s+"_Iframe_Message",p=s=>s+"_Iframe_Wait_Message",x=class{constructor(e){this.name=e;this.unmq=null;this.name=e}install(e,...n){if(!e.getExchange(this.name))throw`${this.name}\u4EA4\u6362\u673A\u4E0D\u5B58\u5728`;this.unmq=e;let r=e.getExchangeList().filter(i=>i.name!==this.name);for(let i of r){if(i.name===void 0)throw"\u7CFB\u7EDF\u9519\u8BEF";i.setRepeater(()=>[d(i.name),p(i.name)]),e.addQueue(new m({name:d(i.name),async:!0})),e.addQueue(new m({name:p(i.name),async:!0})),e.on(p(i.name),()=>{this.broadcastMessage(1,{exchangeName:i.name,msg:`who is ${i.name} ?`})})}this.broadcastMessage(3,{msg:`${this.name} is online`}),window.addEventListener("message",this.receiveMessage.bind(this),!1)}receiveMessage({source:e,data:n,origin:o}){if(this.unmq===null)throw`${this.name} iframe \u672A\u5B89\u88C5`;if(!C(n))return;let{mask:t,type:r,message:i,fromName:a}=n;if(t!=="u-node-mq-plugin"||e==null)return;let l=this.unmq.getExchange(a);if(!!l&&!(w(l.origin)&&l.origin!==o)){if([3,2].indexOf(r)!==-1){let D=this.unmq.on(d(a),T=>{this.postMessage(e,0,T,o)});return setTimeout(D),!0}if(r===0)return this.unmq.emit(this.name,i),!0;if(r===1&&i.exchangeName===this.name)return this.postMessage(e,2,{msg:`my name is ${this.name}`},o),!0}}postMessage(e,n,o,t="*",r){e.postMessage({mask:"u-node-mq-plugin",type:n,message:o,fromName:this.name},t,r)}broadcastMessage(e,n){b().forEach(t=>{this.postMessage(t.window,e,n,"*")})}};0&&(module.exports={MessageType,getInternalIframeBroadcasMessageQueueName,getInternalIframeMessageQueueName});
//# sourceMappingURL=index.node.js.map
