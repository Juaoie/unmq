# u-node-mq

基于发布订阅模型的消息通信插件，保证在异步模式下消息必消费，有完整的类型提示，也可进行跨 ifram 通信；

## 已实现功能

- [发布订阅模型](https://www.rabbitmq.com/getstarted.html)

  - 实现类似 rabbitmq 的五种消息模式

- iframe 的跨域通信插件

  - 使用 UNodeMQ 的发布订阅模型解决异步数据通信问题
  - 使用 postMessage api 进行跨域通信
  - 实现定位算法实现消息准确发送
  - 通过 origin 确保数据安全

## 即将实现功能

- 基于 rxjs pipeline

- 重写 process 流程执行器，2.x 部分有完整版

- 基于发布订阅的状态管理

- 更加方便的 websocket 封装方法

## 简单示例地址

[UNodeMQ](https://unpkg.com/u-node-mq/test/unmq/index.html)

[IframeMessage](https://unpkg.com/u-node-mq/test/message/index.html)

## npm 安装

`yarn add u-node-mq`

or

`npm install u-node-mq`

## CDN 安装

```html
<script type="module" src="https://unpkg.com/u-node-mq/dist/index.js"></script>
```

or

```javascript
import UNodeMQ, { Exchange, Queue } from "https://unpkg.com/u-node-mq/dist/index.js";
```

# u-node-mq 基本使用方法

**main.js**

```javascript
import UNodeMQ, { Exchange, Queue } from "u-node-mq";

//声明交换机ex1和交换机ex2，以及队列qu1
const unmq = new UNodeMQ({ ex1: new Exchange({ routes: ["qu1"] }) }, { qu1: new Queue() });

export default unmq;

//可以挂到抬手就摸得到的位置

// Vue.prototype.unmq = unmq;
```

**页面 1.js**

```javascript
import unmq from "main.js";

//发送数据
unmq.emit("ex1", "消息内容1", "消息内容2");
```

**页面 2.js**

```javascript
import unmq from "main.js";

//接收并消费数据
unmq.on("qu1", getData);

function getData(data) {
  console.log(data);
}
```

## u-node-mq 核心概念

> u-node-mq 是由多个模块组合而成，你可以自行组合这些模块以实现不同的功能，可以根据你特定需求来组合

- `UNodeMQ` 主模块，一般一个应用只用创建一次，需要根据需求传入其他模块的实例

- `Exchange` 交换机，每个交换机就是一个分发数据到队列的路由

- `Queue` 队列，队列是一个能存储少量数据和唯一能分配数据给不同服务的模块，理论上每个队列的消息应该是相同数据类型的

- `News` 消息，消息一般不直接由用户创建，而是由 UNodeMQ 创建，除非你有持久化数据的需求，那么你可以配合`u-cache-ui api`管理和存储数据，在下次应用启动的时候初始化`news`到`queue`中

- `Consumer` 消费者，消费者一般也不直接由用户创建，而是由 UNodeMQ 创建，除非你有其他一些更加复杂的业务需求，例如：同时创建多个不同消费者，或者创建消费特定次数的消费者等

- `Logs` 日志消息，方便调试开发

---

## 1、UNodeMQ

```javascript
import UNodeMQ from "u-node-mq";
const unmq = new UNodeMQ(ExchangeCollection, QueueCollection);
```

创建模块

**UNodeMQ constructor 参数说明**

| 名称               | 类型                  | 必填 | 说明       |
| ------------------ | --------------------- | ---- | ---------- |
| ExchangeCollection | { string : Exchange } | 是   | 交换机集合 |
| QueueCollection    | { string : Queue }    | 是   | 队列集合   |

**unmq 方法说明**

| 名称        | 参数类型                           | 说明                                                           |
| ----------- | ---------------------------------- | -------------------------------------------------------------- |
| emit        | (ExchangeName , ...消息)           | 发送数据到交换机，返回 this                                    |
| emitToQueue | (QueueName , ...消息)              | 发送数据到交换机，返回 this                                    |
| on          | (QueueName , 消费方法 , ?载荷消息) | 订阅队列消息，载荷信息每次都会发送给消费者，返回取消订阅的函数 |
| off         | (QueueName , ?消费方法)            | 移除队列上的指定消费者或者移除队列上所有消费者，返回 this      |
| once        | (QueueName , 消费方法 , ?载荷消息) | 只消费一条消息，返回 this                                      |
| 更多        | 未知                               | 更多的内部方法                                                 |

---

## 2、Exchange

```javascript
const exchange = new Exchange(Option);
```

创建交换机

**Option 参数说明**

| 名称     | 类型     | 必填 | 说明                                     |
| -------- | -------- | ---- | ---------------------------------------- |
| name     | String   | 否   | 交换机名称                               |
| routes   | String[] | 否   | 需要匹配的队列名称                       |
| repeater | Function | 否   | 自定义路由函数，填写该参数 routes 将失效 |

---

## 3、Queue

```javascript
const queue = new Option(Option);
```

创建队列

**Option 参数说明**

| 名称      | 类型              | 必填 | 默认     | 说明                                                                        |
| --------- | ----------------- | ---- | -------- | --------------------------------------------------------------------------- |
| name      | String            | 否   |          | 队列名称                                                                    |
| mode      | "Random" \| "All" | 否   | "Random" | 消费模式，Random 代表随机抽取一个消费者消费，ALL 代表所有消费者都会消费消息 |
| news      | News[]            | 否   | []       | 消息列表                                                                    |
| consumers | Consumer[]        | 否   | []       | 消费者列表                                                                  |
| ask       | Boolean           | 否   | false    | 是否需要消息确认，为 true，则需要手动确认消息                               |
| rcn       | number            | 否   | 3        | 消费失败后可重复消费次数                                                    |

---

## 4、News

```javascript
const news = new News(Any);
```

创建消息

**news 属性说明**

| 名称          | 类型   | 说明               |
| ------------- | ------ | ------------------ |
| createTime    | Number | 消息创建时间戳     |
| content       | Any    | 消息内容           |
| consumedTimes | number | 剩余可重复消费次数 |

---

## 5、Consumer

```javascript
const consumer = new Consumer(Consume, PayLoad);
```

创建消费者

**Consume 参数说明**

| 参数   | 类型     | 说明                                                            |
| ------ | -------- | --------------------------------------------------------------- |
| 参数 1 | 消息内容 |                                                                 |
| 参数 2 | next     | 是否确认消费，执行 next 默认为确认消费，传 false 则代表消费失败 |
| 参数 3 | payload  | 固定消费内容，每次消费都会传递                                  |

**consumer 属性说明**

| 名称       | 类型     | 说明             |
| ---------- | -------- | ---------------- |
| createTime | Number   | 消费者创建时间戳 |
| consume    | Function | 消费方法         |
| payload    | any      | 固定载荷         |

---

# IframeMessage Plugin

- IframeMessage 为单例模式，每个应用只会有一个 IframeMessage 实例对象

## IframeMessage 基本使用方法

**iframe1 应用**

```javascript
// https://iframeName1.com
import IframeMessage, { SelfIframe, OtherIframe, SelfQueue } from "u-node-mq/plugins/message";
const im = new IframeMessage(
  "iframeName1",
  new SelfIframe(),
  {
    iframeName2: new OtherIframe("https://iframeName2.com"),
  },
  {}
);
```

**iframe2 应用**

```javascript
// https://iframeName2.com
import IframeMessage, { SelfIframe, OtherIframe, SelfQueue } from "u-node-mq/plugins/message";
const im = new IframeMessage(
  "iframeName2",
  new SelfIframe({ routes: ["qu2"] }),
  {
    iframeName1: new OtherIframe("https://iframeName1.com"),
  },
  {
    qu2: new SelfQueue(),
  }
);
```

## 1、IframeMessage

```javascript
import IframeMessage from "u-node-mq/plugins/message";
const im = new IframeMessage(name, SelfIframe, ExchangeCollectionType, QueueCollectionType);
```

**IframeMessage constructor 参数说明**

| 名称               | 类型                     | 必填 | 说明                         |
| ------------------ | ------------------------ | ---- | ---------------------------- |
| name               | string                   | 是   | 当前 iframe 容器的名称       |
| SelfIframe         | SelfIframe               | 是   | 当前 iframe 容器的交换机，   |
| ExchangeCollection | { string : OtherIframe } | 是   | 其他 iframe 容器的交换机集合 |
| QueueCollection    | { string : SelfQueue }   | 是   | 当前 iframe 容器的队列集合   |

**im 方法说明**

| 名称 | 参数类型                           | 说明                                                                             |
| ---- | ---------------------------------- | -------------------------------------------------------------------------------- |
| emit | (ExchangeName , ...消息)           | 发送数据到其他 iframe 容器交换机，返回 this                                      |
| on   | (QueueName , 消费方法 , ?载荷消息) | 订阅队列消息，其他 iframe 容器发送消息到当前应用会将触发消费，返回取消订阅的函数 |
| off  | (QueueName , ?消费方法)            | 移除队列上的指定消费者或者移除队列上所有消费者，返回 this                        |
| once | (QueueName , 消费方法 , ?载荷消息) | 只消费一条消息，返回 this                                                        |
| 更多 | 未知                               | 更多的内部方法                                                                   |

## 2、OtherIframe

- 建议只创建需要发送消息的应用实例，不需要发送消息的应用，则不创建

```javascript
import { OtherIframe } from "u-node-mq/plugins/message";
const otherIframe = new OtherIframe({ name: "otherName", origin: "https://iframeName2.com" });
```

| 名称   | 类型   | 必填 | 说明                                                         |
| ------ | ------ | ---- | ------------------------------------------------------------ |
| origin | string | 否   | 默认为"\*"，为了通信安全，建议为每个 OtherIframe 加上 origin |