/**
 * ヘッダの表示
 */
const headerShow = () => {
    // クラス付与要素
    const headers = document.querySelectorAll('.l-header .navbar');
    // 監視対象要素
    const graharajas = document.querySelectorAll('.graharaja');
    // DOM to Array
    const graharajasArray = Array.prototype.slice.call(graharajas, 0);

    // options
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };
    /**
     * callback
     *
     * @param elms
     */
    const santaCrossHeader = (elms) => {
        const elmsArray = Array.prototype.slice.call(elms, 0);
        for (const elm of elmsArray) {
            // ブラウザ表示領域に対する対象要素の位置
            const elmRectCoor = elm.target.getBoundingClientRect();
            if ( 0 > elmRectCoor.bottom ) {
                // ブラウザ表示領域に対する対象要素の上端の位置 が ブラウザの表示領域 より上
                headers[0].classList.add('active');
            }
            else {
                headers[0].classList.remove('active');
            }
        }
    };
    // instance
    const observer = new IntersectionObserver(santaCrossHeader, options);
    // observe
    for (const graharaja of graharajasArray) {
        observer.observe(graharaja);
    }
    return observer;
};
/**
 * 章ごとのフェードイン表示
 *
 * @param clientHeight {Number} : ブラウザの高さ
 */
const parvasShow = (clientHeight) => {
    // 監視対象要素
    const parvas = document.querySelectorAll('.c-parva');
    // DOM to Array
    const parvasArray = Array.prototype.slice.call(parvas, 0);

    // options
    const options = {
        root: null,
        rootMargin: '0px 0px -12%',
        threshold: 0
    };
    /**
     * callback
     *
     * @param elms
     */
    const santaCross = (elms) => {
        const elmsArray = Array.prototype.slice.call(elms, 0);
        for (const elm of elmsArray) {
            // ブラウザ表示領域に対する対象要素の位置
            const elmRectCoor = elm.target.getBoundingClientRect();
            // if (elm.isIntersecting) { // この方法だと「交差しているか」なので対象要素が ブラウザ表示領域の上の場合反応しない(上にスクロールした際に表示される)
            if ( elmRectCoor.top < clientHeight ) {
                // ブラウザ表示領域に対する対象要素の位置 が ブラウザの高さ 未満 // この方法ならばブラウザの上にある要素も既に表示された状態になる
                elm.target.classList.add('active');
            }
        }
    };
    // instance
    const observer = new IntersectionObserver(santaCross, options);
    // observe
    for (const parva of parvasArray) {
        observer.observe(parva);
    }
    return observer;
};

window.addEventListener('load', () => {
    // ブラウザの高さ
    let clientHeight = document.documentElement.clientHeight;
    // ヘッダの表示
    let headerObserver = headerShow();
    // 章の表示
    let parvasObserver = parvasShow(clientHeight);
    window.addEventListener('resize', () => {
        // resize でブラウザの表示領域の高さが変動したら
        clientHeight = document.documentElement.clientHeight;
        // 一旦監視を止める
        headerObserver.disconnect();
        parvasObserver.disconnect();
        // 再度監視
        headerObserver = headerShow();
        parvasObserver = parvasShow(clientHeight);
    });
});
