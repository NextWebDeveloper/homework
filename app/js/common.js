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


/*
	const numberSepBefore = $('.thousands-separator').text();
	console.log(numberSepBefore);
	const numberSepAfter = numberSepBefore.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	console.log(numberSepAfter);
	$('.thousands-separator').text(numberSepAfter);
*/


});
