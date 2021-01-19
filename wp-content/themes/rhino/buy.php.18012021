<?php
/**
 * Template Name: Buy
 */
?>

<?php get_header(); ?>

<?php

//PROMO
global $wpdb;
$wp_rhino_promo_rezult = $wpdb->get_results("SELECT promo_code, discount, products FROM wp_rhino_promo WHERE `status`='1'");
//PROMO END

	//$url_json_e  = WP_CONTENT_URL.'/themes/rhino/curs/json_euro.json';
	$url_json_e  = __DIR__ . '/curs/json_euro.json';
	$curs_euro = file_get_contents($url_json_e, false, $context);

	//$url_json_d  = WP_CONTENT_URL.'/themes/rhino/curs/json_dollar.json';
	$url_json_d  = __DIR__ . '/curs/json_dollar.json';
	$curs_dollar = file_get_contents($url_json_d, false, $context);

?>

<!-- PROMO -->
<script>
	promo = {};//create object
<?php foreach ($wp_rhino_promo_rezult as $promo) { ?>
	promo['<?php echo $promo->promo_code;?>'] = {discount:'<?php echo $promo->discount;?>',products:'<?php echo json_encode(unserialize($promo->products));?>'};
<?php }//END foreach ?>
	//alert(promo['proba']['products']);
</script>
<!-- PROMO END -->

<!-- Открытие страницы купить с разными вариантами выбранной оплаты -->
<script type="text/javascript">

/*
 	Варианты:
	https://www.rhino-3d.ru/buy/#card - Банковская карта
	https://www.rhino-3d.ru/buy/#cashless - Безналичная оплата
	https://www.rhino-3d.ru/buy/#credit - Кредит без переплат
*/

$(document).ready(function() {
	var url = window.location.href;
	var match = url.match(new RegExp("^[^\\s]+#([^\\s]+)$"));
	if (match != null) {
		$("#oplata [value='" + match[1] + "']").attr("selected", "selected");
	}
});

</script>
<!-- END: Открытие страницы купить с разными вариантами выбранной оплаты -->
<div class="buy-conteiner conteiner_main">
	<div class="main">
		<div class="left ">
			<div class="title"><h2 style="margin-top: 5px; font-size:15pt;"><?php the_field('textline');?></h2></div>
			<!--Rhino-->
            <?php while ( have_rows('products') ) : the_row();?>
            <div class="tab" id="<?php the_sub_field('product-id');?>">
				<div class="title"> <?php the_sub_field('product-group');?></div>
				<div class="line-block">
			        <?php $i = 1; ?>
			        <?php while ( have_rows('product-priсe') ) : the_row();?>
			            <div class="line" data-type="1" data-link="<?php the_sub_field('link_tab1'); ?>" data-scan="<?php $a = get_sub_field('требуется_сканкопия'); if(!empty($a)) echo $a[0]; ?>">
			                <div class="lline"><?php the_sub_field('product-name'); ?></div>
			                <div class="rline">
			                    <?php if(get_sub_field('product-rub')) { ?>

                                    <!-- Расчет цены в рублях -->
			                        <?php if(get_sub_field('product-rub-sale')) { ?>
			                            <span class="sale"><?php $res = the_sub_field('product-rub-sale'); ?></span>
                        		 <?php } else { ?>
			                            <span><?php $res = the_sub_field('product-rub'); ?></span>
			                        <?php } ?>

			                        <?php if(get_sub_field('product-rub-sale')) { ?>
			                            <div class="sale_2">
                                    	<?php $res = the_sub_field('product-rub');?></div>
			                        <?php } ?> р.

			                    <?php } else if(get_sub_field('product-euro')) { ?>

                                    <!-- Расчет цены в евро -->
			                        <?php if(get_sub_field('product-euro')) { ?>
			                            <?php if(get_sub_field('product-euro-sale')): ?>

			                                <!-- основная  -->
			                                <?php
			                                    $price_tab = get_sub_field('product-euro-sale');
			                                    $coefficient_tab = get_sub_field('product-euro-k');
			                                    $price_tab = (int)$price_tab;
			                                    $coefficient_tab = str_replace(',', '.', $coefficient_tab);
			                                    $coefficient_tab = floatval($coefficient_tab);
			                                    $res = $price_tab*$curs_euro*$coefficient_tab;
			                                ?>

			                                <span class="sale"><?php echo floor($res / 100) * 100;	?></span>

			                                <!-- основная  -->
			                                <!-- цена со скидкой -->
			                                <?php
			                                    $price_tab_sale = get_sub_field('product-euro');
			                                    $coefficient_tab = get_sub_field('product-euro-k');
			                                    $price_tab_sale = (int)$price_tab_sale;
			                                    $coefficient_tab = str_replace(',', '.', $coefficient_tab);
			                                    $coefficient_tab = floatval($coefficient_tab);
			                                    $res = $price_tab_sale*$curs_euro*$coefficient_tab;
			                                ?>

			                                <div class="sale_2"><?php echo floor($res / 100) * 100; ?></div>

			                                <!-- цена со скидкой -->
			                            <?php else: ?>
			                                <?php
			                                    $price_tab = get_sub_field('product-euro');
			                                    $coefficient_tab = get_sub_field('product-euro-k');
			                                    $price_tab = (int)$price_tab;
			                                    $coefficient_tab = str_replace(',', '.', $coefficient_tab);
			                                    $coefficient_tab = floatval($coefficient_tab);
			                                    $res = $price_tab*$curs_euro*$coefficient_tab;

			                                ?>

			                                <span><?php echo floor($res / 100) * 100; ?></span>

			                            <?php endif; ?>

			                    	<?php } ?> р.

                                <!-- Расчет цены в долларе  -->
								<?php } else if(get_sub_field('product-doll')) { ?>
			                        <?php if(get_sub_field('product-doll-sale')): ?>

			                            <!-- основная  -->
			                            <?php
			                                $price_tab_dollar = get_sub_field('product-doll-sale');
			                                $coefficient_tab_dollar = get_sub_field('product-doll-k');
			                                $price_tab_dollar = (int)$price_tab_dollar;
			                                $coefficient_tab_dollar = str_replace(',', '.', $coefficient_tab_dollar);
			                                $coefficient_tab_dollar = floatval($coefficient_tab_dollar);
			                                $res = $price_tab_dollar*$curs_dollar*$coefficient_tab_dollar;
			                            ?>

			                            <span class="sale"><?php echo floor($res / 100) * 100;	?></span>

			                            <!-- основная  -->
			                            <!-- цена со скидкой -->
			                            <?php
			                                $price_tab_doll_sale = get_sub_field('product-doll');
			                                $coefficient_tab_dollar = get_sub_field('product-doll-k');
			                                $price_tab_doll_sale = (int)$price_tab_doll_sale;
			                                $coefficient_tab_dollar = str_replace(',', '.', $coefficient_tab_dollar);
			                                $coefficient_tab_dollar = floatval($coefficient_tab_dollar);
			                                $res = $price_tab_doll_sale*$curs_dollar*$coefficient_tab_dollar;
			                            ?>

			                            <div class="sale_2"><?php echo floor($res / 100) * 100; ?></div>

			                            <!-- цена со скидкой -->
			                        <?php else: ?>
			                            <?php
			                                $price_tab_dollar = get_sub_field('product-doll');
			                                $coefficient_tab_dollar = get_sub_field('product-doll-k');
			                                $price_tab_dollar = (int)$price_tab_dollar;
			                                $coefficient_tab_dollar = str_replace(',', '.', $coefficient_tab_dollar);
			                                $coefficient_tab_dollar = floatval($coefficient_tab_dollar);
			                                $res = $price_tab_dollar*$curs_dollar*$coefficient_tab_dollar;

			                            ?>

			                        	<span><?php echo floor($res / 100) * 100; ?></span>

			                    	<?php endif; ?>
			                	р.<?php } ?>
			                </div>
			            </div>
			        <?php endwhile; ?>

			        <?php /*$i = 1; ?>
			        <?php while ( have_rows('product_po_zaprosu') ) : the_row();?>

			            <div class="line">
			                <div class="lline"><?php the_sub_field('product_zap'); ?></div>
			                <div class="rline"><?php the_sub_field('prod_zap_txt'); ?></div>
			            </div>
			        <?php endwhile; */   ?>

			    </div>
			</div>
            <?php endwhile; ?>
		</div>

		<div class="right">
			<div class="sideblock">
				<div class="greyline"></div>
				<div class="check">
					<?php echo do_shortcode('[contact-form-7 id="618" title="Заказ"]'); ?>


					<div id="rbkbutton">
						<a style="color:white;padding-left:20px;padding-right:20px;" id="api_button_buy" class="btn btn-xs btn-outline btn-primary" data-amount="0000.00" data-description="для начала выберите продукт" data-string="ipayCheckout({amount:0000.00,currency:'RUB',
							order_number:'<?php echo rand(100000,999999);?>',description: 'для начала выберите продукт'},
							function(order) { showSuccessfulPurchase(order) },
							function(order) { showFailurefulPurchase(order) })">Купить
						</a>
					</div>

					<?php /*
					<div id="rbkbutton">
						<a style="color:white;padding-left:20px;padding-right:20px;" id="api_button_buy" onclick="ipayCheckout({amount:0000.00,currency:'RUB',
							order_number:'<?php echo rand(100000,999999);?>',description: 'для начала выберите продукт'},
							function(order) { showSuccessfulPurchase(order) },
							function(order) { showFailurefulPurchase(order) })"
							class="btn btn-xs btn-outline btn-primary">Купить
						</a>
					</div>
					*/ ?>


					<div id="raswrapper">
						<p>
							Вы будете перенаправлены на платежный шлюз ПАО Сбербанк для оформления кредита без переплат.
							<a href="https://www.pokupay.ru/credit_terms" target="_blank">Подробнее</a>
						</p>
						<div id="rasbutton">
							<!-- <input id="inputLink" type="hidden" name="inputLink"> -->
							<a style="color:white;padding-left:20px;padding-right:20px;"
								id="rassrochka"
								class="btn btn-xs btn-outline btn-primary"
								onclick="sendGet(<?php echo rand(100000,999999);?>)">Купить
							</a>
							<style>#raswrapper{display:none}#rasbutton a{display:block}#rasbutton{width:100%;height:45px;color:#fff;text-align:center;line-height:45px;font-size:24px;margin-top:25px}</style>
						</div>
					</div>
				</div>
				<input id="hid" type="hidden" value="">
				<input id="oplata_hidden" type="hidden" value="1">
				<?php if(isset($_GET["checkout"])): ?>
					<input id="oplata_zakaz" type="hidden" value="1">
				<?php endif;?>
				<div class="whiteline"></div>
			</div>

			<div class="content-buy-wr">
				<div class="content-buy content-buy-link">
					<a class="buy-link" href="<?php the_field('price'); ?>">Скачать прайс</a>
				</div>

				<div class="content-buy">
					<div class="title">Варианты оплаты</div>
					<span class="b1"><p>Безналичная оплата по счету</p></span>
					<!--	<span class="b2"><a href="/buy_online/">Онлайн оплата картой VISA / Mastercard на сайте Сбербанка</a></span> -->
					<!-- <span class="b2"><p><a href="/buy_online/">Оплата картой через ПАО Сбербанк</a></p></span> -->
					<span class="b2"><p>Оплата картой через ПАО Сбербанк (будет доступна с 22 января 2021)</p></span>  
					<span class="b5"><p><a href="/buy/credit/">Рассрочка без переплат</a></p></span>

				</div>

				<div class="content-buy">
					<div class="title">Доставка</div>
					<p><?php the_field('dostavka'); ?></p>

				</div>
			</div>
		</div>
	</div>
</div>

<script>
/* PROMO */
jQuery(document).ready(function(){

	jQuery('#api_button_buy').click(function() {

		//validate form and call ipayCheckout function ##################################################
		var dataAmount = jQuery('#api_button_buy').attr('data-amount');
		var dataDescription = jQuery('#api_button_buy').attr('data-description');

		var custname = jQuery('#custname').val();
		var custmail = jQuery('#custmail').val();
		var custphone = jQuery('#custphone').val();
		
		//Check scan file
		var needscan = jQuery('.line-block > .active').attr('data-scan');
		var custfile = $('#scanfile').get(0).files[0];
		//Check scan file END

		//validate form fileds
		var validate = true;
		$(".error").remove();
		if(custname.length < 2) {
		  validate = false;
		  $('#custname').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, заполните обязательное поле.</span>');
		}
		if(custphone.length < 9) {
		  validate = false;
		  $('#custphone').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, заполните обязательное поле.</span>');
		}
		if(custmail.length < 6) {
		  validate = false;
		  $('#custmail').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, заполните обязательное поле.</span>');
		} else{
		  /* var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;  */
  		  var pattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
		  var validEmail = custmail.search(pattern);
		  if (validEmail != 0) {
			  validate = false;
			$('#custmail').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, введите валидный email.</span>');
		  }
		}
		
		//Check scan file
		if(needscan == 'yes') {
			if(custfile){
				if(custfile.size < 1024){
					validate = false;
					$('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Скан-копия не соответствует требованиям! Пожалуйста, прикрепите реальную скан-копию документа.</span>');
				}
				if(custfile.size > 12582912){
					validate = false;
					$('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Файл слишком большой! Размер скан-копии не должен превышать 12 Мб.</span>');
				}
			}else{
				validate = false;
				$('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, прикерпите скан-копию документа.</span>');
			}
		}
		//Check scan file END
		
		//validate form fileds END
		if(validate){
			ipayCheckout({amount:dataAmount,currency:'RUB',
			order_number:'<?php echo rand(100000,999999);?>',
			description: dataDescription},
			function(order) { showSuccessfulPurchase(order) },
			function(order) { showFailurefulPurchase(order) });

				var formData = new FormData();
				//var data = jQuery('#api_button_buy').attr('onclick');
				var data = jQuery('#api_button_buy').attr('data-string');
				var datastring = 'info='+ data + '&name=' + jQuery('#custname').val() + '&mail=' + jQuery('#custmail').val() + '&phone=' + jQuery('#custphone').val();
				formData.append('info', data);
				formData.append('name', jQuery('#custname').val());
				formData.append('mail', jQuery('#custmail').val());
				formData.append('phone', jQuery('#custphone').val());
				formData.append('dataAmount', dataAmount);
				var input_promo = jQuery('#promo_code').val();
				if(promo.hasOwnProperty(input_promo)){
					formData.append('input_promo', input_promo);
				}
				var file = $('#scanfile').get(0).files[0];
				formData.append('file', file);

			$.ajax({
				type: "POST",
				contentType: false, // важно - убираем форматирование данных по умолчанию
				processData: false, // важно - убираем преобразование строк по умолчанию
				cache: false,
				url: "<?php bloginfo('template_url');?>/order_mail.php",
				data: formData,
				success: function(){    }
			});
		}// end validate
		//validate form and call ipayCheckout function END ##########################
});

	//SHOW/HIDE PROMO FILED
	if (jQuery('#is_promo').is(':checked')){
			jQuery('.promo_code').show();
	}else{
		jQuery('.promo_code').hide();
	}
	jQuery('#is_promo').click(function(){
		if (jQuery(this).is(':checked')){
			jQuery('.promo_code').show(200);
		} else {
			jQuery('.promo_code').hide(200);
		}
	});
	//SHOW/HIDE PROMO FILED
});
//END REDY
/* PROMO END */


	jQuery('#oplata').on('change', function() {
		var oplata_type =  this.value;
		if(oplata_type == 'card'){
			jQuery('.contact-form').hide(200);
			jQuery('#cf_buy').hide();
			jQuery('#rbkbutton').show();
			//jQuery('#send_button').hide();
		}else{
			jQuery('#cf_buy').hide();
			jQuery('#rbkbutton').hide();
			//jQuery('#rbkbutton').css({'display':'none'});
			//jQuery('#api_button_buy').hide();
			jQuery('.contact-form').show(200);
		}
	});

	jQuery('#send_button').click(function(){
		
		//Check scan file
		var needscan = jQuery('.line-block > .active').attr('data-scan');
		var custfile = $('#scanfile').get(0).files[0];
		//Check scan file END
		
		//Check scan file
			validate = true;
			$('.wpcf7-not-valid-tip').hide();
			if(needscan == 'yes') {
				if(custfile){
					if(custfile.size < 1024){
						validate = false;
						$('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Скан-копия не соответствует требованиям! Пожалуйста, прикрепите реальную скан-копию документа.</span>');
					}
					if(custfile.size > 12582912){
						validate = false;
						$('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Файл слишком большой! Размер скан-копии не должен превышать 12 Мб.</span>');
					}
				}else{
					validate = false;
					$('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, прикерпите скан-копию документа.</span>');
				}
			}
		//Check scan file END
		
		if(!validate){
			event.preventDefault();
		}
		

		jQuery(document).ajaxSuccess(function(event, xhr, settings) {
  			let response = JSON.parse(xhr.responseText);
  			let status = response['status'];
  			if(status == 'mail_sent'){
  				jQuery('#send_button').hide();
  				jQuery('.contact-form').hide();
  			}else{

  			}
		});
	});
	
		//$( ".wpcf7-form" ).change(function() {

		//});
	// var value_loc = document.getElementById('hid').value;
	// console.log(value_loc);
	document.addEventListener( 'wpcf7mailsent', function( event ) {
		var value_loc = document.getElementById('hid').value;
		var oplata_hidden = document.getElementById('oplata_hidden').value;
		var formData = new FormData();
  		var file = $('#scanfile').get(0).files[0];
    	console.log('filename - ',file.name);

		if(oplata_hidden == 1) {
			location = value_loc;
		}
	}, false );

	<?php if(isset($_GET['checkout'])){?>
	jQuery(document).ready(function(){
		jQuery('#oplata').val('Безналичная оплата');
		jQuery('.contact-form').show(200);

	});
	<?php }?>

/*
	jQuery('#api_button_buy').click(function() {

		//validate form and call ipayCheckout function #############################
		ipayCheckout({amount:1000.00,currency:'RUB',
							order_number:'666',description: 'для начала выберите продукт'},
							function(order) { showSuccessfulPurchase(order) },
							function(order) { showFailurefulPurchase(order) });
		//validate form and call ipayCheckout function END ##########################

		var formData = new FormData();
		var data = jQuery('#api_button_buy').attr('onclick');
		var datastring = 'info='+ data + '&name=' + jQuery('#custname').val() + '&mail=' + jQuery('#custmail').val() + '&phone=' + jQuery('#custphone').val();
		formData.append('info', data);
		formData.append('name', jQuery('#custname').val());
		formData.append('mail', jQuery('#custmail').val());
		formData.append('phone', jQuery('#custphone').val());
		var input_promo = jQuery('#promo_code').val();
		if(promo.hasOwnProperty(input_promo)){
			formData.append('input_promo', input_promo);
		}
		var file = $('#scanfile').get(0).files[0];
		formData.append('file', file);

	$.ajax({
		type: "POST",
		contentType: false, // важно - убираем форматирование данных по умолчанию
		processData: false, // важно - убираем преобразование строк по умолчанию
		cache: false,
		url: "<?php bloginfo('template_url');?>/order_mail.php",
		data: formData,
		success: function(){    }
	});
});
*/


jQuery('#rassrochka').click(function() {

//PROMO
		input_promo = jQuery('#promo_code').val();
		if(promo.hasOwnProperty(input_promo)){
			var products = JSON.parse(promo[input_promo]['products']);
			if(products){
				//discount for some products
				var product_name = jQuery('.line-block').find('.active').find('.lline').html();
				if(products.includes(product_name)){
					discount = promo[input_promo]['discount'];
				}else{
					discount = 0;
				}
			}else{
				//discount for all products
				discount = promo[input_promo]['discount'];
			}
		}else{
			//prpmokod ne nayden
			discount = 0;
		}
//PROMO END

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
		$(".error").remove();
		if(custname.length < 2) {
		  validate = false;
		  $('#custname').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, заполните обязательное поле.</span>');
		}
		if(custphone.length < 9) {
		  validate = false;
		  $('#custphone').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, заполните обязательное поле.</span>');
		}
		if(custmail.length < 6) {
		  validate = false;
		  $('#custmail').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, заполните обязательное поле.</span>');
		} else{
		  var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
		  var validEmail = custmail.search(pattern);
		  if (validEmail != 0) {
			  validate = false;
			$('#custmail').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, введите валидный email.</span>');
		  }
		}
		
		//Check scan file
		if(needscan == 'yes') {
			if(custfile){
				if(custfile.size < 1024){
					validate = false;
					jQuery('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Скан-копия не соответствует требованиям! Пожалуйста, прикрепите реальную скан-копию документа.</span>');
				}
				if(custfile.size > 12582912){
					validate = false;
					jQuery('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Файл слишком большой! Размер скан-копии не должен превышать 12 Мб.</span>');
				}
			}else{
				validate = false;
				jQuery('#scanfile').after('<span role="alert" class="wpcf7-not-valid-tip error">Пожалуйста, прикерпите скан-копию документа.</span>');
			}
		}
		//Check scan file END
		//validate form fileds END
//CHECK FILEDS END ##################################################################################

if(validate){
		var formData = new FormData();

		var order_number = jQuery('#rassrochka').attr('onclick');
		order_number = order_number.replace(/[^+\d]/g, '');

		var sum = jQuery('.line-block').find('.active').find('span').text();
		var col = jQuery('#col').val();
		var clc_price = sum*col;

		//PROMO
		var clc_price = clc_price - ((clc_price/100) * discount);
		//PROMO END

		var clc_name = jQuery('#procheck').val() + '/ ' +  jQuery('#typecheck').val() + '. Количество: ' + col;
		jQuery('input[name=bill_amount]').val(clc_price);
		jQuery('input[name=description]').val(clc_name);

		//var data = jQuery('#api_button_buy').attr('onclick');
		var input_promo = jQuery('#promo_code').val();
		if(promo.hasOwnProperty(input_promo)){
				var datastring = 'Продукт: <b>' + jQuery('#procheck').val() + '</b><br/>Тип лицензии: <b>' + jQuery('#typecheck').val() + '</b><br/>Количество: <b>' + col + '</b><br/>Стоимость: <b>' + clc_price + ' руб.</b><br/>Промокод: <b>' + input_promo + '</b><br/>Номер заказа: <b>' + order_number + '</b>' + '<br/><br/>Имя клиента: <b>' +jQuery('#custname').val() + '</b><br/>Email: <b>' +jQuery('#custmail').val() + '</b><br/>Телефон: <b>' + jQuery('#custphone').val()+ '</b>';
			}else{
				var datastring = 'Продукт: <b>' + jQuery('#procheck').val() + '</b><br/>Тип лицензии: <b>' + jQuery('#typecheck').val() + '</b><br/>Количество: <b>' + col + '</b><br/>Стоимость: <b>' + clc_price + ' руб.</b><br/>Номер заказа: <b>' + order_number + '</b>' + '<br/><br/>Имя клиента: <b>' +jQuery('#custname').val() + '</b><br/>Email: <b>' +jQuery('#custmail').val() + '</b><br/>Телефон: <b>' + jQuery('#custphone').val()+ '</b>';
			}
			formData.append('info', datastring);
			var file = $('#scanfile').get(0).files[0];
			formData.append('file', file);
			formData.append('mail', jQuery('#custmail').val());
			formData.append('order_number', order_number);
	$.ajax({
		type: "POST",
		contentType: false, // важно - убираем форматирование данных по умолчанию
		processData: false, // важно - убираем преобразование строк по умолчанию
		cache: false,
		url: "<?php bloginfo('template_url');?>/send_get_mail.php",
		data: formData,
		success: function(){    }
	});
}

});


</script>

<?php get_footer();?>


