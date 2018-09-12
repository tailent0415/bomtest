// get part attributes
function get_doc_part_attr( part_obj ){
	var attr={};
	var param_value = "";
	for (i = 0; i < part_obj.length; i++) {
		param_value = part_obj[i].value;
			switch(part_obj[i].name){
				case "part_num_list":
					if( check_part_num( 0, 15, normal_part_number( param_value ) ) ) {
						attr.number = param_value;
					}
					else{
						alert( "無此品號" );
						return false;
					}
					break;
				case "part_name":
					if ( param_value == "" ){
						part_obj[i].style.border = '1px solid #FF0000';
						alert( "請輸入必填資料" );
						return false;
					}
					else{
						part_obj[i].style.border = '1px solid #AAAAAA';
						attr.name = param_value;
					}
					break;
				case "part_format":
					attr.format = param_value;
					break;
				case "part_fignum":
					attr.fignum = param_value;
					break;
				case "part_supplier":
					attr.supplier = param_value;
					break;
				case "part_contact":
					attr.contact = param_value;
					break;
				case "part_phone":
					attr.phone = param_value;
					break;
				case "part_address":
					attr.address = param_value;
					break;
				case "part_url":
					attr.url = param_value;
					break;
				case "part_unit":
					attr.unit = param_value;
					break;
				case "part_cost":
					attr.cost = param_value;
				case "part_quantity":
					attr.stock_quantity = param_value;
					break;
				case "part_remark":
					attr.remark = param_value;
					break;
				case "part_location":
					attr.location = param_value;
					break;
				case "part_goal":
					attr.goal = param_value;
					break;
				case "part_varval":
					attr.varval = param_value;
				case "part_totalcost":
					attr.totalcost = param_value;
					break;
				default:
			}

	}
	return attr;
}


// get json array
function get_json_array( data_array ){
	json_array = JSON.stringify( data_array );
	return json_array
}