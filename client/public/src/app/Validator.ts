export default function Validator(data){
    let errors = [];

    if(data.error || data.message){
      errors.push(data.message);
      for(let error in data.error) errors.push(data.error[error].message);
      return errors;
    }else{
      return false;
    }
}
