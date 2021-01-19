function randomInteger(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

function showhide(divid, state) {
	document.getElementById(divid).style.display = state;
}

function email(emname, domain) {
	var email = 'mailto:' + emname + '@' + domain;
	document.location = email;
}

function sendGet(orederNumber) {
	//PROMO
	input_promo = jQuery('#promo_code').val();
	if (promo.hasOwnProperty(input_promo)) {
		var products = JSON.parse(promo[input_promo]['products']);
		if (products) {
			//discount for some products
			var product_name = jQuery('.line-block')
				.find('.active')
				.find('.lline')
				.html();
			if (products.includes(product_name)) {
				discount = promo[input_promo]['discount'];
			} else {
				discount = 0;
			}
		} else {
			//discount for all products
			discount = promo[input_promo]['discount'];
		}
	} else {
		//prpmokod ne nayden
		discount = 0;
	}
	//PROMO END

	var userEmail = jQuery('#custmail').val();
	var userPhone = jQuery('#custphone').val();
	var productName = jQuery('#procheck').val();
	var productCol = jQuery('#col').val();
	var productPrice = jQuery('.line-block')
		.find('.active')
		.find('span')
		.text();
	if (productPrice == '') {
		productPrice = 0;
	}

	//CHECK FILEDS ######################################################################################

	var custname = jQuery('#custname').val();
	var custmail = jQuery('#custmail').val();
	var custphone = jQuery('#custphone').val();
	//Check scan file
	var needscan = jQuery('.line-block > .active').attr('data-scan');
	var custfile = jQuery('#scanfile').get(0).files[0];
	//Check scan file END

	//validate form fileds
	var validate = true;
	$('.error').remove();
	if (custname.length < 2) {
		validate = false;
		// $('#custname').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, заполните обязательное поле.</span>');
	}
	if (custphone.length < 9) {
		validate = false;
		// $('#custphone').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, заполните обязательное поле.</span>');
	}
	if (custmail.length < 6) {
		validate = false;
		//$('#custmail').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, заполните обязательное поле.</span>');
	} else {
		var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
		var validEmail = custmail.search(pattern);
		if (validEmail != 0) {
			validate = false;
			//$('#custmail').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, введите валидный email.</span>');
		}
	}
	
	//Check scan file
	if(needscan == 'yes') {
		if(custfile){
			if(custfile.size < 1024){
				validate = false;
				//jQuery('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Скан-копия не соответствует требованиям! Пожалуйста, прикрепите реальную скан-копию документа.</span>');
			}
			if(custfile.size > 12582912){
				validate = false;
				//jQuery('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Файл слишком большой! Размер скан-копии не должен превышать 12 Мб.</span>');
			}
		}else{
			validate = false;
			//jQuery('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, прикерпите скан-копию документа.</span>');
		}
	}
	//Check scan file END
	//validate form fileds END

	//CHECK FILEDS END ##################################################################################

	if (validate) {
		//PROMO
		//HERE PRICE WEN CHENGE PRODUCT
		productPrice = productPrice - (productPrice / 100) * discount; //primenim skidku
		//PROMO END

		if (typeof productPrice == 'string')
			productPrice = productPrice.replace(/\s+/g, '');
		if (/^\d+$/.test(productPrice) == false) {
			productPrice = 0;
		} else {
			productPrice = parseInt(productPrice);
		}
		var amount = productPrice * productCol;

		$.ajax({
			url: 'https://www.rhino-3d.ru/wp-admin/admin-ajax.php',

			type: 'POST',
			data:
				'action=get&email=' +
				userEmail +
				'&telephone=' +
				userPhone +
				'&itemName=' +
				productName +
				'&itemValue=' +
				productCol +
				'&itemAmount=' +
				amount +
				'00&itemPrice=' +
				productPrice +
				'00&itemCode=' +
				orederNumber,
			success: function (data) {
				var link = data.slice(0, -1);
				$(location).attr('href', link);
				//console.log(data);
			},
			error: function (error) {
				console.log(data);
			},
		});
	}
}

jQuery(document).ready(function () {
	jQuery('#cse-search-box .searchBox')
		.focus(function () {
			jQuery(this)
				.css('cursor', 'auto')
				.css('color', 'black')
				.animate(
					{
						width: '15em',
						marginBottom: '1.8em',
						borderColor: 'black',
					},
					150,
				)
				.val('');
		})
		.blur(function () {
			jQuery(this)
				.animate(
					{
						borderColor: 'white',
						width: '',
						marginBottom: '0px',
					},
					150,
				)
				.css('cursor', 'pointer');
		});
	jQuery('#cse-search-box').bind('submit', function (e) {
		jQuery('#q').val(jQuery('#ss').val());
	});
	if ($.ui) {
		jQuery(
			'#accordion, #accordion2a, #accordion3a, #accordion13, #accordion12, #accordion11, #accordion10, #accordion9, #accordion0, #accordion1, #accordion2, #accordion3, #accordion4, #accordion5, #accordion6, #accordion7',
		).accordion({
			header: 'h3',
			autoHeight: false,
			navigation: true,
			collapsible: true,
		});
		jQuery('#printit a').click(function () {
			jQuery(
				'#accordion, #accordion2a, #accordion3a, #accordion13, #accordion12, #accordion11, #accordion10, #accordion9, #accordion0, #accordion1, #accordion2, #accordion3, #accordion4, #accordion5, #accordion6, #accordion7',
			).accordion('destroy');
			jQuery('#tabs').tabs('destroy');
			window.print();
			location.reload();
			jQuery('#printit a').click(function () {
				location.reload();
			});
			return false;
		});
		jQuery('#tabs').tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
		jQuery('#tabs li')
			.removeClass('ui-corner-top')
			.addClass('ui-corner-left');
		jQuery('#accordionResizer').resizable({
			minHeight: 140,
			resize: function () {
				jQuery('#accordion').accordion('resize');
				jQuery('#tabs')
					.tabs()
					.addClass('ui-tabs-vertical ui-helper-clearfix');
				jQuery('#tabs li')
					.removeClass('ui-corner-top')
					.addClass('ui-corner-left');
				jQuery('#dialog_link, ul#icons li').hover(
					function () {
						jQuery(this).addClass('ui-state-hover');
					},
					function () {
						jQuery(this).removeClass('ui-state-hover');
					},
				);
			},
		});
	}
	if (jQuery().slides) {
		jQuery('#slides').slides({
			preload: true,
			preloadImage: '/en/images/loading.gif',
			play: 10000,
			pause: 10000,
			hoverPause: false,
			animationStart: function (current) {
				jQuery('.caption').animate(
					{
						bottom: -100,
						opacity: 0.1,
					},
					100,
				);
				jQuery('.caption_l').animate(
					{
						bottom: -100,
						opacity: 0.1,
					},
					100,
				);
				if (window.console && console.log) {
					console.log('animationStart on slide: ', current);
				}
			},
			animationComplete: function (current) {
				jQuery('.caption').animate(
					{
						bottom: 0,
						opacity: 1.0,
					},
					400,
				);
				jQuery('.caption_l').animate(
					{
						bottom: 0,
						opacity: 1.0,
					},
					400,
				);
				if (window.console && console.log) {
					console.log('animationComplete on slide: ', current);
				}
			},
			slidesLoaded: function () {
				jQuery('.caption').animate(
					{
						bottom: 0,
					},
					400,
				);
			},
		});
	}
	jQuery('#download-file-options-list').hide();
	jQuery('#download-select-files-link').click(function () {
		jQuery('#download-file-options-list').slideToggle(250);
	});
	jQuery('.download_link').click(function () {
		jQuery('#post-download-instructions').slideDown(250);
	});
	jQuery('#footer_click_target').click(function () {
		var $footer_detail = jQuery('#footer-detail');
		if ($footer_detail[0]) {
			$footer_detail.slideToggle(250);
			jQuery('#footer-nodetail').slideToggle(250);
		} else {
			var locale = jQuery(this).attr('footer_locale');
			jQuery('#footer-detail-placeholder').load(
				'/' + locale + '/footer',
				function () {
					jQuery('#footer-nodetail').slideToggle(250);
					jQuery('#footer-detail').slideToggle(250);
				},
			);
		}
		return false;
	});
	jQuery('#dialog_link, ul#icons li').hover(
		function () {
			jQuery(this).addClass('ui-state-hover');
		},
		function () {
			jQuery(this).removeClass('ui-state-hover');
		},
	);
});
jQuery(
	'<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="/wp-content/themes/rhino/images/new/r1.png"></div><div class="quantity-button quantity-down"><img src="/wp-content/themes/rhino/images/new/r2.png"></div></div>',
).insertAfter('.quantity input');
jQuery('.quantity').each(function () {
	var clc_price;
	var clc_amount;
	var clc_name;

	var spinner = jQuery(this),
		input = spinner.find('input[type="number"]'),
		btnUp = spinner.find('.quantity-up'),
		btnDown = spinner.find('.quantity-down'),
		min = input.attr('min'),
		max = input.attr('max');

	//PROMO
	jQuery('#promo_btn').click(function () {
		//PROMO
		input_promo = jQuery('#promo_code').val();
		if (promo.hasOwnProperty(input_promo)) {
			var products = JSON.parse(promo[input_promo]['products']);
			if (products) {
				//discount for some products
				var product_name = jQuery('.line-block')
					.find('.active')
					.find('.lline')
					.html();
				if (products.includes(product_name)) {
					discount = promo[input_promo]['discount'];
				} else {
					discount = 0;
				}
			} else {
				//discount for all products
				discount = promo[input_promo]['discount'];
			}
		} else {
			//prpmokod ne nayden
			discount = 0;
		}
		//PROMO END

		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue;
		}
		spinner.find('input').val(newVal);
		spinner.find('input').trigger('change');
		var sum = jQuery('.line-block').find('.active').find('span').text();
		if (sum == '') {
			sum = 0;
		}

		if (typeof sum == 'string') sum = sum.replace(/\s+/g, '');
		if (/^\d+$/.test(sum) == false) {
			sum = 0;
		} else {
			sum = parseInt(sum);
		}

		//PROMO
		//HERE CHENGE PRICE VHEN CLICK UP
		sum = sum - (sum / 100) * discount; //primenim skidku
		//PROMO END

		var col = jQuery('#col').val();
		jQuery('#sumcheck').val(sum * col + ' p.');
		clc_price = sum * col;

		var clc_amount = clc_price;
		var clc_name =
			jQuery('#procheck').val() +
			'/ ' +
			jQuery('#typecheck').val() +
			'. Количество: ' +
			col;
		var ordernumberrand = randomInteger(100000, 999999);

		jQuery('#api_button_buy').attr('data-amount', clc_amount);
		jQuery('#api_button_buy').attr('data-description', clc_name);

		jQuery('#api_button_buy').attr(
			'data-string',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		/*
		jQuery('#api_button_buy').attr(
			'onclick',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		*/
	});

	//TRY CHANGE
	jQuery('#promo_code').change(function () {
		//PROMO
		input_promo = jQuery('#promo_code').val();
		if (promo.hasOwnProperty(input_promo)) {
			var products = JSON.parse(promo[input_promo]['products']);
			if (products) {
				//discount for some products
				var product_name = jQuery('.line-block')
					.find('.active')
					.find('.lline')
					.html();
				if (products.includes(product_name)) {
					discount = promo[input_promo]['discount'];
				} else {
					discount = 0;
				}
			} else {
				//discount for all products
				discount = promo[input_promo]['discount'];
			}
		} else {
			//prpmokod ne nayden
			discount = 0;
		}
		//PROMO END

		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue;
		}
		spinner.find('input').val(newVal);
		spinner.find('input').trigger('change');
		var sum = jQuery('.line-block').find('.active').find('span').text();
		if (sum == '') {
			sum = 0;
		}

		if (typeof sum == 'string') sum = sum.replace(/\s+/g, '');
		if (/^\d+$/.test(sum) == false) {
			sum = 0;
		} else {
			sum = parseInt(sum);
		}

		//PROMO
		//HERE CHENGE PRICE VHEN CLICK UP
		sum = sum - (sum / 100) * discount; //primenim skidku
		//PROMO END

		var col = jQuery('#col').val();
		jQuery('#sumcheck').val(sum * col + ' p.');
		clc_price = sum * col;

		var clc_amount = clc_price;
		var clc_name =
			jQuery('#procheck').val() +
			'/ ' +
			jQuery('#typecheck').val() +
			'. Количество: ' +
			col;
		var ordernumberrand = randomInteger(100000, 999999);

		jQuery('#api_button_buy').attr('data-amount', clc_amount);
		jQuery('#api_button_buy').attr('data-description', clc_name);

		jQuery('#api_button_buy').attr(
			'data-string',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		/*
		jQuery('#api_button_buy').attr(
			'onclick',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		*/
	});

	//TRAY keypress
	jQuery('#promo_code').keyup(function () {
		//PROMO
		input_promo = jQuery('#promo_code').val();
		if (promo.hasOwnProperty(input_promo)) {
			var products = JSON.parse(promo[input_promo]['products']);
			if (products) {
				//discount for some products
				var product_name = jQuery('.line-block')
					.find('.active')
					.find('.lline')
					.html();
				if (products.includes(product_name)) {
					discount = promo[input_promo]['discount'];
				} else {
					discount = 0;
				}
			} else {
				//discount for all products
				discount = promo[input_promo]['discount'];
			}
		} else {
			//prpmokod ne nayden
			discount = 0;
		}
		//PROMO END

		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue;
		}
		spinner.find('input').val(newVal);
		spinner.find('input').trigger('change');
		var sum = jQuery('.line-block').find('.active').find('span').text();
		if (sum == '') {
			sum = 0;
		}

		if (typeof sum == 'string') sum = sum.replace(/\s+/g, '');
		if (/^\d+$/.test(sum) == false) {
			sum = 0;
		} else {
			sum = parseInt(sum);
		}

		//PROMO
		//HERE CHENGE PRICE VHEN CLICK UP
		sum = sum - (sum / 100) * discount; //primenim skidku
		//PROMO END

		var col = jQuery('#col').val();
		jQuery('#sumcheck').val(sum * col + ' p.');
		clc_price = sum * col;

		var clc_amount = clc_price;
		var clc_name =
			jQuery('#procheck').val() +
			'/ ' +
			jQuery('#typecheck').val() +
			'. Количество: ' +
			col;
		var ordernumberrand = randomInteger(100000, 999999);

		jQuery('#api_button_buy').attr('data-amount', clc_amount);
		jQuery('#api_button_buy').attr('data-description', clc_name);

		jQuery('#api_button_buy').attr(
			'data-string',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		/*
		jQuery('#api_button_buy').attr(
			'onclick',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		*/
	});

	//PROMO END

	btnUp.click(function () {
		//PROMO
		input_promo = jQuery('#promo_code').val();
		if (promo.hasOwnProperty(input_promo)) {
			var products = JSON.parse(promo[input_promo]['products']);
			if (products) {
				//discount for some products
				var product_name = jQuery('.line-block')
					.find('.active')
					.find('.lline')
					.html();
				if (products.includes(product_name)) {
					discount = promo[input_promo]['discount'];
				} else {
					discount = 0;
				}
			} else {
				//discount for all products
				discount = promo[input_promo]['discount'];
			}
		} else {
			//prpmokod ne nayden
			discount = 0;
		}
		//PROMO END

		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue + 1;
		}
		spinner.find('input').val(newVal);
		spinner.find('input').trigger('change');
		var sum = jQuery('.line-block').find('.active').find('span').text();
		if (sum == '') {
			sum = 0;
		}

		if (typeof sum == 'string') sum = sum.replace(/\s+/g, '');
		if (/^\d+$/.test(sum) == false) {
			sum = 0;
		} else {
			sum = parseInt(sum);
		}

		//PROMO
		//HERE CHENGE PRICE VHEN CLICK UP
		sum = sum - (sum / 100) * discount; //primenim skidku
		//PROMO END

		var col = jQuery('#col').val();



		jQuery('#sumcheck').val(sum * col + ' p.');
		//NDS
		var ndssum = sum * 1.2;
		var oplata_type = jQuery('#oplata').val();
		if (oplata_type == 'cashless') {
			jQuery('#ndscheck').val(ndssum * col + ' p.');
			jQuery('.nds').removeClass('nds-hide');
			clc_price = ndssum * col;
		}else{
			jQuery('#ndscheck').val('');
			jQuery('.nds').addClass('nds-hide');
			clc_price = sum * col;
		}
		//NDS END



		var clc_amount = clc_price;
		var clc_name =
			jQuery('#procheck').val() +
			'/ ' +
			jQuery('#typecheck').val() +
			'. Количество: ' +
			col;
		var ordernumberrand = randomInteger(100000, 999999);

		jQuery('#api_button_buy').attr('data-amount', clc_amount);
		jQuery('#api_button_buy').attr('data-description', clc_name);

		jQuery('#api_button_buy').attr(
			'data-string',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		/*
		jQuery('#api_button_buy').attr(
			'onclick',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		*/
	});

	btnDown.click(function () {
		//PROMO
		input_promo = jQuery('#promo_code').val();
		if (promo.hasOwnProperty(input_promo)) {
			var products = JSON.parse(promo[input_promo]['products']);
			if (products) {
				//discount for some products
				var product_name = jQuery('.line-block')
					.find('.active')
					.find('.lline')
					.html();
				if (products.includes(product_name)) {
					discount = promo[input_promo]['discount'];
				} else {
					discount = 0;
				}
			} else {
				//discount for all products
				discount = promo[input_promo]['discount'];
			}
		} else {
			//prpmokod ne nayden
			discount = 0;
		}
		//PROMO END

		var oldValue = parseFloat(input.val());
		if (oldValue <= min) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue - 1;
		}
		spinner.find('input').val(newVal);
		spinner.find('input').trigger('change');
		var sum = jQuery('.line-block').find('.active').find('span').text();
		if (sum == '') {
			sum = 0;
		}

		//PROMO
		//HERE CHENGE PRICE VHEN CLICK DOVN
		sum = sum - (sum / 100) * discount; //primenim skidku
		//PROMO END

		if (typeof sum == 'string') sum = sum.replace(/\s+/g, '');
		if (/^\d+$/.test(sum) == false) {
			sum = 0;
		} else {
			sum = parseInt(sum);
		}

		var col = jQuery('#col').val();

		jQuery('#sumcheck').val(sum * col + ' p.');

		//NDS
		var ndssum = sum * 1.2;
		var oplata_type = jQuery('#oplata').val();
		if (oplata_type == 'cashless') {
			jQuery('#ndscheck').val(ndssum * col + ' p.');
			jQuery('.nds').removeClass('nds-hide');
			clc_price = ndssum * col;
		}else{
			jQuery('#ndscheck').val('');
			jQuery('.nds').addClass('nds-hide');
			clc_price = sum * col;
		}
		//NDS END

		var clc_amount = clc_price;
		var clc_name =
			jQuery('#procheck').val() +
			'/ ' +
			jQuery('#typecheck').val() +
			'. Количество: ' +
			col;
		var ordernumberrand = randomInteger(100000, 999999);

		jQuery('#api_button_buy').attr('data-amount', clc_amount);
		jQuery('#api_button_buy').attr('data-description', clc_name);

		jQuery('#api_button_buy').attr(
			'data-string',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		/*
		jQuery('#api_button_buy').attr(
			'onclick',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		*/
	});
});

jQuery(document).ready(function () {
	jQuery('#oplata').on('change', () => {
		var oplata_type = jQuery('#oplata').val();

		//let value = jQuery('#oplata option:selected').text();
		if (oplata_type == 'credit') {
			jQuery('#raswrapper').show(200);
			jQuery('.contact-form').hide(200);
		} else {
			jQuery('#raswrapper').hide(200);
		}

		if (oplata_type == 'cashless') {
			jQuery('.nds').removeClass('nds-hide');
			var sumcheck_val = jQuery('#sumcheck').val();
			var sumcheck_price = sumcheck_val.replace(/[^\d;]/g, '');
			var nds_price = sumcheck_price * 1.2;
			jQuery('#ndscheck').val(nds_price + ' р.');
		}else{
			jQuery('#ndscheck').val('');
			jQuery('.nds').addClass('nds-hide');
		}
	});

	jQuery('#cf_buy').click(function () {
		jQuery('#cf_buy').hide();
		jQuery('.contact-form').show(500);
	});

	function handler() {
		alert('test');
	}

	jQuery('.line-block .line').click(function () {
		//PROMO
		input_promo = jQuery('#promo_code').val();
		if (promo.hasOwnProperty(input_promo)) {
			var products = JSON.parse(promo[input_promo]['products']);
			if (products) {
				//discount for some products
				//var product_name = jQuery('.line-block').find('.active').find('.lline').html();
				var product_name = jQuery(this).find('.lline').html();
				if (products.includes(product_name)) {
					discount = promo[input_promo]['discount'];
				} else {
					discount = 0;
				}
			} else {
				//discount for all products
				discount = promo[input_promo]['discount'];
			}
		} else {
			//prpmokod ne nayden
			discount = 0;
		}
		//PROMO END

		var oplata_types = jQuery('#oplata').val();
		if (oplata_types != 'card') {
			//jQuery('#api_button_buy').hide();
			//jQuery('#rbkbutton').hide();
			//jQuery('#rbkbutton').css({'display':'none'});
		}
		if (oplata_types == 'card') {
			jQuery('#rbkbutton').show();
			//jQuery('#send_button').hide();
		}
		if (oplata_types == 'card') {
			jQuery('#rbkbutton').show();
			//jQuery('#send_button').hide();
		}

		if (oplata_types == 'cashless') {
			// jQuery('#cf_buy').show();
			jQuery('#rbkbutton').hide();
			jQuery('.contact-form').show();
			jQuery('.contact-form .btn').html('Заказать');
			jQuery('.dop').html('Реквизиты организации');
			jQuery('textarea#requizity').val(
				'Название: \nЮр. адрес: \nДоп. информация: ',
			);
			jQuery('.nds').removeClass('nds-hide');
		}else{
			jQuery('.nds').addClass('nds-hide');
		}

		if (oplata_types == 'credit') {
			// jQuery('#cf_buy').show();
			jQuery('#rbkbutton').hide();
			jQuery('#raswrapper').show();
		}
		var scanneed = jQuery(this).attr('data-scan');
		if (scanneed == 'yes') {
			jQuery('#needscan').show();
		} else {
			jQuery('#needscan').hide();
		}
		jQuery('.line-block .line').removeClass('active');
		jQuery(this).addClass('active');
		var product = jQuery(this).children('.lline').text();
		var price = jQuery(this).find('span').text();
		price = price.replace(/\s+/g, '');
		price = parseInt(price);

		//PROMO
		//HERE PRICE WEN CHENGE PRODUCT
		price = price - (price / 100) * discount; //primenim skidku
		//PROMO END

		var col = jQuery('#col').val();
		var sum = price * col;

		if (/^\d+$/.test(sum) == false) sum = 0;
		jQuery('#procheck').val(product);
		jQuery('#sumcheck').val(sum + ' p.');
		if (oplata_types == 'cashless') {
			var ndssum = sum * 1.2;
			jQuery('#ndscheck').val(ndssum + ' p.');
		}else{
			jQuery('#ndscheck').val('');
		}

		var type = jQuery(this).attr('data-type');
		var link = jQuery(this).attr('data-link');
		jQuery('#hid').val(link);
		if (type == 1) {
			jQuery('#typecheck').val('Одиночная лицензия');
		}
		if (type == 2) {
			jQuery('#typecheck').val('Пакеты лицензий');
		}
		if (type == 3) {
			jQuery('#typecheck').val('Обновления');
		}
		if (type == 4) {
			jQuery('#typecheck').val('Академическая лицензия');
		}
		var clc_amount = sum;
		var clc_name =
			jQuery('#procheck').val() +
			'/ ' +
			jQuery('#typecheck').val() +
			'. Количество: ' +
			col;
		var ordernumberrand = randomInteger(100000, 999999);

		jQuery('#api_button_buy').attr('data-amount', clc_amount);
		jQuery('#api_button_buy').attr('data-description', clc_name);

		jQuery('#api_button_buy').attr(
			'data-string',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
				"'},function(order) { showSuccessfulPurchase(order) },function(order) { showFailurefulPurchase(order) })",
		);
		/*
		jQuery('#api_button_buy').attr(
			'onclick',
			'ipayCheckout({amount: ' +
				clc_amount +
				",currency:'RUB',order_number:'" +
				ordernumberrand +
				"',description: '" +
				clc_name +
			"'}, function(order) { showSuccessfulPurchase(order) }, function(order) { showFailurefulPurchase(order) })",
		);
		*/
	});

	jQuery('.option-download-link').click(function () {
		jQuery('.option-download img').addClass('animation');
		jQuery('.popup').show(500);
		setTimeout(function () {
			jQuery('.option-download img').removeClass('animation');
		}, 500);
	});
	jQuery('.not').click(function () {
		jQuery('.option-download img').addClass('animation');
		jQuery('.popup').hide(500);
		setTimeout(function () {
			jQuery('.option-download img').removeClass('animation');
		}, 500);
	});
	jQuery('.ok').click(function () {
		var lang = jQuery('#lang option:selected').val();
		var os = jQuery('#os option:selected').val();
		var sumpar = lang + '' + os;
		var lll = jQuery('.link-notshow .ccc' + sumpar).text();
		jQuery('.btn.large').attr('href', lll);
		jQuery('.option-download img').addClass('animation');
		jQuery('.popup').hide(500);
		setTimeout(function () {
			jQuery('.option-download img').removeClass('animation');
		}, 500);
	});

	jQuery('.check button').click(function () {
		var op = jQuery('#oplata option:selected').text();
		setTimeout(function () {
			if (op == 'Онлайн оплата VISA') {
				window.location.href = '/638-2/';
			}
		}, 800);
	});

	jQuery('#oplata').on('change', function () {
		//alert( this.value );
		if (this.value == 'card') {
			jQuery('.buy-check').html('Купить');
			jQuery('.contact-form .btn').html('Оплатить');
			jQuery('.dop').html('Дополнительная информация');
			jQuery('textarea').val('');
			jQuery('#oplata_hidden').val(1);
		} else {
			jQuery('.buy-check').html('Оформить заказ');
			jQuery('.contact-form .btn').html('Заказать');
			jQuery('.dop').html('Реквизиты организации');
			jQuery('textarea#requizity').val(
				'Название: \nЮр. адрес: \nДоп. информация: ',
			);
			jQuery('#oplata_hidden').val(2);
		}
	});

	jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false,
	});

	var allPanels = jQuery('.accordion > .tab_ac > .right > dd').hide();

	jQuery('.accordion > .tab_ac > .right > dt > a').click(function () {
		$target = jQuery(this).parent().parent().parent();

		if ($target.hasClass('activetab')) {
			$target.removeClass('activetab');
			jQuery(this).parent().next().slideUp();
		} else {
			jQuery('.accordion .tab_ac').removeClass('activetab');
			allPanels.slideUp();
			$target.addClass('activetab');
			jQuery(this).parent().next().slideDown();
		}
		return false;
	});
	jQuery('.popups').magnificPopup({
		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				this.st.mainClass = this.st.el.attr('data-effect');
			},
		},
		midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});
	jQuery(document).on('click', '.notsend', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	jQuery('#oksend .notsend').click(function () {
		jQuery('#oksend').hide();
		jQuery('#forn_p').show();
	});

	document.addEventListener(
		'wpcf7mailsent',
		function (event) {
			var value_loc = document.getElementById('hid').value;
			var oplata_hidden = document.getElementById('oplata_hidden').value;
			if (oplata_hidden == 1) {
				location = value_loc;
			}
		},
		false,
	);

	if (jQuery('#oplata_zakaz').val() == 1) {
		jQuery('select#oplata option[value="cashless"]').prop('selected', true);
		jQuery('.buy-check').html('Оформить заказ');
		jQuery('.contact-form .btn').html('Заказать');
		jQuery('.dop').html('Реквизиты организации');
		jQuery('textarea#requizity').val(
			'Название: \nЮр. адрес: \nДоп. информация: ',
		);
		jQuery('#oplata_hidden').val(2);
	}

	// =============================== Форма загрузки ==============================================

	jQuery('.download-wrap__button-download').click(function () {
		jQuery('.download-wrap__popup').toggle();
		jQuery('.download-wrap__email-popup').val('');
	});

	jQuery('.download-wrap__popup-not').click(function () {
		jQuery('.download-wrap__popup').hide();
		jQuery('.download-wrap__email-popup').val('');
	});

	jQuery('.download-wrap__popup-close').click(function () {
		jQuery('.download-wrap__popup-send').hide();
		jQuery('.download-wrap__popup-expired').hide();
		jQuery('.download-wrap__popup-send-email').hide();
		jQuery('.registration-wrap__send').hide();
		location.reload();
	});

	//Функция проверки email-а
	function validateEmail($email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailReg.test($email);
	}

	//Функция проверки телефона
	function validateTel($phone) {
		var telReg = /^[\d\(\)\ \+\-]{5,20}\d$/;
		return telReg.test($phone);
	}

	// При наведении на поле выберите ОС - крутится шестеренка
	jQuery('select[name=link]').hover(
		function () {
			jQuery('.loader').addClass('rot'); //loader - класс картинки шестеренки, при добавлении класса rot - появляется анимация
		},
		function () {
			jQuery('.loader').removeClass('rot');
		},
	);

	jQuery('input[name=name]').hover(
		function () {
			jQuery('.loader').addClass('rot'); //loader - класс картинки шестеренки, при добавлении класса rot - появляется анимация
		},
		function () {
			jQuery('.loader').removeClass('rot');
		},
	);

	jQuery('select[name=area]').hover(
		function () {
			jQuery('.loader').addClass('rot'); //loader - класс картинки шестеренки, при добавлении класса rot - появляется анимация
		},
		function () {
			jQuery('.loader').removeClass('rot');
		},
	);

	jQuery('input[name=phone]').hover(
		function () {
			jQuery('.loader').addClass('rot'); //loader - класс картинки шестеренки, при добавлении класса rot - появляется анимация
		},
		function () {
			jQuery('.loader').removeClass('rot');
		},
	);

	jQuery('.download-wrap__email-popup').hover(
		function () {
			jQuery('.loader').addClass('rot'); //loader - класс картинки шестеренки, при добавлении класса rot - появляется анимация
		},
		function () {
			jQuery('.loader').removeClass('rot');
		},
	);

jQuery('.download-wrap__popup-ok').on('click', function (event) {
		event.preventDefault();
		var link = jQuery('select[name=link]').val();
		var email = jQuery('.download-wrap__email-popup').val();
		var linkon = jQuery('select[name=link] option:selected').attr('linkon');
		var name = jQuery("input[name='name']").val();
		var area = jQuery("select[name='area']").val();
		var country = jQuery("input[name='country']").val();
		var customertype = jQuery("input[name='customertype']").val();
		var phone = jQuery("input[name='phone']").val();
		var v = jQuery('input[name=v]').val();
		var validName;
		var validEmail;
		var selectArea;
		var validTel;
		var checkPersData;

		/* Если name не корректно - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if (name.length > 2) {
			validName = 1;
			jQuery('.download-wrap__text').removeClass('input-warning');
		} else {
			validName = 0;
			jQuery('.download-wrap__text').addClass('input-warning');
		}

		/* Если e-mail не корректный - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if (validateEmail(email) && email.length > 1) {
			validEmail = 1;
			jQuery('.download-wrap__email-popup').removeClass('input-warning');
		} else {
			validEmail = 0;
			jQuery('.download-wrap__email-popup').addClass('input-warning');
		}

		/* Если select не выбран - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if ($('#area-form').val()) {
			selectArea = 1;
			jQuery('.download-wrap__select-popup').removeClass('input-warning');
		} else {
			selectArea = 0;
			jQuery('.download-wrap__select-popup').addClass('input-warning');
		}

		/* Если телефон не корректный - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if (validateTel(phone) || phone.length == 0) {
			validTel = 1;
			jQuery('.download-wrap__phone').removeClass('input-warning');
		} else {
			validTel = 0;
			jQuery('.download-wrap__phone').addClass('input-warning');
		}

		/* Если check не выбран - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if ($('#check-persdata').prop('checked')) {
			checkPersData = 1;
		} else {
			checkPersData = 0;
		}

		/* Если все валидации пройдены, то: */
		if (
			validEmail == 1 &&
			selectArea == 1 &&
			validTel == 1 &&
			validName == 1 &&
			checkPersData == 1
		) {
			jQuery('.loader').addClass('rot');

			jQuery.ajax({
				url: '/wp-admin/admin-ajax.php',
				method: 'post',
				data: {
					action: 'ajax_order_contact',
					link: link,
					email: email,
					linkon: linkon,
					name: name,
					area: area,
					country: country,
					customertype: customertype,
					phone: phone,
					v: v,
				},
				dataType: 'json',
				success: function (response) {
					// console.log(response['type']);
					jQuery('.loader').removeClass('rot');
					jQuery('.download-wrap__popup').hide();
					// jQuery('.registration-wrap').hide(); // для формы регистрации в клуб
					jQuery('.registration-wrap__send').show(); // для формы регистрации в клуб

					if (response['type'] == 'linkon') {
						document.location.href = link;
					} else if (response['type'] == 'expired') {
						jQuery('.expired__date').text(response['date']);
						jQuery('.expired__product').text(response['product']);
						jQuery('.download-wrap__popup-send').show();
						jQuery('.download-wrap__popup-expired').show();
					} else {
						jQuery('.email_input').text(response['email']);
						jQuery('.download-wrap__popup-send').show();
						jQuery('.download-wrap__popup-send-email').show();
					}
				},
			});
		}
	});

	jQuery('#otpr').on('click', function (event) {
		event.preventDefault();
		var link = jQuery('select[name=link]').val();
		var email = jQuery('.download-wrap__email-popup').val();
		var linkon = jQuery('select[name=link] option:selected').attr('linkon');
		var name = jQuery("input[name='name']").val();
		var area = jQuery("select[name='area']").val();
		var country = jQuery("input[name='country']").val();
		var customertype = jQuery("input[name='customertype']").val();
		var phone = jQuery("input[name='phone']").val();
		var v = jQuery('input[name=v]').val();
		var validName;
		var validEmail;
		var selectArea;
		var validTel;
		var checkPersData;

		/* Если name не корректно - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if (name.length > 2) {
			validName = 1;
			jQuery('.download-wrap__text').removeClass('input-warning');
		} else {
			validName = 0;
			jQuery('.download-wrap__text').addClass('input-warning');
		}

		/* Если e-mail не корректный - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if (validateEmail(email) && email.length > 1) {
			validEmail = 1;
			jQuery('.download-wrap__email-popup').removeClass('input-warning');
		} else {
			validEmail = 0;
			jQuery('.download-wrap__email-popup').addClass('input-warning');
		}

		/* Если select не выбран - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if ($('#area-form').val()) {
			selectArea = 1;
			jQuery('.download-wrap__select-popup').removeClass('input-warning');
		} else {
			selectArea = 0;
			jQuery('.download-wrap__select-popup').addClass('input-warning');
		}

		/* Если телефон не корректный - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if (validateTel(phone) || phone.length == 0) {
			validTel = 1;
			jQuery('.download-wrap__phone').removeClass('input-warning');
		} else {
			validTel = 0;
			jQuery('.download-wrap__phone').addClass('input-warning');
		}

		/* Если check не выбран - классу добавляется input-warning, который окрашивает нижний бордер в красный цвет */
		if ($('#check-persdata').prop('checked')) {
			checkPersData = 1;
		} else {
			checkPersData = 0;
		}

		/* Если все валидации пройдены, то: */
		if (
			validEmail == 1 &&
			selectArea == 1 &&
			validTel == 1 &&
			validName == 1 &&
			checkPersData == 1
		) {
			jQuery('.loader').addClass('rot');

			//Отправим запрос
			if(link.includes('/ru/')){
					jQuery.ajax({
					  type: "POST",
					  url: "/wp-content/themes/rhino/send_rhino3d_1.php",
					  data: {
								email: email,
								direction_next: "Next >",
								current_page: "license_info",
								link: link,
						},
					  success: function(result_msg){
						if(result_msg.includes('true')){
							jQuery('.email_input').text(email);
							jQuery('.download-wrap__popup-send').show();
							jQuery('.download-wrap__popup-send-email').show();
						}else{
							jQuery('.expired__date').text(response['date']);
							jQuery('.expired__product').text(response['product']);
							jQuery('.download-wrap__popup-send').show();
							jQuery('.download-wrap__popup-expired').show();
						}

						jQuery('.loader').removeClass('rot');
						jQuery('.download-wrap__popup').hide();
						jQuery('.registration-wrap__send').show(); // для формы регистрации в клуб

						if (linkon>0) {
							document.location.href = link;
						}

					  },
					  error: function (jqXHR, exception) {
							var msg = '';
							if (jqXHR.status === 0) {
								alert('Сервис временно недоступен!');
								msg = 'Not connect.\n Verify Network.';
							} else if (jqXHR.status == 404) {
								alert('Сервис временно недоступен!');
								msg = 'Requested page not found. [404]';
							} else if (jqXHR.status == 500) {
								alert('Сервис временно недоступен!');
								msg = 'Internal Server Error [500].';
							} else if (exception === 'parsererror') {
								alert('Сервис временно недоступен!');
								msg = 'Requested JSON parse failed.';
							} else if (exception === 'timeout') {
								alert('Сервис временно недоступен!');
								msg = 'Time out error.';
							} else if (exception === 'abort') {
								alert('Сервис временно недоступен!');
								msg = 'Ajax request aborted.';
							} else {
								alert('Сервис временно недоступен!');
								msg = 'Uncaught Error.\n' + jqXHR.responseText;
							}
							console.log(msg);
							console.log(jqXHR);
							console.log(exception);
					  },
					  statusCode: {
						404: function() {
						  alert('Сервис временно недоступен!');
						  console.log("404 page not found");
						}
					  }
				});
			}
			else{				
				jQuery.ajax({
				url: '/wp-admin/admin-ajax.php',
				method: 'post',
				data: {
					action: 'ajax_order_contact',
					link: link,
					email: email,
					linkon: linkon,
					name: name,
					area: area,
					country: country,
					customertype: customertype,
					phone: phone,
					v: v,
				},
				dataType: 'json',
				success: function (response) {
					// console.log(response['type']);
					jQuery('.loader').removeClass('rot');
					jQuery('.download-wrap__popup').hide();
					// jQuery('.registration-wrap').hide(); // для формы регистрации в клуб
					jQuery('.registration-wrap__send').show(); // для формы регистрации в клуб

					if (response['type'] == 'linkon') {
						document.location.href = link;
					} else if (response['type'] == 'expired') {
						jQuery('.expired__date').text(response['date']);
						jQuery('.expired__product').text(response['product']);
						jQuery('.download-wrap__popup-send').show();
						jQuery('.download-wrap__popup-expired').show();
					} else {
						jQuery('.email_input').text(response['email']);
						jQuery('.download-wrap__popup-send').show();
						jQuery('.download-wrap__popup-send-email').show();
					}
				},
			});
				
			}
			//Отправим запрос КОНЕЦ

		}
	});

	jQuery('.mobile-button').on('click', function () {
		jQuery(this).toggleClass('open');
		jQuery('header').toggleClass('openNav');
	});
});

/* Скрипт для карусели отзывов */
$(document).ready(function(){
	$('.icons').slick({
		//Basic settings
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: true,
		swipeToSlide: true,
		touchMove: true,
		ltr: true,
		infinite: true,
		variableWidth: true,
		dots: false,
		pauseOnHover: false
	});
});
/* END: Скрипт для карусели отзывов */