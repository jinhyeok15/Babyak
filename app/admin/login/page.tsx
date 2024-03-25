'use client';

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Paper, TextField, Typography } from "@mui/material";
import { Button } from "@/components/BaseButton";
import { ROUTES } from "@/constants/routes";

const Page = () => {
  const router = useRouter();
  const [codeValue, setCodeValue] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCodeValue(value);
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    router.push(ROUTES.ADMIN_DETAIL(codeValue))
  }, [codeValue]);

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <Paper component="form" className="py-10" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mx-8 space-y-16">
          <Typography variant="h4" component="h1">본인인증</Typography>
          <div className="flex flex-col space-y-8">
            <Typography variant="h6" component="div">
              코드를 입력해주세요
            </Typography>
            <TextField value={codeValue} onChange={handleChange} size="small" />
            <Button variant="outlined" type="submit" disabled={disabled}>
              확인
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Page;
