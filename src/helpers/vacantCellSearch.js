export default function vacantCellsSearch (id, obj, getObj = false)  {
    let status = false, desiredObj = null;
    for (let i in obj) {
        status = obj[i].hasOwnProperty(id);
        if(status) {
            desiredObj = obj[i][id]
            break
        }
    }
    if (!getObj) {
        return status
    } else {
        return desiredObj
    }
}