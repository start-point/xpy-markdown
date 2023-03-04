/**
 * 的获取页面卷动的距离
 * @type {{getScroll(): {top, left}}}
 */
export const SCROLL = {
    getScroll({ele}: { ele: any }) {
            return {
                left: ele?.scrollLeft || 0,
                top: ele?.scrollTop || 0
            };
    },
    setScroll({ele, value}: { ele: any, value: number }){
        console.log(value,'valie')
        ele?.scrollTo(0,value);
    }
}

