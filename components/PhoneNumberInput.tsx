import { Stack, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface Props {
  onChange: (value: string) => void;
}

const PhoneNumberInput = ({
  onChange
}: Props) => {
  const [first, setFirst] = useState<string>('');
  const [second, setSecond] = useState<string>('');
  const [third, setThird] = useState<string>('');

  useEffect(() => {
    onChange(first + second + third);
  }, [first, second, third]);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField id="first" variant="outlined" size="small"
        inputProps={{
          style: { textAlign: 'center' }
        }}
        value={first}
        onChange={(e) => {
          const value = e.target.value;
          if (isNaN(Number(value))) {
            return;
          }
          if (value.length > 3) {
            return;
          }
          setFirst(value);
        }}
      />
      <p>-</p>
      <TextField id="second" variant="outlined" size="small"
        inputProps={{
          style: { textAlign: 'center' }
        }}
        value={second}
        onChange={(e) => {
          const value = e.target.value;
          if (isNaN(Number(value))) {
            return;
          }
          if (value.length > 4) {
            return;
          }
          setSecond(value);
        }}
      />
      <p>-</p>
      <TextField id="third" variant="outlined" size="small"
        inputProps={{
          style: { textAlign: 'center' }
        }}
        value={third}
        onChange={(e) => {
          const value = e.target.value;
          if (isNaN(Number(value))) {
            return;
          }
          if (value.length > 4) {
            return;
          }
          setThird(value);
        }}
      />
    </Stack>
  );
};

export default PhoneNumberInput;
