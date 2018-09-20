// normal the part number
function normal_part_number( part_number ){		
	var re = /\-/g;
	var value = part_number.replace(re, "");
	return value;
};
		

// check part number input
function check_part_num( func, size, value ){
	var flag = false;
	var re;
	value = value.toUpperCase();
	switch(func){
		case 0: // full check
			if( value.length == size){
				re = /[1-4]{1}[A-Z]{2}[A-Z]{3}[A-Z]{3}[0-9]{3}[0-9]{3}/;
				flag = true;
			}
			break;
		case 1: // number check
			if( value.length == size){
				switch(size){
					case 1:
						re = /[0-9]{1}/;
						flag = true;
						break;
					case 2:
						re = /[0-9]{2}/;
						flag = true;
						break;
					case 3:
						re = /[0-9]{3}/;
						flag = true;
						break;
					default:
				}
			}
			break;
		case 2: // string check
			if( value.length == size){
				switch(size){
					case 1:
						re = /[A-Z]{1}/;
						flag = true;
						break;
					case 2:
						re = /[A-Z]{2}/;
						flag = true;
						break;
					case 3:
						re = /[A-Z]{3}/;
						flag = true;
						break;
					default:
				}
			}
			break;
		case 3: // number check
			if( value.length == size){
				re = /[1-4]{1}/;
				flag = true;
			}
			break;
		default:
	}

	if(flag){
		if( value.search(re) < 0 ){
			alert("輸入錯誤");
			return false;
		}
		return true;
	}
	else{
		alert("輸入錯誤");
		return false;
	}
	
};

// check part number input no alert
function check_part_num_noshow( func, size, value ){
	var flag = false;
	var re;
	value = value.toUpperCase();
	switch(func){
		case 0: // full check
			if( value.length == size){
				re = /[1-4]{1}[A-Z]{2}[A-Z]{3}[A-Z]{3}[0-9]{3}[0-9]{3}/;
				flag = true;
			}
			break;
		case 1: // number check
			if( value.length == size){
				switch(size){
					case 1:
						re = /[0-9]{1}/;
						flag = true;
						break;
					case 2:
						re = /[0-9]{2}/;
						flag = true;
						break;
					case 3:
						re = /[0-9]{3}/;
						flag = true;
						break;
					default:
				}
			}
			break;
		case 2: // string check
			if( value.length == size){
				switch(size){
					case 1:
						re = /[A-Z]{1}/;
						flag = true;
						break;
					case 2:
						re = /[A-Z]{2}/;
						flag = true;
						break;
					case 3:
						re = /[A-Z]{3}/;
						flag = true;
						break;
					default:
				}
			}
			break;
		case 3: // number check
			if( value.length == size){
				re = /[1-4]{1}/;
				flag = true;
			}
			break;
		default:
	}

	if(flag){
		if( value.search(re) < 0 ){
			return false;
		}
		return true;
	}
	else{
		return false;
	}
	
};