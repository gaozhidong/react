import AV from './leancloud'

export default function(){
    let query = new AV.Query('MyTodos');
    return query.find().then((data)=>{ 
        data = data[0];
        if (data){
            let content = JSON.parse(data.attributes.content);      
            let objId = data.id;
            return {
                content: content,
                objId: objId
            };
        } else {
            return false;
        }
    },(err)=>{
        console.log('something wrong in reading:',err);
    })
}