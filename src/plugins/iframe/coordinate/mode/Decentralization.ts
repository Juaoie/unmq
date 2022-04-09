import CoordinateList, { Coordinate } from "../index.js";
import { broadcastGetCoordinateMessage, broadcastMessage, MessageType } from "../../PostMessage.js";
/**
 * 分布式路由
 */
export default class Decentralization implements CoordinateList {
  /**
   * 根据名称获取地址
   * @param exchangeName
   * @returns
   */
  async getCoordinate(exchangeName: string) {
    //先广播查找exchange坐标
    try {
      const coordinate = await broadcastGetCoordinateMessage(exchangeName);
      return coordinate;
    } catch (error) {
      throw new Error(`${exchangeName} iframe 还没挂载`);
    }
  }
}
