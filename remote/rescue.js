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