(function() {
    function Obsever() {
        this.event = {};
    }

    Observer.prototype.addListener = function() {
        var eventname = arguments[0],
            len = arguments.length,
            queue = this.event[eventname] = [];
        if (len === 1) {
            return this;
        }
        for (var i = 1; i < len; i++) {
            if (Object.prototype.toString.call(arguments[i]) === '[object Function]') {
                queue.push(arguments[i]);
            }
        }
        return this;
    };

    Observer.prototype.removeListener = function() {
        var eventname = arguments[0],
            len = arguments.length,
            queue = this.event[eventname];
        if (len === 1 || queue.length === 0) {
            return this;
        }
        for (var i = 1; i < len; i++) {
            for (var k = 0; k < queue.length; k++) {
                if (queue[k] === arguments[i]) {
                    queue.splice(k, 1);
                    k--;
                }
            }
        }
    };

    Observer.prototype.fire = function() {
        var eventname = arguments[0],
            queue = this.event[eventname],
            params = Array.prototype.slice.call(arguments, 1);
        if (!eventname) {
            return this;
        }
        queue.forEach(function(item, index, arr) {
            item.apply(this, params);
        });
    };

    this.Observer = Observer;
})();