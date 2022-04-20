(()=>{var l=class{static random(){return String(Math.round(Math.random()*1e10))}static getTimeFormat(e){let n=null;e?n=new Date(e):n=new Date;let s=n.getFullYear(),t=n.getMonth()+1,r=n.getDate(),i=n.getHours(),c=n.getMinutes(),u=s+"-";return t<10&&(u+="0"),u+=t+"-",r<10&&(u+="0"),u+=r+" ",i<10&&(u+="0"),u+=i+":",c<10&&(u+="0"),u+=c,u}};l.promiseSetTimeout=(e=0)=>new Promise(n=>setTimeout(n,e)),l.memorySize=e=>{let n=0,s;for(let t=0;t<e.length;t++)s=e.charCodeAt(t),s<127?n++:128<=s&&s<=2047?n+=2:2048<=s&&s<=65535?n+=3:n+=4;return n>=1024*1024?(n/(1024*1024)).toFixed(2)+"MB":n>=1024&&n<1024*1024?(n/1024).toFixed(2)+"KB":n+"B"};var a=class{static error(e){console.error(e)}static log(e){console.log(e)}};a.unmq=null;var m=class{constructor(e){this.id=l.random();this.consumedTimes=-1;this.createTime=new Date().getTime(),this.content=e}getId(){return this.id}};var g=class{constructor(e,n){this.id=l.random();this.createTime=new Date().getTime(),this.consume=e,this.payload=n}getId(){return this.id}consumption(e,n){return{then:t=>{try{if(!n)return this.consume(e.content,this.payload),t(!0);let r=(c=!0)=>t(c),i=this.consume(e.content,r,this.payload);C(i)?i.then(c=>{t(Boolean(c))}).catch(()=>{t(!1)}):typeof i=="boolean"&&(r=()=>{},t(i))}catch(r){a.error("Consumer consumption error"),t(!n)}}}}};var h=class{constructor(e){this.id=l.random();this.ask=!1;this.rcn=3;this.mode="Random";this.async=!1;this.state=!1;this.news=[];this.consumerList=[];(e==null?void 0:e.ask)!==void 0&&(this.ask=e.ask),(e==null?void 0:e.news)!==void 0&&(this.news=e.news),(e==null?void 0:e.consumerList)!==void 0&&(this.consumerList=e.consumerList),(e==null?void 0:e.rcn)!==void 0&&(this.rcn=e.rcn),(e==null?void 0:e.mode)!==void 0&&(this.mode=e.mode),(e==null?void 0:e.name)!==void 0&&(this.name=e.name)}getId(){return this.id}getNews(){return this.news}getConsumerList(){return this.consumerList}removeConsumer(e){let n=this.consumerList.findIndex(s=>s.consume===e);return n===-1?!1:(this.consumerList.splice(n,1),!0)}removeAllConsumer(){return this.consumerList=[],!0}removeAllNews(){return this.news=[],!0}removeConsumerById(e){let n=this.consumerList.findIndex(s=>s.getId()===e);return n===-1?!1:(this.consumerList.splice(n,1),!0)}pushConsumer(e){this.consumerList.findIndex(n=>n.getId()===e.getId())===-1&&this.consumerList.push(e),this.news.length>0&&this.consumerList.length>0&&this.consumeNews()}pushConsume(e,n){let s=new g(e,n);this.pushConsumer(s)}pushNews(e){e.consumedTimes===-1&&(e.consumedTimes=this.rcn),e.consumedTimes>0&&this.news.findIndex(n=>n.getId()===e.getId())===-1&&this.news.push(e),this.news.length>0&&this.consumerList.length>0&&this.consumeNews()}pushContent(e){let n=new m(e);this.pushNews(n)}eject(){return this.news.length>0?this.news.splice(0,1)[0]:null}consumeNews(){if(this.news.length===0||this.consumerList.length===0||!this.async&&this.state)return;let e=this.eject();if(e!==null)if(this.state=!0,this.mode==="Random"){let n=Math.round(Math.random()*(this.consumerList.length-1)),s=this.consumerList[n];this.consumption(e,s).then(()=>{}).catch(()=>{e.consumedTimes--,this.pushNews(e)}).finally(()=>{this.state=!1,this.news.length>0&&this.consumeNews()})}else this.mode==="All"&&Promise.all(this.consumerList.map(n=>this.consumption(e,n))).then(()=>{}).catch(()=>{e.consumedTimes--,this.pushNews(e)}).finally(()=>{this.state=!1,this.news.length>0&&this.consumeNews()})}consumption(e,n){return new Promise((s,t)=>{n.consumption(e,this.ask).then(r=>{r?(a.log("\u961F\u5217 \u6D88\u8D39\u6210\u529F"),s(r)):(a.log("\u961F\u5217 \u6D88\u8D39\u5931\u8D25"),t(r))})})}};var we=Array.isArray;var f=o=>typeof o=="function",w=o=>typeof o=="string";var d=o=>o!==null&&typeof o=="object",C=o=>d(o)&&f(o.then)&&f(o.catch);function y(){if(window.top===null)throw"window.top is null";return E(window.top,0,0).filter(e=>e.window!==window.self)}function E(o,e,n){let s=[];s.push({window:o,x:e,y:n}),n+=1;for(let t=0;t<o.length;t++)s.push(...E(o[t],e,n)),e+=1;return s}var b=(t=>(t[t.GeneralMessage=0]="GeneralMessage",t[t.FindExchangeMessage=1]="FindExchangeMessage",t[t.SendCoordinateMessage=2]="SendCoordinateMessage",t[t.OnlineNotificationMessage=3]="OnlineNotificationMessage",t))(b||{}),x=o=>o+"_Iframe_Message",p=o=>o+"_Iframe_Wait_Message",Q=class{constructor(e){this.name=e;this.unmq=null;this.name=e}install(e,...n){if(!e.getExchange(this.name))throw`${this.name}\u4EA4\u6362\u673A\u4E0D\u5B58\u5728`;this.unmq=e;let r=e.getExchangeList().filter(i=>i.name!==this.name);for(let i of r){if(i.name===void 0)throw"\u7CFB\u7EDF\u9519\u8BEF";i.setRepeater(()=>[x(i.name),p(i.name)]),e.addQueue(new h({name:x(i.name)})),e.addQueue(new h({name:p(i.name)})),e.on(p(i.name),()=>{this.broadcastMessage(1,{exchangeName:i.name,msg:`who is ${this.name}`})})}this.broadcastMessage(3,null),window.addEventListener("message",this.receiveMessage.bind(this),!1)}receiveMessage({source:e,data:n,origin:s}){if(this.unmq===null)throw`${this.name} iframe \u672A\u5B89\u88C5`;if(!d(n))return;let{mask:t,type:r,message:i,fromName:c}=n;if(t==="u-node-mq-plugin"&&e!=null&&e instanceof Window){if([3,2].indexOf(r)!==-1){let u=this.unmq.getExchange(c);return!u||w(u.origin)&&u.origin!==s?void 0:(this.unmq.on(x(c),D=>{this.postMessage(e,0,D,s)})(),!0)}if(r===0)return this.unmq.emit(this.name,i);r===1&&i.exchangeName===this.name&&this.postMessage(e,2,{msg:`my name is ${this.name}`},s)}}postMessage(e,n,s,t="*",r){e.postMessage({mask:"u-node-mq-plugin",type:n,message:s,fromName:this.name},t,r)}broadcastMessage(e,n){y().forEach(t=>{this.postMessage(t.window,e,n,"*")})}};})();
//# sourceMappingURL=index.browser.js.map
