import React from "react";

export default function PersonForm({
  newName,
  newNumber,
  onHandleChangeName,
  onHandleChangeNumber,
  addPerson,
}) {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={onHandleChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onHandleChangeNumber} />
      </div>
      <button type="submit">add</button>
    </form>
  );
}
