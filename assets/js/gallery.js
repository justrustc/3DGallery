var gallery = {
    leftCls: 'box left',
    rightCls: 'box right',
    leftoutCls: 'box leftout',
    rightoutCls: 'box rightout',
    curCls:'box cur'
};
gallery.init = function ($box) {
    this.curIndex = 0;
    this.items = $box;
    this.count = $box.length;
    this.layout();
    this.setItems();
    this.loadEvents();
};
gallery.layout = function(){
    if(this.count < 3){
        $('#ctrl').hide();
        this.items.addClass('show');
        return false;
    }
    this.setItems();
    this.curItem.addClass('cur');
    this.leftItem.addClass('left');
    this.rightItem.addClass('right');
};
gallery.setItems = function () {
    var curIndex = this.curIndex,
        count = this.count,
        items = this.items,
        leftIndex = curIndex === 0 ? count - 1 : curIndex - 1,
        rightIndex = curIndex === count - 1 ? 0 : curIndex + 1;
    this.curItem = items.eq(curIndex);
    this.leftItem = items.eq(leftIndex);
    this.rightItem = items.eq(rightIndex);
    if(count>3){
        this.nextItem = rightIndex === count - 1 ? items.eq(0) : items.eq(rightIndex + 1);
        this.nextItem[0].className = this.rightoutCls;
        this.prevItem = leftIndex === 0 ? items.eq(count - 1) : items.eq(leftIndex - 1);
        this.prevItem[0].className = this.leftoutCls;
    }
};
gallery.loadEvents = function () {
    var self = this;
    $('#next').click(function () {
        self.nav('next');
    });
    $('#prev').click(function () {
        self.nav('prev');
    })
};

gallery.nav = function (opt) {
    if(opt === 'next'){
        this.curIndex = this.rightItem.index();
        this.curItem[0].className = this.leftCls;
        this.rightItem[0].className = this.curCls;
        if(this.nextItem){
            this.leftItem[0].className = this.leftoutCls;
            this.nextItem[0].className = this.rightCls;
        }
        this.setItems();
    }else{
        this.curIndex = this.leftItem.index();
        this.curItem[0].className = this.rightCls;
        this.leftItem[0].className = this.curCls;
        if(this.prevItem){
            this.rightItem[0].className = this.rightoutCls;
            this.prevItem[0].className = this.leftCls;
        }
        this.setItems();
    }


};

$(function(){
    gallery.init($('.box'));
});