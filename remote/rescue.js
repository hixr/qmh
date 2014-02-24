if (/index\.php\?c=orders&m=l&st=unassigned&budget=0&fcity=0&ftime=2&q=50/.test(window.location.href)) {
    processList();
};
if (/index\.php\?c=orders&m=l&st=forcheck&budget=0&fcity=1&ftime=all&q=50/.test(window.location.href)) {
    processList();
}
if (/index\.php\?c=orders&m=order&id=/.test(window.location.href)) {
    processOrder();
};

function exit() {window.open("","_self"); window.close()};

function processList() {
    document.getElementsByClassName('listing')[0].addEventListener('click', handler);
    
    function handler(e) {
	var node = e.target;
	var parent = node.parentNode;
	if (node.tagName != 'A') {
	    return;
	}; 
	while (parent.tagName != 'TBODY') {
	    node = parent;
	    parent = parent.parentNode
	};
	parent.removeChild(node);
    };
    
};

function processOrder() {
    document.getElementById('sms_message').value = 'Спасибо за обращение в ОНЛАЙНТУРС, мы всегда Вам рады. Наш телефон: 8(800)775-33-79 www.onlinetours.ru';
    formatOrder();
};

function transformDate(dateOrString) {
    function convertMonth(month) {
	var	monthNamesShort = {
	    'янв': 0,
	    'фев': 1,
	    'мар': 2, 'март': 2,
	    'апр': 3,
	    'май': 4, 'мая': 4,
	    'июн': 5, 'июнь': 5, 'июня': 5,
	    'июл': 6, 'июль': 6, 'июля': 6,
	    'авг': 7,
	    'сен': 8, 'сент': 8,
	    'окт': 9,
	    'ноя': 10, 'нояб': 10,
	    'дек': 11
	};
	for (var key in monthNamesShort) {
	    if (monthNamesShort[key] == month) return key;
	};
	return monthNamesShort[month];
    };
    var now = new Date(),
    excl = '[^:,а-я0-9]',
    dateRE = new RegExp('(\\d?\\d)'+excl+'?'+excl+excl
			+'?(\\d?\\d|[а-я]{3,4})(?:'+excl+'?'+excl+excl+'?(\\d{4}))?'),
    timeRE = /(\d?\d):(\d\d)(?::(\d\d))?/,
    input = dateOrString,
    date = [0, 0, 0],
    time = [0, 0, 0],
    temp = [now.getDate(), now.getMonth(), now.getFullYear()],
    currentYear = temp[2],
    ms = 1,
    yearString = '',
    yearStringShort = '',
    dateString = '',
    dateStringShort = '',
    timeString = '';
    if (typeof(input) == 'object') { //date-to-string mode
	time[0] = input.getHours();
	time[1] = input.getMinutes();
	date[0] = input.getDate();
	date[1] = input.getMonth();
	date[2] = input.getFullYear();
	timeString = (' '+time[0]).slice(-2)
	    +':'+('0'+time[1]).slice(-2);
	dateString = (" "+date[0]).slice(-2)+' '+convertMonth(date[1]);
	if (date[0] != temp[0]
	    || date[1] != temp[1]
	    || date[2] != temp[2]) {
	    dateStringShort = dateString;
	};
	yearString = date[2];
	if (date[2] != temp[2]) yearStringShort = yearString;
	return {
	    time: timeString,
	    date: dateString,
	    dateShort: dateStringShort,
	    year: yearString,
	    yearShort: yearStringShort
	};
    };
    if (typeof(input) == 'string') { //string-to-date mode
	temp = dateRE.exec(input);
	if ( temp && temp.shift() ) date = temp;
	if ( isNaN(+date[1]) ) date[1] = convertMonth(date[1]);
	else date[1] -= 1;
	if (!date[2]) date[2] = currentYear;
	temp = timeRE.exec(input);
	if ( temp && temp.shift() ) time = temp;
	if (time[2] == null) {
	    ms = null;
	    time[2] = 0;
	};
	return new Date(date[2], date[1], date[0], time[0], time[1], time[2], ms);
    };
    throw 'Type error in date-string transformation, input: ' + dateOrString;
};

function strToDate(str) {
    return transformDate(str);
};

function dateToStr(date) {
    return transformDate(date);
};

function getDayBefore(days) {
    var date = new Date();
    date.setDate(date.getDate()-days);
    date.setHours(0, 0, 0);
    return date;
};

function formatOrder() {
    var archivateForm = document.querySelector('[action="/db/index.php?c=orders&m=arhivate"]');
    var archivateInput = document.querySelector('[value="В архив!"]');
    archivateInput.value = 'Архив';
    var archivateSMSInput = document.createElement('input');
    archivateSMSInput.value = 'Архив+SMS';
    archivateSMSInput.type = 'button';
    archivateSMSInput.onclick = function() {
	sendSMSForm.submit();
//	setTimeout(archivateForm.submit, 200);
	setTimeout(exit, 5000);
	return false;
    };
    var sendSMSForm = document.querySelector('[action="/db/index.php?c=orders&m=writesms"]');
    var details = document.getElementsByClassName('details')[0];
    var parent = details.tBodies[0];
    var elem = parent.children[0].children[1];
    elem.insertBefore(archivateForm, elem.children[0]);
    elem.insertBefore(archivateSMSInput, elem.children[0]);
    var rows = details.getElementsByTagName('tr');
    for (var i=0, len=rows.length; i<len; i++) {
	elem = rows[i];
	var name = elem.children[0].textContent;
	var content = elem.children[1];
	if (name == 'Заявка создана:') {
	    parent.insertBefore(elem, parent.children[0]);
	    var createdDate = strToDate(content.textContent);
	    if (createdDate > getDayBefore(5)) {
		content.style.backgroundColor = 'lavenderBlush';
	    };
	};
    };
};

