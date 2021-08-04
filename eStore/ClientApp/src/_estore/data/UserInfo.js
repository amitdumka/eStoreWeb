
var userInfo={
    fc:'',
    fullName:"", 
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
    role:null, 
    lastLogin:"",
    uid:"",
    createdAt:"",
    authDomain: ""
};

export function GetUserInfo(user){
    userInfo.uid=user.uid;
    userInfo.fullName = user.displayName;
    userInfo.email = user.email;
    userInfo.photoURL = user.photoURL;
    userInfo.emailVerified = user.emailVerified;
    userInfo.lastLogin=user.lastLoginAt;
    userInfo.authDomain = user.authDomain;
    userInfo.createdAt=user.createdAt;
    userInfo.fc=user.displayName[0];
return userInfo;
}
