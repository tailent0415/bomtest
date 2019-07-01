// normal the part number
function normal_part_number( part_number ){		
	var re = /\-/g;
	var value = part_number.replace(re, "");
	return value;
};
		

// check part number input
function check_part_num( func, size, value ){
	var re;
	value = value.toUpperCase();
    if( value.length !== size ){
        alert( "輸入品號格式長度有誤" );
        return false;
    }
    switch(func){
        case 0: // full check
            re = /[1-3]{1}[A-Z]{2}[A-Z]{3}[A-Z]{3}[0-9]{3}[0-9]{3}/;
            break;
        case 1: // number check
            switch(size){
                case 1:
                    re = /[0-9]{1}/;
                    break;
                case 2:
                    re = /[0-9]{2}/;
                    break;
                case 3:
                    re = /[0-9]{3}/;
                    break;
                default:
            }
            break;
        case 2: // string check
            switch(size){
                case 1:
                    re = /[A-Z]{1}/;
                    break;
                case 2:
                    re = /[A-Z]{2}/;
                    break;
                case 3:
                    re = /[A-Z]{3}/;
                    break;
                default:
            }
            break;
		case 3: // class check
            re = /[1-3]{1}/;
			break;
    }
    
    if( value.search(re) < 0 ){
        alert( "輸入品號格式錯誤" );
        return false;
    }
    
    return true;
};


// check part number input no alert
function check_part_num_noshow( func, size, value ){
	var re;
	value = value.toUpperCase();
    if( value.length !== size ){
        return false;
    }
    switch(func){
        case 0: // full check
            re = /[1-3]{1}[A-Z]{2}[A-Z]{3}[A-Z]{3}[0-9]{3}[0-9]{3}/;
            break;
        case 1: // number check
            switch(size){
                case 1:
                    re = /[0-9]{1}/;
                    break;
                case 2:
                    re = /[0-9]{2}/;
                    break;
                case 3:
                    re = /[0-9]{3}/;
                    break;
                default:
            }
            break;
        case 2: // string check
            switch(size){
                case 1:
                    re = /[A-Z]{1}/;
                    break;
                case 2:
                    re = /[A-Z]{2}/;
                    break;
                case 3:
                    re = /[A-Z]{3}/;
                    break;
                default:
            }
            break;
		case 3: // class check
            re = /[1-3]{1}/;
			break;
    }
    
    if( value.search(re) < 0 ){
        return false;
    }
    
    return true;
};