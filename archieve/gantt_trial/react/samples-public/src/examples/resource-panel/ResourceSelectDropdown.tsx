import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

type ResourceSelectDropdownProps = {
  resources: any[];
  initialValue: string | null;
  onChange: ((resourceId: string | null) => void);
};

export default function ResourceSelectDropdown({
  resources,
  initialValue,
  onChange
}: ResourceSelectDropdownProps) {

  const [selectedValue, setSelectedValue] = useState<string | null>(initialValue);
  const handleChange = (e: any) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value === 'all') {
      onChange(null);
    } else {
      onChange(value);
    }
  };

  return (
    <FormControl variant="outlined" size="small">
      <InputLabel id="resource-select-label">Resource</InputLabel>
      <Select
        labelId="resource-select-label"
        label="Resource"
        value={selectedValue || "all"}
        onChange={handleChange}
        style={{ minWidth: 200 }}
      >
        <MenuItem value="all">All Resources</MenuItem>
        {resources.map((res) => (
          <MenuItem value={String(res.id)} key={res.id}>
            {res.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
