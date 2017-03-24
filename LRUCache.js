/**
 * @param {number} capacity
 */
function LRUCache(capacity) {
    return this.init(capacity);
};

LRUCache.prototype.init = function(capacity) {
    this.dataMap = {};
    this.recard = [];
    this.size = 0;
    this.capacity = capacity;
    return this;
};
/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(!this.dataMap[key]) return -1;
    this.recard.splice(this.recard.indexOf(key), 1);
    this.recard.unshift(key);
    return this.dataMap[key];
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.dataMap.hasOwnProperty(key)) {
        this.dataMap[key] = value;
        this.recard.splice(this.recard.indexOf(key), 1);
        this.recard.unshift(key);
    } else {
        if(this.size >= this.capacity) {
            var t = this.recard.pop();
            delete this.dataMap[t];
            this.size -= 1;
        }
        this.recard.unshift(key);
        this.dataMap[key] = value;
        this.size += 1;
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = Object.create(LRUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

var lru = new LRUCache(2);
