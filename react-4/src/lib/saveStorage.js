import AV from './leancloud'


export default function(data,objId){
    let dataString = JSON.stringify(data);
    let post;
    if (!objId){     
        let ac1 = new AV.ACL();
        ac1.setReadAccess(AV.User.current(),true);
        ac1.setWriteAccess(AV.User.current(),true);   
        let Post = AV.Object.extend('MyTodos');
        post = new Post();
        post.setACL(ac1);  
        console.log('Saving')    
    } else {
        post = AV.Object.createWithoutData('MyTodos',objId);
        console.log('Updating')
    }
    post.set('content',dataString);       
    return post.save();
    
}