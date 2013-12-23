if (/index\.php\?c=orders&m=l&st=unassigned&budget=0&fcity=0&ftime=2&q=50/.test(window.location.href)) {
	processList();
};
if (/index\.php\?c=orders&m=l&st=forcheck&budget=0&fcity=1&ftime=all&q=50/.test(window.location.href)) {
	processList();
}
if (/index\.php\?c=orders&m=order&id=/.test(window.location.href)) {
	processOrder();
};

function processList() {
	
	console.log('processing list');
	
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
	
	console.log('processing order');
	
	document.getElementById('sms_message').value = 'Спасибо за обращение в ОНЛАЙНТУРС, мы всегда Вам рады. Наш телефон: 8(800)775-33-79 www.onlinetours.ru';

};
