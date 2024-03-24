"use client";

import { useCallback, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserModel, useAddUserMutation } from "@/libs/query/users.query";
import PhoneNumberInput from "@/components/PhoneNumberInput";

const UserAddForm = () => {
  const { mutateAsync } = useAddUserMutation();

  const [typeValue, setTypeValue] = useState<string>("선배");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const handlePhoneValueChange = (value: string) => {
    setPhoneValue(value);
  };

  const handleTypeValueChange = (e: SelectChangeEvent) => {
    setTypeValue(e.target.value as string);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setDisabled(true);

      const payload: UserModel = {
        type: typeValue,
        phone: phoneValue,
      };

      mutateAsync(payload).finally(() => setDisabled(false));
    },
    [typeValue, phoneValue]
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        유저 추가하기
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack>
              <InputLabel id="gubun">구분</InputLabel>
              <Select
                labelId="gubun"
                value={typeValue}
                label="구분"
                onChange={handleTypeValueChange}
                size="small"
              >
                <MenuItem value={"선배"}>선배</MenuItem>
                <MenuItem value={"후배"}>후배</MenuItem>
              </Select>
            </Stack>
            <Stack>
              <Typography variant="body1" component="div">
                전화번호
              </Typography>
              <PhoneNumberInput onChange={handlePhoneValueChange} />
            </Stack>
            <Button variant="outlined" type="submit" disabled={disabled}>추가하기</Button>
          </Stack>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserAddForm;
