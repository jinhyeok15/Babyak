import { useEffect, useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  validate?: (value: string) => void;
}

const SearchBar = ({
  placeholder,
  value,
  onChange,
  validate
}: Props) => {
  const [_value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (validate) {
      try {
        validate(value);
      } catch {
        return;
      }
    }
    setValue(value);
  }

  const handleClearClick = () => {
    setValue('');
  }

  useEffect(() => {
    onChange(_value);
  }, [_value]);

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={_value}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
        onClick={handleClearClick}
      >
        <ClearIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
