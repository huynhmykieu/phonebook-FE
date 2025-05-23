import React from "react";

export default function Filter({ onHandleChangeFilterName }) {
  return (
    <div>
      filter show with: <input onChange={onHandleChangeFilterName} />
    </div>
  );
}
