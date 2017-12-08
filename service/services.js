export default {
    getVenues : function(){
        return new Promise(function (resolve, reject) {
            fetch("https://movesync-qa.dcsg.com/dsglabs/mobile/api/venue/", {method:'GET'})
                .then(response => response.json())
                .then(function (result) {
                    resolve(result);
                })
                .catch((err) => { reject({ message: 'Something went wrong, please try agian later' }); });
        });
    }
}
    

