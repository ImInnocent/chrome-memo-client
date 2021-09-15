export default function dateFormat(date: Date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return date.getFullYear() + '-' 
    + (month >= 10 ? month.toString() : '0' + month.toString()) + '-' 
    + (day >= 10 ? day.toString() : '0' + day.toString());
}
