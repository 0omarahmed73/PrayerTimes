import { createContext, useCallback, useState } from "react";
import { axiosApi } from "../api/axios";
import moment from "moment";
import timezones from "timezone-abbreviations";
import useGeolocation from 'react-hook-geolocation';
export const PrayersContext = createContext();
export const PrayersProvider = ({ children }) => {
  const [newPrayer, setNewPrayer] = useState("");
  const [Hyears , setHYears] = useState(null)
  const [newTime, setNewTime] = useState("");
  const [error , setError] = useState(false)
  const methods = [
    "Muslim World League",
    "Islamic Society of North America",
    "Egyptian General Authority of Survey",
    "Umm Al-Qura University, Makkah",
    "University of Islamic Sciences, Karachi",
    "Institute of Geophysics, University of Tehran",
    "Shia Ithna-Ashari, Leva Institute, Qum",
    "Gulf Region",
    "Kuwait",
    "Qatar",
    "Majlis Ugama Islam Singapura, Singapore",
    "Union Organization islamic de France",
    "Diyanet İşleri Başkanlığı, Turkey",
    "Spiritual Administration of Muslims of Russia",
    "Moonsighting Committee",
    "Dubai, UA",
  ];
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("ar");
  const geolocation = useGeolocation()
  const [location, setLocation] = useState([]);
  const [prayers, setPrayers] = useState([]);
  
  const handleLocation = useCallback(() => {
    setLocation([geolocation.latitude, geolocation.longitude]);
  }, [geolocation.latitude, geolocation.longitude]);
  const setCounter = useCallback(() => {
    setInterval(() => {
      const momentNow = moment();
      const timeZone = moment()
      const diff = moment()['_d'].toString().includes('Summer') ? (timeZone.utcOffset() / 60) - 1 : timeZone.utcOffset() / 60
      let nextPrayer = null;
      if (prayers) {
        if (prayers.timings) {
          if (
            momentNow.isAfter(moment(prayers.timings["Fajr"], "h:mm:ss")) &&
            momentNow.isBefore(moment(prayers.timings["Dhuhr"], "h:mm:ss"))
          ) {
            nextPrayer = { ar: "صلاة الظهر", en: "Dhuhr" };
          } else if (
            momentNow.isAfter(moment(prayers.timings["Dhuhr"], "h:mm:ss")) &&
            momentNow.isBefore(moment(prayers.timings["Asr"], "h:mm:ss"))
          ) {
            nextPrayer = { ar: "صلاة العصر", en: "Asr" };
          } else if (
            momentNow.isAfter(moment(prayers.timings["Asr"], "h:mm:ss")) &&
            momentNow.isBefore(moment(prayers.timings["Maghrib"], "h:mm:ss"))
          ) {
            nextPrayer = { ar: "صلاة المغرب", en: "Maghrib" };
          } else if (
            momentNow.isAfter(moment(prayers.timings["Maghrib"], "h:mm:ss")) &&
            momentNow.isBefore(moment(prayers.timings["Isha"], "h:mm:ss"))
          ) {
            nextPrayer = { ar: "صلاة العشاء", en: "Isha" };
          } else {
            nextPrayer = { ar: "صلاة الفجر", en: "Fajr" };
          }
          setNewPrayer(nextPrayer);
          let remainingTime = null;
          if (
            moment(prayers.timings[nextPrayer.en], "h:mm:ss").diff(momentNow) >
            0
          ) {
            const time = moment(
              prayers.timings[nextPrayer.en],
              "h:mm:ss"
            ).subtract(momentNow);
            remainingTime = `${
              parseInt(moment(time).hours()) > 9
                ? (moment(time).hours() - diff)
                : "0" + (moment(time).hours() - diff)
            }
            :${
              moment(time).minutes() > 9
                ? moment(time).minutes()
                : "0" + moment(time).minutes()
            }
            :${
              moment(time).seconds() > 9
                ? moment(time).seconds()
                : "0" + moment(time).seconds()
            }`;
          } else {
            const time = moment("23:59:59", "hh:mm:ss").subtract(momentNow);
            const time2 = moment(prayers.timings["Fajr"], "h:mm:ss").subtract(
              moment("23:59:59", "hh:mm:ss")
            );
            remainingTime = `${
              parseInt(moment(time + time2).hours()) > 9
                ? moment(time + time2).hours() - diff
                : "0" + (moment(time + time2).hours() - diff)
            }
            :${
              moment(time + time2).minutes() > 9
                ? moment(time + time2).minutes()
                : "0" + moment(time + time2).minutes()
            }
            :${
              moment(time + time2).seconds() > 9
                ? moment(time + time2).seconds()
                : "0" + moment(time + time2).seconds()
            }`;
          }
          setNewTime(remainingTime);
        }
      }
    }, 1000);
  }, [prayers]);

  const handlePrayers = useCallback(
    async (method) => {
      setError(false)
      setLoading(true);
      const newLocation = [...location];
      setTimeout(async () => {
        try {
          const data = await axiosApi.get(
            `timings/${new Date().getDate()}-${
              new Date().getMonth() + 1
            }-${new Date().getFullYear()}?latitude=${newLocation[0]}&longitude=${
              newLocation[1]
            }&method=${method}`
          );
          setLocation([]);
          setPrayers(data.data.data);
          setHYears(data.data.data.date.hijri.date.split('-')[2]);
        } catch (err) {
          setError(true)
        }
        setLoading(false);
      }, 1000);
    },
    [location]
  );
  const handlePrayersManual = useCallback(
    async (values) => {
      setError(false)
      setLoading(true);
      setTimeout(async () => {
        try {
          const data = await axiosApi.get(
            `timingsByCity/${new Date().getDate()}-${
              new Date().getMonth() + 1
            }-${new Date().getFullYear()}?city=${values.city}&country=${
              values.country
            }&method=${values.methods}`
          );
          setPrayers(data.data.data);
          setHYears(data.data.data.date.hijri.date.split('-')[2]);
        } catch (err) {
          setError(true)
        }
        setLoading(false);
      }, 1000);
    },
    []
  );
  return (
    <PrayersContext.Provider
      value={{
        handlePrayers,
        setLanguage,
        language,
        prayers,
        location,
        handleLocation,
        methods,
        setLocation,
        loading,
        newPrayer,
        setCounter,
        newTime,
        handlePrayersManual,
        error,
        setError,
        Hyears
      }}
    >
      {children}
    </PrayersContext.Provider>
  );
};
