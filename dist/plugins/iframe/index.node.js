var p=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var v=Object.prototype.hasOwnProperty;var L=(o,e)=>{for(var n in e)p(o,n,{get:e[n],enumerable:!0})},T=(o,e,n,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of M(e))!v.call(o,t)&&t!==n&&p(o,t,{get:()=>e[t],enumerable:!(s=N(e,t))||s.enumerable});return o};var R=o=>T(p({},"__esModule",{value:!0}),o);var P={};L(P,{MessageType:()=>E,default:()=>x,getInternalIframeBroadcasMessageQueueName:()=>g,getInternalIframeMessageQueueName:()=>d});module.exports=R(P);var l=class{static random(){return String(Math.round(Math.random()*1e10))}static getTimeFormat(e){let n=null;e?n=new Date(e):n=new Date;let s=n.getFullYear(),t=n.getMonth()+1,i=n.getDate(),r=n.getHours(),c=n.getMinutes(),u=s+"-";return t<10&&(u+="0"),u+=t+"-",i<10&&(u+="0"),u+=i+" ",r<10&&(u+="0"),u+=r+":",c<10&&(u+="0"),u+=c,u}};l.promiseSetTimeout=(e=0)=>new Promise(n=>setTimeout(n,e)),l.memorySize=e=>{let n=0,s;for(let t=0;t<e.length;t++)s=e.charCodeAt(t),s<127?n++:128<=s&&s<=2047?n+=2:2048<=s&&s<=65535?n+=3:n+=4;return n>=1024*1024?(n/(1024*1024)).toFixed(2)+"MB":n>=1024&&n<1024*1024?(n/1024).toFixed(2)+"KB":n+"B"};var a=class{static error(e){console.error(e)}static log(e){console.log(e)}};a.unmq=null;var h=class{constructor(e){this.id=l.random();this.consumedTimes=-1;this.createTime=new Date().getTime(),this.content=e}getId(){return this.id}};var f=class{constructor(e,n){this.id=l.random();this.createTime=new Date().getTime(),this.consume=e,this.payload=n}getId(){return this.id}consumption(e,n){return{then:t=>{try{if(!n)return this.consume(e.content,this.payload),t(!0);let i=(c=!0)=>t(c),r=this.consume(e.content,i,this.payload);y(r)?r.then(c=>{t(Boolean(c))}).catch(()=>{t(!1)}):typeof r=="boolean"&&(i=()=>{},t(r))}catch(i){a.error("Consumer consumption error"),t(!n)}}}}};var m=class{constructor(e){this.id=l.random();this.ask=!1;this.rcn=3;this.mode="Random";this.news=[];this.consumerList=[];(e==null?void 0:e.ask)!==void 0&&(this.ask=e.ask),(e==null?void 0:e.news)!==void 0&&(this.news=e.news),(e==null?void 0:e.consumerList)!==void 0&&(this.consumerList=e.consumerList),(e==null?void 0:e.rcn)!==void 0&&(this.rcn=e.rcn),(e==null?void 0:e.mode)!==void 0&&(this.mode=e.mode),(e==null?void 0:e.name)!==void 0&&(this.name=e.name)}getId(){return this.id}getNews(){return this.news}getConsumerList(){return this.consumerList}removeConsumer(e){let n=this.consumerList.findIndex(s=>s.consume===e);return n===-1?!1:(this.consumerList.splice(n,1),!0)}removeAllConsumer(){return this.consumerList=[],!0}removeAllNews(){return this.news=[],!0}removeConsumerById(e){let n=this.consumerList.findIndex(s=>s.getId()===e);return n===-1?!1:(this.consumerList.splice(n,1),!0)}pushConsumer(e){this.consumerList.findIndex(n=>n.getId()===e.getId())===-1&&this.consumerList.push(e),this.news.length>0&&this.consumerList.length>0&&this.consumeNews()}pushConsume(e,n){let s=new f(e,n);this.pushConsumer(s)}pushNews(e){e.consumedTimes===-1&&(e.consumedTimes=this.rcn),e.consumedTimes>0&&this.news.findIndex(n=>n.getId()===e.getId())===-1&&this.news.push(e),this.news.length>0&&this.consumerList.length>0&&this.consumeNews()}pushContent(e){let n=new h(e);this.pushNews(n)}eject(){return this.news.length>0?this.news.splice(0,1)[0]:null}consumeNews(){if(this.news.length===0||this.consumerList.length===0)return;let e=this.eject();if(e!==null){if(this.mode==="Random"){let n=Math.round(Math.random()*(this.consumerList.length-1)),s=this.consumerList[n];this.consumption(e,s)}else if(this.mode==="All")for(let n of this.consumerList)this.consumption(e,n)}}consumption(e,n){n.consumption(e,this.ask).then(s=>{s?a.log("\u961F\u5217 \u6D88\u8D39\u6210\u529F"):(a.log("\u961F\u5217 \u6D88\u8D39\u5931\u8D25"),e.consumedTimes--,this.pushNews(e)),this.news.length>0&&this.consumeNews()})}};var Me=Array.isArray;var Q=o=>typeof o=="function",w=o=>typeof o=="string";var C=o=>o!==null&&typeof o=="object",y=o=>C(o)&&Q(o.then)&&Q(o.catch);function D(){if(window.top===null)throw"window.top is null";return k(window.top,0,0).filter(e=>e.window!==window.self)}function k(o,e,n){let s=[];s.push({window:o,x:e,y:n}),n+=1;for(let t=0;t<o.length;t++)s.push(...k(o[t],e,n)),e+=1;return s}var E=(t=>(t[t.GeneralMessage=0]="GeneralMessage",t[t.FindExchangeMessage=1]="FindExchangeMessage",t[t.SendCoordinateMessage=2]="SendCoordinateMessage",t[t.OnlineNotificationMessage=3]="OnlineNotificationMessage",t))(E||{}),d=o=>o+"_Iframe_Message",g=o=>o+"_Iframe_Wait_Message",x=class{constructor(e){this.name=e;this.unmq=null;this.name=e}install(e,...n){if(!e.getExchange(this.name))throw`${this.name}\u4EA4\u6362\u673A\u4E0D\u5B58\u5728`;this.unmq=e;let i=e.getExchangeList().filter(r=>r.name!==this.name);for(let r of i){if(r.name===void 0)throw"\u7CFB\u7EDF\u9519\u8BEF";r.setRepeater(()=>[d(r.name),g(r.name)]),e.addQueue(new m({name:d(r.name)})),e.addQueue(new m({name:g(r.name)})),e.on(g(r.name),()=>{this.broadcastMessage(1,{exchangeName:r.name,msg:`who is ${this.name}`})})}this.broadcastMessage(3,null),window.addEventListener("message",this.receiveMessage.bind(this),!1)}receiveMessage({source:e,data:n,origin:s}){if(this.unmq===null)throw`${this.name} iframe \u672A\u5B89\u88C5`;if(!C(n))return;let{mask:t,type:i,message:r,fromName:c}=n;if(t==="u-node-mq-plugin"&&e!=null&&e instanceof Window){if([3,2].indexOf(i)!==-1){let u=this.unmq.getExchange(c);return!u||w(u.origin)&&u.origin!==s?void 0:(this.unmq.on(d(c),b=>{this.postMessage(e,0,b,s)})(),!0)}if(i===0)return this.unmq.emit(this.name,r);i===1&&r.exchangeName===this.name&&this.postMessage(e,2,{msg:`my name is ${this.name}`},s)}}postMessage(e,n,s,t="*",i){e.postMessage({mask:"u-node-mq-plugin",type:n,message:s,fromName:this.name},t,i)}broadcastMessage(e,n){D().forEach(t=>{this.postMessage(t.window,e,n,"*")})}};0&&(module.exports={MessageType,getInternalIframeBroadcasMessageQueueName,getInternalIframeMessageQueueName});