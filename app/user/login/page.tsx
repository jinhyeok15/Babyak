'use client';

import { useState } from "react";
import { Paper, Typography } from "@mui/material";
import PhoneNumberInput from "@/components/PhoneNumberInput";

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleChange = (value: string) => setPhoneNumber(value);

  return (
    <div className="h-screen flex flex-col justify-center">
      <Paper className="py-32">
        <div className="flex flex-col items-center mx-8 space-y-16">
          <Typography variant="h4" component="h1">본인인증</Typography>
          <div className="flex flex-col space-y-8">
            <Typography variant="h6" component="div">
              안녕하세요! 본인 확인을 위해 <p>전화번호 입력해주세요.</p>
            </Typography>
            <PhoneNumberInput onChange={handleChange} />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Page;
