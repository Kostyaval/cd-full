;
(function ($) {
	'use strict';

	
	$('a[href*=\\#]').on('click', function () {

		event.preventDefault();

		$('body').animate({
			scrollTop: $($(this).attr('href')).offset().top,
		}, 600)


	});

	//slick slider

	$(window).on('load', function () {

			
		$('.cd-works-slider').slick({
			dots: false,
			arrows: true,
			slide: '.cd-works-slide',
			slidesToShow: 1,
  			slidesToScroll: 1,
  			dots: true,
  			 responsive: [
			     {
			       breakpoint: 1024,
			       settings: {
			         slidesToShow: 1,
			         slidesToScroll: 1,
			         infinite: true,
			         dots: true
			       }
			     },
			     {
			       breakpoint: 600,
			       settings: {
			         slidesToShow: 1,
			         slidesToScroll: 1
			       }
			     },
			     {
			       breakpoint: 480,
			       settings: {
			         slidesToShow: 1,
			         slidesToScroll: 1
			       }
			     }
			     // You can unslick at a given breakpoint now by adding:
			     // settings: "unslick"
			     // instead of a settings object
			   ],
			prevArrow: '.ba-button--prev',
			nextArrow: '.ba-button--next'
		});
		


		// end of slick slider	

		// google map
		var map = null;

		function createMap() {

			var $markers = $('.cd-marker');

			map = new google.maps.Map($('.cd-map')[0], {
				zoom: 14,
				center: new google.maps.LatLng(0, 0),
				scrollwheel: false,
			});

			addMarkers($markers, map);
			centerMap($markers, map); 

		}

		function addMarkers($markers, map) {
			$markers.each(function () {
				var lat = $(this).data('lat');
				var lng = $(this).data('lng');
				var icon = $(this).data('icon');
				var marker = new google.maps.Marker({
					position: {
						lat: lat,
						lng: lng
					},
					map: map,
					icon: icon,
				});

				var content = $(this).find('.description').html();

				var infoWindow = new google.maps.InfoWindow({
					content: content,
				});

				marker.addListener('click', function () {
					infoWindow.open(map, marker);
				});

			});
		}

		function centerMap($markers, map) {

			if ($markers.length == 1) {

				var lat = $markers.data('lat');
				var lng = $markers.data('lng');
				var latLng = new google.maps.LatLng(lat, lng);
				map.setCenter(latLng);

			} else {

				var bounds = new google.maps.LatLngBounds();

				$markers.each(function () {
					var lat = $(this).data('lat');
					var lng = $(this).data('lng');
					var latLng = new google.maps.LatLng(lat, lng);
					bounds.extend(latLng);
				});

				map.fitBounds(bounds);

			}

		}

		createMap();

	});



})(jQuery);

// google map
