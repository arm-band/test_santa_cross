class Ksanae {
    /**
     * kurenai: Intersection Observer API 用関数
     *
     * @params selectorObserved {String} : 監視対象要素のセレクタ
     * @params callback {Function} : Intersection Observer API でコールバックとして呼ばれる処理
     * @params options {Object} : Intersection Observer API に渡すオプション
     * @params selectorAddClass {String} : クラスを付与する要素のセレクタ
     *
     * @return observer {Object} : Intersection Observer API のインスタンス
     */
    kurenai(selectorObserved, callback, options, selectorAddClass = '') {
        // クラス付与要素
        let elmAddClass;
        if (selectorAddClass.length > 0) {
            elmAddClass = document.querySelectorAll(selectorAddClass);
        }
        // 監視対象要素
        const elmsObserved = document.querySelectorAll(selectorObserved);
        // DOM to Array
        const elmsObservedArray = Array.prototype.slice.call(elmsObserved, 0);
        // instance
        const observer = new IntersectionObserver(callback, options);
        // observe
        for (const elmObserved of elmsObservedArray) {
            observer.observe(elmObserved);
        }
        return observer;
    };
    irome() {
        const selectorObserved = '';
        const callback = () => {};
        const options = {};
        const selectorAddClass = '';
//        window.addEventListener('load', () => {
            return this.kurenai(selectorObserved, callback, options, selectorAddClass);
//        });
    }
    usuyo(observer) {
//        window.addEventListener('resize', () => {
            // 一旦監視を止める
            observer.disconnect();
            // 再度監視
            return this.irome();
//        });
    }
}
/**
 * ヘッダの表示
 */
class HeaderKasane extends Ksanae {
    irome() {
        // クラス付与要素
        const headers = '.l-header .navbar';
        const elmHeaders = document.querySelectorAll(headers);
        // 監視対象要素
        const graharajas = '.graharaja';
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
                    elmHeaders[0].classList.add('active');
                }
                else {
                    elmHeaders[0].classList.remove('active');
                }
            }
        };
        return this.kurenai(graharajas, santaCrossHeader, options, headers);
    }
}

/**
 * 章ごとのフェードイン表示
 */
class ParvasKasane extends Ksanae {
    irome() {
        // ブラウザの高さ
        const clientHeight = document.documentElement.clientHeight;
        // 監視対象要素
        const parvas = '.c-parva';
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
        return this.kurenai(parvas, santaCross, options);
    }
}

window.addEventListener('load', () => {
    const headerKasaneInstance = new HeaderKasane();
    const parvasKasaneInstance = new ParvasKasane();
    // ヘッダの表示
    headerKasaneInstance.irome();
    // 章の表示
    parvasKasaneInstance.irome();
    window.addEventListener('resize', () => {
        headerKasaneInstance.usuyo();
        parvasKasaneInstance.usuyo();
    });
});
