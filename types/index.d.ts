declare class Delivery<T> {
    private promises;
    register(key: string): Promise<T>;
    resolve(key: string, value: T): void;
    reject(key: string, reason: string): void;
}
export default Delivery;
