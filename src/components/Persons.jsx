import React from "react";

export default function Persons({ filterPersons, deletePerson }) {
  return (
    <div>
      {filterPersons.map((p) => (
        <div key={p.id}>
          {p.name} {p.number}{" "}
          <button onClick={() => deletePerson(p.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}
