const defStrings ={
    dataURL: "http://localhost:3000/users/"
};

async function Read() {
    try {
        let response = await axios.get(defStrings.dataURL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
  
async function Update(user) {
    let userUrl=`${defStrings.dataURL}${user.id}`
    try {
        let response = await axios.put(userUrl, user);
    } catch (error) {
        console.error(error);
    }
}
  
async function Delete(userID) {
    let userUrl=`${defStrings.dataURL}${userID}`
    try {
        let response = await axios.delete(userUrl);
    } catch (error) {
        console.error(error);
    }
}

async function Create(user) {
    try {
        let response = await axios.post(defStrings.dataURL, user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
  
export {
    Read,
    Update,
    Delete,
    Create
};