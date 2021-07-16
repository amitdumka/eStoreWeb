export default function DateFormater(value){
    const datevalue=value+"";
    if(value!=null){
        var curDate= new Date(datevalue);
         return curDate.toLocaleDateString();
        
    }
  }

  