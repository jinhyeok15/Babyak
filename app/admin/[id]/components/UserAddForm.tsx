"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  SelectChangeEvent,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { Button } from "@/components/BaseButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAddUserMutation } from "@/libs/query/users.query";
import type { UserRegister } from "@/libs/query/users.type";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { NOT_BLANK_WORD_REGEX, PHONE_NUMBER_REGEX } from "@/libs/utils/regex";

const DEFAULT_FORM_VALUE: UserRegister = {
  type: '선배',
  phone: '',
  univ: '',
  major: '',
  studentNum: '',
  sameUniv: false,
  sameMajor: false,
  diffUniv: false,
  diffMajor: false,
};

const UserAddForm = () => {
  const { mutateAsync } = useAddUserMutation();

  const [formValue, setFormValue] = useState<UserRegister>(DEFAULT_FORM_VALUE);

  const [disabled, setDisabled] = useState<boolean>(true);

  const handlePhoneValueChange = useCallback((value: string) => {
    setFormValue({
      ...formValue,
      phone: value,
    })
  }, [formValue]);

  const handleTypeValueChange = useCallback((e: SelectChangeEvent) => {
    setFormValue({
      ...formValue,
      type: e.target.value as string,
    });
  }, [formValue]);

  const handleUnivChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      univ: e.target.value,
    })
  }, [formValue]);

  const handleMajorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      major: e.target.value,
    });
  }, [formValue])

  const handleStuNumChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      return;
    }
    setFormValue({
      ...formValue,
      studentNum: e.target.value,
    })
  }, [formValue]);

  const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.checked,
    })
  }, [formValue]);

  useEffect(() => {
    let isValid = true;

    if (!PHONE_NUMBER_REGEX.test(formValue.phone)) isValid = false;
    if (!NOT_BLANK_WORD_REGEX.test(formValue.univ)) isValid = false;
    if (!NOT_BLANK_WORD_REGEX.test(formValue.major)) isValid = false;
    if (!formValue.studentNum) isValid = false;

    isValid ? setDisabled(false) : setDisabled(true);
  }, [
    formValue
  ]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const payload: UserRegister = {...formValue};

      setDisabled(true);
      mutateAsync(payload).finally(() => {
        setDisabled(false);
        setFormValue(DEFAULT_FORM_VALUE);
      });
    },
    [formValue]
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
                value={formValue.type}
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
            <Stack direction="row" spacing={2}>
              <TextField label="대학" variant="outlined" value={formValue.univ} onChange={handleUnivChange} />
              <TextField label="학과" variant="outlined" value={formValue.major} onChange={handleMajorChange} />
              <TextField label="학번" variant="outlined" value={formValue.studentNum} onChange={handleStuNumChange} />
            </Stack>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">선호유형</FormLabel>
              <FormGroup row={true}>
                <FormControlLabel
                  control={
                    <Checkbox checked={formValue.sameUniv} onChange={handleCheckboxChange} name="sameUniv" />
                  }
                  label="같은학교"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={formValue.sameMajor} onChange={handleCheckboxChange} name="sameMajor" />
                  }
                  label="같은학과"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={formValue.diffUniv} onChange={handleCheckboxChange} name="diffUniv" />
                  }
                  label="다른학교"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={formValue.diffMajor} onChange={handleCheckboxChange} name="diffMajor" />
                  }
                  label="다른학과"
                />
              </FormGroup>
            </FormControl>
            <Button variant="contained" type="submit" disabled={disabled}>추가하기</Button>
          </Stack>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserAddForm;
