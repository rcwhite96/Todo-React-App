import React from "react";
import Toggle from "react-toggle";

export const LightToggle = () => {
    const [isLight, setIsLight] = useState(true);

    return (
        <Toggle 
        className="LightToggle"
        icons={{checked:"☀️", unchecked:"🌙"}}
        checked={isLight}
        onChange={event=>setIsLight(event.target.checked)}
        aria-label="Light mode"
        />
    )
}