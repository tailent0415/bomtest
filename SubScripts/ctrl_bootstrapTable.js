// set table font style
function set_table_font(row, index) {
    return {
	   css: {"font-family": "Monospace, Courier New, sans-serif"}
    };
}

// set serial table style
function set_serial_table_style(row, index) {
    var color_val = "#FFFFFF";
    switch ( row.mostate.trim() ){
        case "complete":
            color_val = "#7FFFD4";
            break;
        case "incomplete":
            color_val = "#F08080";
            break;
        default:
    };
    return {
	   css: { "font-family": "Monospace, Courier New, sans-serif","background-color":color_val }
    };
}

// set table part number input type
function set_table_partnum_input_type( table_ref, curr_type, idx, source_val ){
    switch( curr_type ){
        case "static":
            var param = table_ref.bootstrapTable( 'getRowByUniqueId', idx );
            (param.number.val == "undefined")?( param_val = "" ):( param_val = param.number.val );
            return param_val;
        case "dynamic":
            if( check_part_num_noshow( 0, 15, normal_part_number( source_val ) ) ){
                var data = table_ref.bootstrapTable( 'getData', false );
                var same_check = true;
                for (var i=0; i<data.length; i++){
                    if( i != idx ){
                        if( data[i].number.val == source_val ){
                            same_check = false;
                            break;
                        }
                    }
                }
                if(same_check){
                    var param = {
                        "index": idx,
                        "value": source_val,
                        "tabID": table_ref
                    }
                    return param;
                }
                else{
                    alert( "請勿輸入相同品號" );
                    return false;
                }
            }
            break;
        default:
    };
    return false;
}


// add table new row
function add_table_part_row( type, idx ){
	var rows = [];
	switch( type ){
		case "add_product":
			var num_param ={
				"func": 1,
				"val": "undefined"
			};
			rows.push({
				index: idx,
				number: num_param,
				name: "",
				quantity: "",
				cost: "",
				totalcost: "",
				supplier: "",
				format: "",
				delrow: ""
			});
			break;
		default:
	};
	return rows;
}


// update table total cost
function upd_total_cost( cnt, table_ref, idx, val ){
	var attr = table_ref.bootstrapTable('getRowByUniqueId', idx );
	
	if ( isNaN( parseInt( val ) ) ){
		val = 0;
	}
	if( typeof attr.cost !== "number"){
		attr.cost = 0;
	}
	
	var quan_param ={
		"func": 1,
		"val": val
	};
	
	table_ref.bootstrapTable('updateRow', {
		index: idx,
		row: {
			"quantity": quan_param,
			"totalcost": attr.cost * val,
		}
	});
	
	var data_attr = table_ref.bootstrapTable("getData",false);
	var product_cost = 0;
	var value = 0;
	for( var i = 0; i<data_attr.length; i++ ){
		value = parseFloat( data_attr[i].totalcost );
		if( isNaN(value) ){
			value = 0;
		}
		product_cost += value;
	}
	
	var part_attr = cnt.getElementsByClassName("part_attr");
	for( var i=0; i<part_attr.length; i++ ){
		if( part_attr[i].name == "part_totalcost" ){
			part_attr[i].value = product_cost;
		}
	}
	
}


// remove table index row
function rem_table_row( table_ref, idx ){
	var attr = table_ref.bootstrapTable('getRowByUniqueId', idx );
	
	table_ref.bootstrapTable('remove', {
		field: "index",
		values: Array.of(idx)
	});
	
	var i = 1;
	while( attr !== null ){
		var replace_index = idx+i-1;
		table_ref.bootstrapTable('updateRow', {
			index: replace_index,
			row: {
				index: replace_index,
			}
		});
		attr = table_ref.bootstrapTable('getRowByUniqueId', idx+i+1 );
		i++;
	}
}

function create_div_node( class_id, class_attr ){
    var new_node = document.createElement( "div" );
    if ( class_id != "" ){
        new_node.id = class_id;
    }
    new_node.setAttribute( "class", class_attr );
    return new_node;
}

