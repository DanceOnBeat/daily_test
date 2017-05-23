function mix () {
    var argArr = Array.prototype.slice.call(arguments),
        r = argArr[0],
        hasOwn = Object.prototype.hasOwnProperty,
        len = argArr.length,
        sArr,
        key,
        tmpR,
        slen = len - 3,
        ow = argArr[len - 2],
        d = argArr[len - 1];
    if (typeof ow !== 'boolean') {   // 检测倒数第二个参数是否为boolean类型
        slen++;
        ow = d;
    }
    if (typeof d !== 'boolean') {   // 检测最后一个参数是否为boolean类型
        slen = len - 1;
        ow = true;
        d = false;
    }
    if (slen < 1) {    // 若未传入要混入的对象
        return r;
    } else {
        sArr = argArr.slice(1, 1 + slen);
    }
    sArr.forEach(function(item, index, arr) {
        if (typeof item === 'object') {     // 要混入的对象必须为对象或数组
            for (key in item) {
                if (!ow && hasOwn.call(r, key)) {   // 如果ow为false，即不允许重写同名属性
                    continue;
                }
                if (d && getType(item[key]) === 'Object') {     // 若deep为true， 即允许深度mix
                    tmpR = getType(r[key]) === 'Object' ? r[key] : {};
                    r[key] = mix(tmpR, item[key], ow, d);   // 递归调用mix
                } else if (d && getType(item[key]) === 'Array') {
                    tmpR = getType(r[key]) === 'Array' ? r[key] : [];
                    r[key] = mix(tmpR, item[key], ow, d);
                } else {
                    r[key] = item[key];     // 若为值类型，直接赋值
                }
            }
        }
    });
    return r;
}

function getType (val) {    
    var str = Object.prototype.toString.call(val),  // 获取val的类型，如[object xxxx]
        type = str.slice(8, -1);
        return type
}
