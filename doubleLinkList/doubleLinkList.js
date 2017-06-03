/**
 *	这是一个双向链表的实现
 *  具体用法与singleLinkList相同，参见singleLinkList.js与demo
 *  双向链表简化了删除操作无需访问前驱元，但是增加了一个指针空间，并使得插入和删除开销加倍
 */

(function() {
	var head = Symbol.for('head');

	function DoubleLinkList() {		// 生成双向链表的构造函数
		createEmptyList.call(this);
	}

	function createEmptyList() {		// 创建一个空的双向链表
		this.header = {
			data: head,		// head为一个symbol值，防止意外删除表头
			next: null,
			prev: null
		}
	}

	DoubleLinkList.prototype = {
		constructor: DoubleLinkList,

		insert: function(data, pos) {		// 在指定位置之后插入一个结点
			if (pos === null) {		// 不能在null后面插入结点
				return null;
			}

			var nextPos = pos.next,
				tmp = {
					data: data,
					prev: pos,
					next: nextPos
				};

			if (nextPos !== null) {		// 考虑pos为最后一个结点
				nextPos.prev = tmp;
			}

			pos.next = tmp;

			return tmp;
		},

		delete: function(data) {		// 删除具有指定数据的结点
			var pos = this.find(data);

			if (pos === null) {		// 如果不存在结点
				console.log('不存在含该数据的结点');
				return;
			}

			var prev = pos.prev,
				next = pos.next;

			prev.next = next;
			if (next !== null) {		// 如果该结点不是最后一个结点
				next.prev = prev;
			}

			prev = null;		//解除prev和next的引用，防止循环引用，垃圾不能及时回收
			next = null;

			return this;
		},

		find: function(data) {		// 查询具有指定数据的结点
			var tmp = this.header.next;

			while (tmp !== null && tmp.data !== data) {
				tmp = tmp.next;
			}

			return tmp;
		}
	};

	this.DoubleLinkList = DoubleLinkList;
})();