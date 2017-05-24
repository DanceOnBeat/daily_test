(function() {

    function Class() {      // 定义一个超级父类
        !Class.initializing && this.init.call(this);
    }

    function _extend(props) {
        function subClass(opts) {
            !subClass.initializing && this.init && this.init.call(this, opts);
        }

        this.initializing = true;   // 借鉴John Resig的方法来避免额外的属性混入到prototype
        subClass.prototype = new this();
        subClass.prototype.constructor = subClass;
        this.initializing = false;

        for (var key in props) {    // 将props的属性混入到prototype
            if (Object.prototype.hasOwnProperty.call(props, key)) {
                subClass.prototype[key] = props[key];
            }
        }

        subClass.extend = _extend;      // 给子类也添加extend静态方法

        return subClass;
    }

    Class.extend = _extend;

    Class.prototype.init = function() {};

    this.Class = Class;     // 将Class赋值到全局变量Class上
})();