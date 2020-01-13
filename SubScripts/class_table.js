var table_obj, thead_obj, tbody_obj;


function init_table(){
    table_obj = document.createElement( "table" );
    thead_obj = document.createElement( "thead" );
    tbody_obj = document.createElement( "tbody" );
    table_obj.border = "1";
    table_obj.appendChild( thead_obj );
    table_obj.appendChild( tbody_obj );
    return table_obj;
}

function set_table_object( curr_table_obj ){
    table_obj = curr_table_obj;
    thead_obj = curr_table_obj.getElementsByTagName( "thead" )[0];
    tbody_obj = curr_table_obj.getElementsByTagName( "tbody" )[0];
    return table_obj;
}



function add_table_header( head_arr ){
    if ( Array.isArray( head_arr ) == false ){
        alert( "add table header error" )
        return;
    };
    
    let head_str = "";
    tr_obj = document.createElement( "tr" );
    
    const head_len = head_arr.length;
    for( let i=0; i<head_len; i++ ){
        head_str += head_arr[i];
    }
    
    tr_obj.innerHTML = head_str;
    thead_obj.appendChild( tr_obj );
}

function add_table_data( data_arr ){
    if ( Array.isArray( data_arr ) == false ){
        alert( "add table data error" )
        return;
    };
    
    const row_len = data_arr.length;   
    const column_len = data_arr[0].length;
    let data_str = "";
    

    for( let i=0; i<row_len; i++ ){
        let tr_obj = document.createElement( "tr" );
        data_str = "";
        
        for( let j=0; j<column_len; j++ ){
            if( data_arr[i][j] === undefined ){
                break;
            }
            data_str += data_arr[i][j];
        }
        tr_obj.innerHTML = data_str;
        tbody_obj.appendChild( tr_obj );
    }
}


// add new data for row
function add_table_row_data( data_arr ){
    if ( Array.isArray( data_arr ) == false ){
        alert( "add table row data error" )
        return;
    };
    const data_len = data_arr[0].length;
    
    for( var i=0; i<data_len; i++ ){
        data_str += data_arr[i];
    }
    
    tr_obj = document.createElement( "tr" );
    tr_obj.innerHTML = data_str;
    tbody_obj.appendChild( tr_obj );
}


function get_table_data( index ){
    if (index === "all"){
        var data_arr = get_table_all_data();
        return data_arr;
    }
}

function get_table_all_data(){
    const tr_arr = tbody_obj.childNodes;
    const row_len = tr_arr.length;
    const col_len = tr_arr[0].childNodes.length;
    var data_arr = new Array(row_len);
    
    for( i=0; i<row_len; i++ ){
        data_arr[i] = new Array(col_len);
        for( j=0; j<col_len; j++ ){
            data_arr[i][j] = tr_arr[i].childNodes[j].childNodes[0];
        }
    }
    return data_arr;
}
