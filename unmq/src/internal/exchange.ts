import Tools from "../utils/tools";
import Logs from "./Logs";
import { QueueName } from "./Queue";
import { queueCollection } from "../core";
/**
 * 中继器类型
 */
type Repeater<D> = (content: D) => Promise<QueueName[]> | QueueName[];

export type Option<D> = {
  name: string;
  routes?: string[];
  repeater?: Repeater<D>;
};
/**
 * 交换机
 */
export default class Exchange<D> {
  /**
   * id
   */
  private readonly id: string = Tools.random();
  getId() {
    return this.id;
  }
  /**
   * 交换机名字
   */
  private readonly name: string;
  getName() {
    return this.name;
  }
  /**
   * 静态路由
   */
  private routes: QueueName[] = [];
  getRoutes() {
    return this.routes;
  }
  pushRoutes(routes: QueueName[]) {
    this.routes = Array.from(new Set(this.routes.concat(routes)));
  }
  setRoutes(routes: QueueName[]) {
    this.routes = routes;
  }
  /**
   * 动态路由（中继器）
   */
  private repeater: Repeater<D>;
  getRepeater() {
    return this.repeater;
  }
  setRepeater(repeater: Repeater<D>) {
    this.repeater = repeater;
  }

  constructor(option: Option<D>) {
    this.name = option.name;
    if (option.routes !== undefined) this.routes = option.routes;
    if (option.repeater !== undefined) this.repeater = option.repeater;
  }

  /**
   * 删除routes
   * @param routes
   */
  removeRoutes(routes?: QueueName[]) {
    if (routes === undefined) this.routes = [];
    else this.routes = this.routes.filter(item => routes.indexOf(item) !== -1);
  }

  /**
   * 获取队列名称列表
   * @param content
   * @returns
   */
  async getQueueNameList(content: D): Promise<QueueName[]> {
    try {
      //中继器模式
      if (this.repeater) {
        return await this.repeater(content);
      } else if (this.routes) {
        return this.routes;
      }
    } catch (error) {
      Logs.error(`${this.name} exchange function getQueueNameList exception`);
      return [];
    }
  }

  /**
   * 发送一条消息到队列列表
   * @param content
   */
  async pushNewsToQueueList(content: D) {
    //先获取所有可以挂载消息的队列名称
    const queueNameList = await this.getQueueNameList(content);
    for (const queueName of queueNameList) {
      //分别向每一条队列发送一条消息
      queueCollection.pushNewsToQueue(queueName, content);
    }
  }
}