// set table font style
function set_table_font(row, index) {
  return {
	css: {"font-family": "Monospace, Courier New, sans-serif"}
  };
}

// update table row
function upd_table_part_row( table_refnum, type, idx ){	
	switch( type ){
		case "add_product":
			var num_param ={
				func: 1,
				val: "undefined"
			};
			
			var quan_param ={
				func: 1,
				val: 0
			};
			
			table_refnum.bootstrapTable('updateRow', {
				index: idx,
				row: {
					index: idx,
					number: num_param,
					name: "",
					quantity: quan_param,
					cost: "",
					supplier: "",
					format: ""
				}
			});
			
			break;
		default:
	};
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
function upd_total_cost( table_refnum, idx, val ){
	var attr = table_refnum.bootstrapTable('getRowByUniqueId', idx );
	
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
	
	table_refnum.bootstrapTable('updateRow', {
		index: idx,
		row: {
			"quantity": quan_param,
			"totalcost": attr.cost * val,
		}
	});
}


// remove table index row
function rem_table_row( table_refnum, idx ){
	var attr = table_refnum.bootstrapTable('getRowByUniqueId', idx );
	
	table_refnum.bootstrapTable('remove', {
		field: "index",
		values: Array.of(idx)
	});
	
	var i = 1;
	while( attr !== null ){
		var replace_index = idx+i-1;
		table_refnum.bootstrapTable('updateRow', {
			index: replace_index,
			row: {
				index: replace_index,
			}
		});
		attr = table_refnum.bootstrapTable('getRowByUniqueId', idx+i+1 );
		i++;
	}
}