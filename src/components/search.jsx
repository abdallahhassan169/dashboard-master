import { Button, TextField } from "@mui/material";
import React from "react";

export default function Search({ onSubmit }) {
  const [query, setQuery] = React.useState("");

  const onSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(query);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "10px auto",
        display: "flex",
      }}
    >
      <Button
        variant="contained"
        style={{ flex: "none", height: "55px" }}
        onClick={handleSubmit}
      >
        Search
      </Button>
      <TextField
        style={{ marginBottom: "10px", width: "100%", marginLeft: "8px" }}
        variant="outlined"
        label="Search"
        value={query}
        onChange={onSearchChange}
      />
    </div>
  );
}
