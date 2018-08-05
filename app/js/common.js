$(function() {

	// Изменение блока дома при клике (выбор этажа)
	$('.houseChoiceBlock').on('click', function(){
		$(this).siblings().removeClass('houseChoiceBlock_active');
		$(this).toggleClass('houseChoiceBlock_active');
		$('#resFloorCount').text($(this).attr('data-floor-count'));
	});

	// Изменение блока ёмкости бойлера при клике (выбор бойлера)
	$('.boilerChoice__checkbox').on('click', function(){
		$(this).parent().siblings().children('.boilerChoice__checkbox').removeClass('boilerChoice__checkbox_active');
		$(this).toggleClass('boilerChoice__checkbox_active');
		$('#resBoilerCapacity').text($(this).siblings().attr('data-boiler-capacity'));
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
	// Вычисляет итоговую сумму одной секции при изменении занчения скрытого инпута в строке блока "Стоимость" слева
	$('.inputValue').on('change', function() {
		$(this).parent().children('.cbSeparately__value').text(numberSeparator($(this).val())); //выводим значение из скрытого инпута для отображения пользователю
		let sumSection = +$(this).val(); //отсюда и ниже считаем общую сумму раздела
		const array1 = $(this).parents('.cbSeparately__position').siblings().find('.inputValue');
		$.each(array1, function() {
			sumSection += +$(this).val();
		});
		$(this).parents('.costBlock').find('.cbTotal__total').text(numberSeparator(sumSection+''));
	});
	
	// Вычисляет общую итоговую стоимость оборудования и итоговую общую цену
	$('.equipmentValue').on('change', function() {
		const equipmentArr = $(this).parents('body').find('.equipmentValue');
		let sumEquipment = 0;
		$.each(equipmentArr, function() {
			sumEquipment += +$(this).val();
		});
		$('.equipmentTotalPrice').text(numberSeparator(sumEquipment+''));
		$('.overallTotalPrice').text(numberSeparator((sumEquipment+ +($('.installTotalPrice').text()))+''));
	});

	// Вычисляет общую итоговую стоимость монтажа и итоговую общую цену
	$('.installValue').on('change', function() {
		const installArr = $(this).parents('body').find('.installValue');
		let sumInstall = 0;
		$.each(installArr, function() {
			sumInstall += +$(this).val();
		});
		$('.installTotalPrice').text(numberSeparator(sumInstall+''));
		$('.overallTotalPrice').text(numberSeparator((sumInstall+ +($('.equipmentTotalPrice').text()))+''));
	});
	


	// Копирует блок комнаты из скрытого блока этажа, присваивает номер и вставляет в конец текущего блока этажа.
	$('.addRoom').on('click', function(){
		let clonedRoom = $('#roomHidden').clone(true); //true - копирует блок с event listener-ами
		clonedRoom.removeAttr('id');
		let roomNumber = $(this).parents('.floor').find('.floor__room').length;
		roomNumber += 1;
		clonedRoom.find('.room__number').text(roomNumber);
		clonedRoom.appendTo($(this).parents('.floor').children('.roomOuter'));
	});
	// Удаляет комнату и пересчитывает порядковые номера комнат
	$('.room__delete').on('click', function(){
		let roomParent = $(this).parents('.roomOuter');
		$(this).parents('.floor__room').remove();
		let roomArray = roomParent.find('.floor__room');
		let n=1;
		$.each(roomArray, function() {
			$(this).find('.room__number').text(n);
			n += 1;
		});
		resultCheck();
	});

	// Копирует блок этажа из скрытого блока этажа, присваивает номер и вставляет в конец блоков этажей
	$('.addFloor').on('click', function(){
		let clonedFloor = $('#floorHidden').clone(true); //true - копирует блок с event listener-ами
		clonedFloor.removeAttr('id');
		let floorNumber = $('.floorOuter').children('.floor').length;
		floorNumber += 1;
		clonedFloor.find('.floor__number').text(floorNumber);
		clonedFloor.appendTo('.floorOuter');
	});

	// Записывает значение из поля "название объекта" в итоговую таблицу
	$('#locationName').on('input', function(){
		$('#resLocationName').text($(this).val());
	});



	function resultCheck(){
		resTotalArea();
		resTotalWarmArea();

	}
	
	$('.roomArea').on('input', function(){
		resTotalArea();
	});

	$('.warmArea').on('input', function(){
		resTotalWarmArea();
	});
	
	// Вычисляет общую площадь помещений и записывает в итоговую таблицу
	function resTotalArea(){
		let roomAreaArr = $('body').find('.roomArea');
		let roomAreaSum = 0;
		$.each(roomAreaArr, function() {
			roomAreaSum += +$(this).val();
		});
		$('#resTotalArea').text(roomAreaSum);
	}

	// Вычисляет общую площадь тёплого пола и записывает в итоговую таблицу
	function resTotalWarmArea(){
		let warmAreaArr = $('body').find('.warmArea');
		let warmAreaSum = 0;
		$.each(warmAreaArr, function() {
			warmAreaSum += +$(this).val();
		});
		$('#resTotalWarmArea').text(warmAreaSum);		
	}

});
