import AV from 'leancloud-storage'

var APP_ID = 'Pq3DXIDAnJGs2ihtPbyIbHm4-gzGzoHsz';
var APP_KEY = 'M3KNWQIgQfhiAnCRHAWlxfBT';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV;

export function signUp(username,password,successFn,errorFn){
  //新建AVUser 对象实例
  var user = new AV.User();
  //设置用户名
  user.setUsername(username)
  //设置密码
  user.setPassword(password)
  //设置邮箱
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn(user)
  },function(error){
    errorFn.call(null,error)
  })
}  
export function signIn(username,password,successFn,errorFn){
  AV.User.logIn(username,password).then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })

  return undefined
}

export function signOut(){
  AV.User.logOut()
  return undefined
}

export function getCurrentUser(){
  let current = AV.User.current();
  
  if(current){
    let {id,createdAt,attributes:{username}} = current
    return {id,username,createdAt}
  }else{
    return null
  }
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id,
    ...AVUser.attributes
  }
}