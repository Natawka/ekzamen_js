$(function() {
	$('.grid').masonry({
		columnWidth: '.grid-sizer',
		itemSelector: '.grid-item',
		gutter: '.gutter-sizer',
		percentPosition: true
	});
});

$(function() {

	function successCall(obj) {
		var gridImgs = $('.grid-item img');
			var gridTitles = $('.grid-item h2');
			$('.grid-item h2').animate({
									opacity: 0,
									left: '10%'
								}, 400);
			$('.grid-item img').fadeOut(600);
			setTimeout(function() {
				for (var i = 0; i < gridImgs.length; i++) {
					gridImgs[i].setAttribute('src', obj.hits[i].webformatURL);
					gridTitles[i].innerHTML = obj.hits[i].tags;
				}
			}, 600);
			setTimeout(function() {
				$('.grid-item img').fadeIn(400);
				$('.grid-item h2').animate({
									opacity: 1,
									left: '50%'
								}, 600);
			}, 1000);
	}

	function crossDomainAjax (url, successCallback) {

	    if ('XDomainRequest' in window && window.XDomainRequest !== null) {

	        var xdr = new XDomainRequest();
	        xdr.open('get', url);
	        xdr.onload = function () {
	            var dom  = new ActiveXObject('Microsoft.XMLDOM'),
	                JSON = $.parseJSON(xdr.responseText);

	            dom.async = false;

	            if (JSON == null || typeof (JSON) == 'undefined') {
	                JSON = $.parseJSON(data.firstChild.textContent);
	            }

	            successCallback(JSON);
	        };

	        xdr.onerror = function() {
	            _result = false;  
	        };

	        xdr.send();
	    } else {
	        $.ajax({
	            url: url,
	            dataType: 'json',
	            async: false,
	            success: function (obj) {
	                successCallback(obj);
	            }
	        });
	    }
	}

	function getRandomImages() {
		var prot = (document.all && document.querySelector && !document.addEventListener) ? 'http' : 'https';
		crossDomainAjax( prot + '://pixabay.com/api/?key=2593977-12988caf15107fb1014806b9d&image_type=photo', function (obj) {
						var gridImgs = $('.grid-item img');
						var gridTitles = $('.grid-item h2');
						for (var i = 0; i < gridImgs.length; i++) {
							gridImgs[i].setAttribute('src', obj.hits[i].webformatURL);
							gridTitles[i].innerHTML = obj.hits[i].tags;
						}
					});
	}
	
	function getImages() {

		var quer = $('#query').val();
		var prot = (document.all && document.querySelector && !document.addEventListener) ? 'http' : 'https';
		crossDomainAjax(prot + '://pixabay.com/api/?key=2593977-12988caf15107fb1014806b9d&q='+quer+'&image_type=photo', successCall);
	}

	$('#go').on('click', getImages);
	$('#query').keydown(function(e) {
		if(e.keyCode == 13){
			getImages();
			return false;
		}
	});

	getRandomImages();
});

$(function() {
	$('.slide').mycarousel();
});