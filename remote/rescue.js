document.body.style.backgroundColor = 'linen';
var agent = {};
var order = {};
if (/index\.php\?c=orders&m=l&st=unassigned&budget=0&fcity=0&ftime=2&q=50/.test(window.location.href)) {
    processList();
};
if (/index\.php\?c=orders&m=l&st=forcheck&budget=0&fcity=1&ftime=all&q=50/.test(window.location.href)) {
    processList();
}
if (/index\.php\?c=orders&m=order&id=/.test(window.location.href)) {
    processOrder();
};
function dateToStr(date) {
    return transformDate(date);
};
function exit() {
    window.open("","_self");
    window.close()
};
function formatOrder() {
    var step = 200;
    var delay = 0;
    var loadDelay = 3000;
    var onsite = document.querySelector('[style="width:250px;height:44px; display:block; background:url(../../images/b_onsite.jpg); float:right; margin-right:150px;"]');
    var inwork = document.querySelector('td[width="300"]>p>a');
    if (onsite || inwork) {
	document.body.style.backgroundColor = 'honeyDew';
	setTimeout(exit, 10*loadDelay);
    };
    var globalMessageBox = document.getElementById('globalmessagebox');
    hide(globalMessageBox);
    var ajaxSending = document.getElementById('ajax_sending');
    hide(ajaxSending);
    var globalSearchBox = document.getElementById('globalsearchbox');
    hide(globalSearchBox);
    var header = document.getElementById('header');
    hide(header);
    var content = document.getElementById('content');
    content.style.paddingTop = 0;
    var scroller = document.querySelector('[style="padding: 5px 250px;position: absolute;top: 70px;"]');
    hide(scroller);
    var search = document.querySelector('[name="otsmsearch_city"]');
    if (search) {
	search = search.parentNode;
	hide(search);
    };
    var changeCp = document.querySelector('[action="/db/index.php?c=orders&m=changecp"]');
    hide(changeCp);
    setTimeout(function() {
	var utcClock = document.getElementById('utcclock');
	if (utcClock) {
	    var clientTime = strToDate(utcClock.textContent).getHours();
	};
	if (clientTime<9 || clientTime>21) {
	    utcClock.style.color = 'white';
	    utcClock.style.backgroundColor = 'crimson';
	    document.body.style.backgroundColor = 'lavenderBlush';
	    setTimeout(exit, 10*loadDelay);
	};
    }, loadDelay);
    var abuseLink = document.querySelector('td>a[href^="javascript:getAbuse("]');
    hide(abuseLink);
    var contactsCell = abuseLink.parentNode;
    [].forEach.call(contactsCell.querySelectorAll('br+br, a+br'), function(el) {el.style.display = 'none';});
    var getSMSFunc = new Function( contactsCell.innerHTML.match(/getSMS\(.*?\);/)[0] );
    var elem = document.querySelector('[id="pers_info_agent"]').children[0];
    agent.id = elem.href.match(/\d+$/)[0];
    order.id = location.href.match(/\d+$/)[0];
    var archivateForm = document.querySelector('[action="/db/index.php?c=orders&m=arhivate"]');
    function archivate() {archivateForm.submit()};
    var sendSMSForm = document.querySelector('[action="/db/index.php?c=orders&m=writesms"]');
    var submitSMS = function() {
	sendSMSForm.submit();
    };
    var archivateInput = document.querySelector('[value="В архив!"]');
    var details = document.getElementsByClassName('details')[0];
    var parent = details.tBodies[0];
    var child = parent.children[1];
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.setAttribute('colspan', '2');
    tr.appendChild(td);
    parent.insertBefore(tr, child);
    var sentSmsList = document.querySelector('td>h3+ul>li>strong');
    if (sentSmsList) {
	sentSmsList = sentSmsList.parentNode.parentNode;
	td.appendChild(sentSmsList);
    };
    var callsList = document.querySelector('td>h3+ul>li>object');
    if (callsList) {
	callsList = reverseList(callsList.parentNode.parentNode);
	td.appendChild(callsList);
    };
    elem = parent.children[0].children[1];
    var notInterested = createStatusButton('Не актуально', 'НЕАКТ', true);
    elem.insertBefore(notInterested, elem.children[0]);
    var transfer = createStatusButton('Актуально', 'АКТ', false);
    elem.insertBefore(transfer, elem.children[0]);
    var returnInWork = createStatusButton('Реинкарнация', 'РЕИНК', false);
    elem.insertBefore(returnInWork, elem.children[0]);
    var notAnswering = createStatusButton('Не отвечает', 'НЕОТВ', true);
    elem.insertBefore(notAnswering, elem.children[0]);
    var veryBusy = createStatusButton('Очень занят', 'ОЧЗАН', true);
    elem.insertBefore(veryBusy, elem.children[0]);
    if (archivateInput) {
	archivateInput.value = 'Архив';
	archivateForm.style.display = 'inline-block';
	var archivateSMSButton= document.createElement('button') ;
	archivateSMSButton.textContent = 'Архив+SMS';
	archivateSMSButton.style.fontSize = '10px';
	archivateSMSButton.onclick = function() {
	    delay = 0;
	    delay += step;
	    setTimeout(getSMSFunc, delay);
	    delay += step;
	    setTimeout(submitSMS, delay);
	    delay += step;
	    setTimeout(archivate, delay);
	    delay += step;
	    setTimeout(exit, delay);
	};
	elem.insertBefore(archivateForm, elem.children[0]);
	elem.insertBefore(archivateSMSButton, elem.children[0]);
    };
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
		document.body.style.backgroundColor = 'honeyDew';
		setTimeout(exit, 10*loadDelay);
	    };
	};
    };
    ClientHistory(order.id, 1);
};
function createStatusButton(description, shortName, requiresSMS) {
    var button = document.createElement('button');
    button.textContent = shortName;
    button.style.fontSize = '10px';
    button.onclick = function() {
	delay = 0;
	if (requiresSMS) {
	    delay += step;
	    setTimeout(getSMSFunc, delay);
	    delay += step;
	    setTimeout(submitSMS, delay);
	};
	delay += step;
	setTimeout(archivate, delay);
	delay += step;
	setTimeout(exit, delay);
	prompt('Статус:', order.id + ' ' + description);
    };
    return button;
};
function getDayBefore(days) {
    var date = new Date();
    date.setDate(date.getDate()-days);
    date.setHours(0, 0, 0);
    return date;
};
function hide(elem) {
    if (elem) {
	elem.style.display = 'none';
    };
};
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
function reverseList(list) {
    if (list==null) {
	return;
    };
    var ul = document.createElement('ul');
    for (var i=list.children.length; i--;) {
	var li = list.children[i];
	ul.appendChild(li);
    };
    return ul;
};
function strToDate(str) {
    return transformDate(str);
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

