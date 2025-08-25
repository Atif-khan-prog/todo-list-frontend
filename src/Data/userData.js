let Data = []

export function importData(title, desciption){
    
    let newEntry = {ID:Date.now(), title: title, description: desciption};

    Data.push(newEntry);
    return Data
    
}

export function getData(){
    return Data;
}