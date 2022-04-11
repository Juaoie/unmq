import { isPromise } from "../index.js";
import Tools from "../utils/tools.js";
import Logs from "./Logs.js";
export default class Consumer {
    constructor(consume, payload) {
        this.id = Tools.random();
        this.createTime = new Date().getTime();
        this.consume = consume;
        this.payload = payload;
    }
    getId() {
        return this.id;
    }
    consumption(news, ask) {
        const then = (thenParameter) => {
            try {
                if (!ask) {
                    this.consume(news.content, null, this.payload);
                    return thenParameter(true);
                }
                let confirm = (value = true) => thenParameter(value);
                const res = this.consume(news.content, confirm, this.payload);
                if (isPromise(res)) {
                    res
                        .then((onfulfilled) => {
                        thenParameter(Boolean(onfulfilled));
                    })
                        .catch(() => {
                        thenParameter(false);
                    });
                }
                else if (typeof res === "boolean") {
                    confirm = () => { };
                    thenParameter(res);
                }
            }
            catch (error) {
                Logs.error("Consumer consumption error");
                thenParameter(false);
            }
        };
        return {
            then,
        };
    }
}
