import React from "react";

export default function Notification({message}) {
  return (
    <div>
      {message && (
        <div className={message.type === "success" ? "success" : "error"}>
          {message.text}
        </div>
      )}
    </div>
  );
}
