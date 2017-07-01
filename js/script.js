function callback(Data){
    Data=Data.data;

}
axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(callback)