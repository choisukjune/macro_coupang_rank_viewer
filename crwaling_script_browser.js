window.__keyword__ = "약산성 토너";
window.maxPage = window.document.getElementsByClassName("btn-last")[0].innerText * 1
window.reqPage = 1;
window.tmp_cnt = 0;
window.htmlCnt = 1;
window.reqUrls = [
    "https://www.coupang.com/np/search?rocketAll=false&brand=&offerCondition=&filter=&availableDeliveryFilter=&filterType=&isPriceRange=false&priceRange=&minPrice=&maxPrice=&trcid=&traid=&filterSetByUser=true&channel=relate&backgroundColor=&component=&rating=0&sorter=scoreDesc&listSize=36&q=<!=KEYWORD=!>&page=<!=PAGE=!>"
]

var reqDataToLocalCrawlingServer = function( siteNm, type, p, data ){

    var xhr = new XMLHttpRequest();
    var data = {
        siteNm : siteNm
        , type : type
        , data : data
        , p : p
    };
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 201) {
        console.log( window.reqPage +  " / " + window.htmlCnt )
        ++window.reqPage;
        ++window.htmlCnt;
        getData( window.__keyword__ )
        } else {
        console.error(xhr.responseText);
        }
    };
    xhr.open('POST', 'http://localhost:8889/writeHtml');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(JSON.stringify( data )); // 데이터를 stringify해서 보냄
    
}


var getData = function( keyword ){
    if( window.reqUrls.length < window.tmp_cnt  )
    {
        console.log( "all - complete!")
        return
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status === 200 || xhr.status === 201)
        {
			var prefix = window.__keyword__.replace( /\s/gi, "_" );
            reqDataToLocalCrawlingServer( "coupang", "html",  prefix + "__"+ window.htmlCnt, xhr.responseText );
        } 
        else
        {
            console.error(xhr.responseText);
        }
    };

    if( window.maxPage < window.reqPage )
    {
        debugger;
        window.reqPage = 1
        ++window.tmp_cnt;
        //getData( window.__keyword__ )
    }
    else
    {
		var _keyword_ = keyword.replace( /\s/gi, "+" );
        var _reqUrl = window.reqUrls[ window.tmp_cnt ].replace( "<!=PAGE=!>", window.reqPage)
					.replace( "<!=KEYWORD=!>",  encodeURI( _keyword_ ) )
			console.log( _reqUrl )
		xhr.open('GET', _reqUrl )
        xhr.send();
    }
    
}

getData( window.__keyword__ )