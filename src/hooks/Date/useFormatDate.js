import { useEffect, useState } from "react";

export default function useFormatDate(initialDate) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatDate = (dateString) => {
      let date = new Date(dateString);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      const formattedDateString = `${day}/${month}/${year}`;
      return formattedDateString;
    };

    setFormattedDate(formatDate(initialDate));
  }, [initialDate]);

  return formattedDate;
}
