export const makeGoodDate = () => {
    const date = new Date();

    let year, month, day, hours, minutes;

    year = (date.getFullYear()).toString();
    month = (date.getMonth()).toString();
    day = (date.getDate()).toString();
    hours = (date.getHours()).toString();
    minutes = (date.getMinutes() < 10 ? "0" + (date.getMinutes()).toString() : date.getMinutes()).toString();
    
    const declareSuffix = (day) => {
      let suffixes = ["st", "nd", "rd", "th"];
      day = day.toString();
      if(day.length <= 1) day = `0${day}`
      switch(day[0]){
          default: 
            switch(day[1]){
              case "1": return suffixes[0];
              case "2": return suffixes[1];
              case "3": return suffixes[2];
              default: return suffixes[3];
            }
          case "1": return suffixes[3]; 
      }
    }

    const declareMonth = (numericalMonth) => {
        let array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return array[numericalMonth];
    }
  
    // 18:33, 23rd May 2023
    
    let str = `${hours}:${minutes}, ${day}${declareSuffix(day)} ${declareMonth(month)} ${year}`;
    return str;
}