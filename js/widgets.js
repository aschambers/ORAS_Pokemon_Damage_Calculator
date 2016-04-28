function attach(widgets) {
	for (var i = 0, j = widgets.length; i < j; i++) {
		if (window.ActiveXObject) {
			widgets[i].attachEvent('onchange', calc);
			widgets[i].attachEvent('onclick', calc);
			widgets[i].attachEvent('onkeydown', calc);
			widgets[i].attachEvent('onkeypress', calc);
			widgets[i].attachEvent('onkeyup', calc);
		}
		else {
			widgets[i].addEventListener('change', calc, false);
			widgets[i].addEventListener('click', calc, false);
			widgets[i].addEventListener('keydown', calc, false);
			widgets[i].addEventListener('keypress', calc, false);
			widgets[i].addEventListener('keyup', calc, false);
		}
	}
}

attach(document.getElementsByTagName('input'));
attach(document.getElementsByTagName('select'));
calc();