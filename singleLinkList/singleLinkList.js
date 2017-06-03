/**
 *	这是一个单链表生成函数
 *	页面中通过调用new SingleLinkList()来生成单链表，并生成表头，可通过this.header来访问
 *	通过insert方法添加结点，该方法需传递结点的数据和上一个结点的引用，如第一个结点引用需传入this.header，然后返回所添加结点的引用
 *	通过delete方法删除某一结点，该方法返回删除后的链表
 *	通过find方法查询含某个数据的结点，返回查找到的结点，找不到返回null
 */
(function() {
	var head = Symbol.for('head');

	function SingleLinkList() {		// 创建链表的构造函数
		createEmptyList.call(this);
	}

	function createEmptyList() {	// 创建空链表，写成私有方法，防止外部调用
		this.header = {
			data: head,		// head为一个symbol值，防止意外删除了表头
			next: null
		};
	}

	SingleLinkList.prototype = {
		constructor: SingleLinkList,

		insert: function(data, pos) {		// 在指定位置之后插入一个结点
			if (pos === null) {		// 不能在null后面插入
				return null;
			}
			var obj = {
				data: data,
				next: pos.next
			};
			pos.next = obj;		// 将prev的next指针指向新创建的结点

			return obj;
		},

		delete: function(data) {		// 删除指定data的某个结点
			var previous = this.findPrevious(data),
				tmp;

			if (!this.isLast(previous)) {		// 如果previous不是最后一个结点，说明data存在
				tmp = previous.next
				previous.next = tmp.next;
			}

			return this;
		},

		isLast: function(pos) {		// 判断一个结点是否为最后一个结点
			if (pos === null) {
				return false;
			}
			return pos.next === null;
		},

		findPrevious: function(data) {		// 找出指定data的上一个结点，用于delete
			var tmp = this.header;

			while (tmp.next !== null && tmp.next.data !== data) {		// 从表头开始逐个遍历链表
				tmp = tmp.next;
			}

			return tmp;
		},

		find: function(data) {		// 找出指定data的某个结点
			var tmp = this.header.next;

			while (tmp !== null && tmp.data !== data) {		
				tmp = tmp.next;
			}

			return tmp;
		}
	};

	this.SingleLinkList = SingleLinkList;
})();
