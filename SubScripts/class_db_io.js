class db_io {
    constructor( cnt_ref, table_ref ) {
        this.cnt_ref = cnt_ref;
        this.table_ref = table_ref;
    };
    
    
    
    /*************   Add   *************/
    // Add new data
    AddNewData() {
        var Param = {"state": "add_newdata"};
        return Param;
    }

    // Add new mo data
    AddMOData() {
        var Param = {"state": "add_mo_data"};
        return Param;
    }
    
    
    // Add inventory quantity
    AddInventoryQuan() {
        var Param = {"state": "add_inventory_quantity"};
        return Param;
    }
    
    
    
    
    
    
    
    
    /*************   Replace   *************/
    // Replace Data
    RepData() {
        var Param = {"state": "replace_data"};
        return Param;
    }
    
    // Replace Data
    RepMoData() {
        var Param = {"state": "replace_mo_info"};
        return Param;
    }

    /*************   Generate   *************/
    // Gen MO
    GenMO() {
        var Param = {"state": "generate_new_mo"};
        return Param;
    }

    
    
    
    /*************   Set   *************/
    // Set Supplier Information
    SetSupplierInfo() {
        var Param = {"state": "set_supplier_info"};
        return Param;
    }
    
    
    
    /*************   Get   *************/
    // Get part detail
    GetPartDetail() {
        var Param = {"state": "get_all_data"};
        return Param;
    }
    
    // Get a part detail
    GetSinglePartDetail() {
        var Param = {"state": "get_single_data"};
        return Param;
    }
    
    // Get part number
    GetPartNum() {
        var Param = {"state": "get_all_partnum"};
        return Param;
    };
    
    // Get Manifest number
    GetManifestNum() {
        var Param = {"state": "get_all_manifest_number"};
        return Param;
    };
    
    
    // Get make order format struct
    GetMOStruct(){
        var Param = {"state": "get_mo_struct"};
        return Param;
    };
    
    // Get all make order infomation
    GetAllMOInfo() {
        var Param = {"state": "get_mo_all_info"};
        return Param;
    };
    
    // Get single make order infomation
    GetMOInfo() {
        var Param = {"state": "get_mo_single_info"};
        return Param;
    };
    
    // Get supplier name
    GetSupplierName() {
        var Param = {"state": "get_all_supplier_name"};
        return Param;
    };
    
    // Get record data
    GetRecord() {
        var Param = {"state": "get_record_data"};
        return Param;
    };
    
    // Get Supplier Data
    GetSupplierDetail() {
        var Param = {"state": "get_supplier_info"};
        return Param;
    };
    
    
    // Get Supplier Data
    GetSupplierData() {
        var Param = {"state": "get_supplier_data"};
        return Param;
    };
    
    
    GetSNInbound(){
        var Param = {"state": "get_sn_inbound"};
        return Param;
    };
    
    
    
    /*************   Remove   *************/
    // Remove record data
    RemRecord(){
        var Param = {"state": "rem_record_data"};
        return Param;
    };
    
    // Remove record data
    RemSupplierData(){
        var Param = {"state": "rem_supplier_data"};
        return Param;
    };
    
    // Remove mo data
    RemMOData(){
        var Param = {"state": "rem_mo_data"};
        return Param;
    };
};