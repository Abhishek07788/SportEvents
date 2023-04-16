import { useEffect, useState } from "react";

export const useDateTime = () => {
  const [isEventExpired, setIsEventExpired] = useState(false);
  const [eventDetail, setEventDetail] = useState();

  //--------- handle Time ------
  const futureDate = new Date(
    `${eventDetail?.date || "2050-04-20"}T${eventDetail?.time || "19:00"}`
  );
  
  const now = new Date();
  const timeDiff = futureDate.getTime() - now.getTime();

  useEffect(() => {
    if (timeDiff > 0) {
      setIsEventExpired(false);
    } else {
      setIsEventExpired(true);
    }
  }, [timeDiff]);

  return [isEventExpired, setEventDetail];
};
