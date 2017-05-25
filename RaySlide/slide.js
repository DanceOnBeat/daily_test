  var width = window.screen.width < window.innerWidth ? window.innerWidth : window.screen.width;	// 解决移动端图片不铺满问题

  $(function(){
      function RaySlide(opts){
        !!opts && this.init(opts);
      };

      RaySlide.prototype.play = function() {  // 启动轮播
        var self = this;
        if (self.timer !== null) {
          clearTimeout(self.timer);
        }
        self.timer = setTimeout(function() {
          self.next().play();
        }, Number(self.timeout + self.speed));
        self.stoped = false;
        return this;
      };

      RaySlide.prototype.stop = function() {  // 暂停轮播
        var self = this;
        if (!!self.timer) {
          clearTimeout(self.timer);
        }
        self.timer = null;
        self.stoped = true;
        return this;
      };

      RaySlide.prototype.next = function() {  // 播放下一张图片
        var self = this;
        self.currentIndex++;
        if (self.currentIndex == self.length) {
          self.doCarousel();    // 如果当前为最后一张图片，执行跑马灯效果
          self.next.call(self);
          return self;
        }
        self.go(self.currentIndex, false);
        return this;
      };

      RaySlide.prototype.doCarousel = function() {    // 最后一帧添加跑马灯效果
        var self = this;
        self.currentIndex = 1;
        self.pannelWrap.css('left', -width + 'px');
        return this;
      };

      RaySlide.prototype.go = function(index, isClicked) {    // 移动到指定索引
        var self = this;
        if (self.tabTimer !== null) {
          clearTimeout(self.tabTimer);
        }
        if (self.pannelWrap.is(':animated')) {
          self.pannelWrap.stop(true, false);
        }
        if (isClicked) {    // 通过点击的方式触发go
          self.pannelWrap.animate({left: -width * index + 'px'}, 1000, 'linear');
          self.changeTab(self.getTabIndex(index));
          return this;
        } else {    // 正常执行next触发go
          self.pannelWrap.animate({left: -width * index + 'px'}, self.speed, 'linear');
          self.tabTimer = setTimeout(
            self.highlightNav.bind(
              self, self.getTabIndex(self.currentIndex)
            ), self.speed
          );
        }
        return this;
      };

      RaySlide.prototype.getTabIndex = function(index) {    // 根据currentIndex获取正确的tabIndex
        var self = this;
        if (index === 0) {
          return self.tabs.length - 1;
        } else if (index > self.tabs.length) {
          return 0;
        } else {
          return index - 1;
        }
      };

      RaySlide.prototype.changeTab = function(index) {   // 是当前的nav高亮
        var self = this;
        self.tabs.removeClass('selected');
        self.tabs.eq(index).addClass('selected');
        return this;
      };

      RaySlide.prototype.init = function(opts) {  // 初始化方法
        var self = this;
        self.container = opts.container;
        self.height = opts.height;
        self.speed = opts.speed;
        self.timeout = opts.timeout;
        self.buildHTML().bindEvent();
        if (self.tabs.length > 0) {
          self.play();
        }
        return this;
      };

      RaySlide.prototype.buildHTML = function() {   // 将所有常用dom节点存储为到属性中
        var self = this;
        self.tabs = $('.tab-nav li');   // 所有tab的dom集合
        if (self.tabs.length > 0) {
          self.tabs.eq(0).addClass('selected');
          self.cloneNode();
        }
        self.pannelWrap = $('.tab-pannel-wrap');
        self.pannel = $('.tab-pannel');
        self.img = $('.tab-pannel img');
        self.currentIndex = 1;    // 跑马灯实际上是从第二张图片开始播放
        self.length = $('.tab-pannel').length;
        self.container = $(self.container);   // 容器id用作hook，TODO: 改进为可定制 
        self.pannelWrap.css({width: width * self.length + 'px', transition: 'none', left: -width + 'px', position: 'relative', overflow: 'hidden'});    // 跑马灯真实是从第二张图片开始播放
        self.pannel.css({width: width + 'px', float: 'left', height: self.height + 'px'});
        self.img.css({display: 'inline-block', width: '100%', height: '100%'});
        return this;
      };

      RaySlide.prototype.bindEvent = function() {     // 绑定事件
        var self = this;
        var _index = 0;
        self.container.delegate('.tab-nav li', 'click', function(e) {   // TODO：click，mouseover等事件改为可定制
          e.preventDefault();
          _index = $(e.currentTarget).index();
          self.go(_index + 1, true);
          self.currentIndex = _index + 1;
          if (!self.stoped) {
            self.stop().play();
          }
        });
        return this;
      };

      RaySlide.prototype.cloneNode = function() {   // 为实现跑马灯效果，收尾在初始化时添加节点
        $('.tab-pannel').first().clone(true).insertAfter($('.tab-pannel').last());
        $('.tab-pannel').last().prev().clone(true).insertBefore($('.tab-pannel').first());
      };

      $.fn.RaySlide = RaySlide;
    });

