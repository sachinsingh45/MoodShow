export const checkValidity = (email, password) =>{
    const validEmail = /^(?!.*\.{2})[a-zA-Z0-9][a-zA-Z0-9#$%&\*\+-/=\?\_`|~]*@[a-zA-Z0-9][a-zA-Z0-9-_.]*\.[a-zA-Z]{2,4}$/.test(email);
    const passValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);
    if(!validEmail){
        return "Email is not valid";
    };
    if(!passValid){
        return "Password is not valid";
    }
    return 0;
}