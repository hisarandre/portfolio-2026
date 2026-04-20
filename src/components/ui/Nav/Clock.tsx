import { useState, useEffect } from "react";
import { useLang } from "../../../context/LangContext.tsx";

export default function Clock() {
    const { lang } = useLang();
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () => {
            const d = new Date();

            switch (lang) {
                case "fr": {
                    const hh = d.getHours().toString().padStart(2, "0");
                    const mm = d.getMinutes().toString().padStart(2, "0");
                    setTime(`( ${hh}:${mm} )`);
                    break;
                }
                case "en": {
                    const hours = d.getHours();
                    const mm = d.getMinutes().toString().padStart(2, "0");
                    const period = hours >= 12 ? "PM" : "AM";
                    const h = hours % 12 || 12;
                    setTime(`( ${h}:${mm} ${period} )`);
                    break;
                }
                case "ko": {
                    const hours = d.getHours();
                    const mm = d.getMinutes().toString().padStart(2, "0");
                    const period = hours >= 12 ? "오후" : "오전";
                    const h = hours % 12 || 12;
                    setTime(`( ${period} ${h}:${mm} )`);
                    break;
                }
            }
        };

        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [lang]);

    return <span>{time}</span>;
}