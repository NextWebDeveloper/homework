$(function() {

	// Изменение блока дома при клике (выбор этажа)
	$('.houseChoiceBlock').on('click', function(){
		$(this).siblings().removeClass('houseChoiceBlock_active');
		$(this).toggleClass('houseChoiceBlock_active');
	});

	// Изменение блока ёмкости бойлера при клике (выбор бойлера)
	$('.boilerChoice__checkbox').on('click', function(){
		$(this).parent().siblings().children('.boilerChoice__checkbox').removeClass('boilerChoice__checkbox_active');
		$(this).toggleClass('boilerChoice__checkbox_active');
	});

	// Выбор модели бойлера
	$('.boilerList__checkbox').on('click', function(){
		$(this).toggleClass('boilerList__checkbox_active');
	});

	// Функция разделителя для числа
	function numberSeparator(numberToSep){
		return numberToSep.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	}

	/*Изменяет значение итоговой суммы секции в соответствии с атрибутром data-total-price*/
	function totalPriceSec(){
		let totalPriceSecValue = $('.cbTotal__total').attr('data-total-price');
		$('.cbTotal__total').text(totalPriceSecValue);
	}

	/*Вычисляет общую сумму всех позиций в разделе Стоимость одной секции и добавляет её в атрибут data-total-price раздела ИТОГО*/
	 function sumSecPos(){
		let sum = 0;
		const arr1 = $('.cbSeparately__value');
		$.each(arr1, function(){
			sum += +$(this).attr('data-pos-cost');
		});
		$('.cbTotal__total').attr('data-total-price', sum);
		totalPriceSec();
	}

	// Показ скрытых моделей в блоке выбора бойлера
	const modelsCount = $('.modelsList').children('.boilerList__block');
	if (modelsCount.length > 4) {
		$('#showMore').css("display", "block");
		for (i=4; i<modelsCount.length; i++) {
			let obj = $(modelsCount[i]);
			modelsCount[i].style.opacity = "0";
			obj.css('height', '0');
			obj.css('marginBottom', '0');
		}
	}
	$('#showMore').on('click', function(){
		let modelsHiddenCount = $('.modelsList').children('.boilerList__block[style~="opacity: 0;"]');
		for (i=0; i<4; i++) {
			modelsHiddenCount[i].style.opacity = "1";
			$(modelsHiddenCount[i]).css('height', 'auto');
			$(modelsHiddenCount[i]).css('marginBottom', '10px');
		}
	});

	// Показ скрытых моделей в блоке выбора котла
	const modelsCount2 = $('.modelsList2').children('.boilerList__block');
	if (modelsCount2.length > 4) {
		$('#showMore2').css("display", "block");
		for (i=4; i<modelsCount2.length; i++) {
			let obj = $(modelsCount2[i]);
			modelsCount2[i].style.opacity = "0";
			obj.css('height', '0');
			obj.css('marginBottom', '0');
		}
	}
	$('#showMore2').on('click', function(){
		let modelsHiddenCount2 = $('.modelsList2').children('.boilerList__block[style~="opacity: 0;"]');
		for (i=0; i<4; i++) {
			modelsHiddenCount2[i].style.opacity = "1";
			$(modelsHiddenCount2[i]).css('height', 'auto');
			$(modelsHiddenCount2[i]).css('marginBottom', '10px');
		}
	});


	$('#button22').on('click', function(){
		$('.inputValue').val(200000);
		$('.inputValue').trigger('change');
	});

	$('.inputValue').on('change', function() {
		$(this).parent().children('.cbSeparately__value').text(numberSeparator($(this).val()));
		$('.cbTotal__total').text($(this).parent('.costBlock__total').siblings('.costBlock__separately').find('.cbSeparately__value').text())
	});






});
