(function (global) {

	var thousand = 1000,
		tenThousand = 10 * thousand,
		million = thousand * thousand,
		billion = thousand * million,
		male = 'male',
		female = 'female',

		names = {
			0: 'אפס',
			1: { male: 'אחד',    female: 'אחת' },
			2: { male: 'שניים',  female: 'שתיים' },
			3: { male: 'שלושה',  female: 'שלוש' },
			4: { male: 'ארבעה',  female: 'ארבע' },
			5: { male: 'חמישה',  female: 'חמש' },
			6: { male: 'שישה',   female: 'שש' },
			7: { male: 'שבעה',   female: 'שבע' },
			8: { male: 'שמונה',  female: 'שמונה' },
			9: { male: 'תשעה',   female: 'תשע' },
			10: { male: 'עשר', female: 'עשר' },
			11: { male: 'אחד עשר',    female: 'אחת עשרה' },
			12: { male: 'שניים עשר',  female: 'שתיים עשרה' },
			13: { male: 'שלושה עשר',  female: 'שלוש עשרה' },
			14: { male: 'ארבעה עשר',  female: 'ארבע עשרה' },
			15: { male: 'חמישה עשר',  female: 'חמש עשרה' },
			16: { male: 'שישה עשר',   female: 'שש עשרה' },
			17: { male: 'שבעה עשר',   female: 'שבע עשרה' },
			18: { male: 'שמונה עשר',  female: 'שמונה עשרה' },
			19: { male: 'תשעה עשר',   female: 'תשע עשרה' },
			20: 'עשרים',
			30: 'שלושים',
			40: 'ארבעים',
			50: 'חמישים',
			60: 'שישים',
			70: 'שבעים',
			80: 'שמונים',
			90: 'תשעים',
			100: 'מאה',
			200: 'מאתיים',
			1000: 'אלף',
			2000: 'אלפיים',
			3000: 'שלושת אלפים',
			4000: 'ארבעת אלפים',
			5000: 'חמשת אלפים',
			6000: 'ששת אלפים',
			7000: 'שבעת אלפים',
			8000: 'שמונת אלפים',
			9000: 'תשעת אלפים',

			thousand: 'אלף',
			million: 'מיליון',
			billion: 'מיליארד'
		};
	for (var i = 3; i < 10; i++) {
		names[i * 100] = names[i].female + ' מאות';
	}

	var join = function (array, joiner, and, forceAnd) {
		var filtered = array
			.filter(function (n) { return n && n.length; });
		if (and && (filtered.length > 1 || forceAnd)) {
			filtered[filtered.length - 1] = and + filtered[filtered.length - 1];
		}
		return filtered.join(joiner);
	};

	var takeGender = function (name, gender) {
		return name[gender] || name;
	};

	var genderedName = function (number, gender) {
		return takeGender(names[number] || '', gender);
	};

	var misparSection = function (num, gender, ignoreOnes, forceAnd) {
		var parts = [];
		if (num >= 1000) {
			parts.push(genderedName(Math.floor(num / 1000) * 1000, female));
			num = num % 1000;
		}
		if (num >= 100) {
			parts.push(genderedName(Math.floor(num / 100) * 100, female));
			num = num % 100;
		}
		if (num >= 20) {
			parts.push(genderedName(Math.floor(num / 10) * 10, gender));
			num = num % 10;
		}
		if (num > (ignoreOnes ? 1 : 0)) {
			parts.push(genderedName(num, gender));
		}

		return join(parts, ' ', 'ו', forceAnd);
	};

	var mispar = function (number, gender) {
		number = Number(number);
		gender = gender || female;

		if (number % 1 != 0) {
			return null;
		}
		if (number < 0 || number > 999999999999) {
			return null;
		}
		if (number == 0) {
			return names[0];
		}

		var parts = [];
		if (number > billion) {
			parts.push([
				misparSection(
					Math.floor(number / billion),
					male,
					true
				),
				names.billion
			]);
			number = number % billion;
		}
		if (number > million) {
			parts.push([
				misparSection(
					Math.floor(number / million),
					male,
					true
				),
				names.million
			]);
			number = number % million;
		}
		if (number > tenThousand) {
			parts.push([
				misparSection(
					Math.floor(number / thousand),
					male,
					true
				),
				names.thousand
			]);
			number = number % thousand;
		}
		if (number > 0) {
			parts.push([
				misparSection(
					number,
					gender,
					false,
					parts.length > 0
				)
			]);
		}

		return join(parts.map(function (names) {
			return join(names, ' ');
		}), ', ');
	};

	global.mispar = mispar;

	global.mispar.test = function (length) {
		length = length || 4;
		var array = new Array(length),

			tryOne = function () {
				var number = array.join('');
				console.log(number + ' => "' + mispar(number, male) + '" / "' + mispar(number, female) + '"');
			},

			tryAll = function (i) {
				if (i >= length) {
					tryOne();
				} else {
					for (var value = 0; value < 4; value++) {
						array[i] = value;
						tryAll(i + 1);
					}
				}
			};

		tryAll(0);
	};

})(this);
