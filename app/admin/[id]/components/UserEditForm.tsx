import { useCallback, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import type { UserDetail } from "@/libs/query/users.type";
import SearchBar from "@/components/SearchBar";
import BaseEditForm from "./BaseEditForm";

const UserEditForm = ({ list }: {
  list: UserDetail[];
}) => {
  
  const [phoneValue, setPhoneValue] = useState<string>('');
  const initialValue = useMemo(() => list.find((v) => v.phone === phoneValue) ?? null, [phoneValue]);

  const handleSearchChange = useCallback((value: string) => setPhoneValue(value), []);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        유저 정보 변경하기
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" className="ml-2">전화번호 검색</Typography>
        <SearchBar value={phoneValue} placeholder="전화번호를 정확히 입력해주세요. (-) 제외" onChange={handleSearchChange} />
        <Divider className="my-5" />
        {
          initialValue ? (
            <BaseEditForm initialValue={initialValue} onClear={() => setPhoneValue('')} />
          ) : (
            <div className="flex flex-row items-center space-x-2 my-12">
              <ErrorOutlineIcon color="info" />
              <Typography variant="h6" color="GrayText">찾으려는 유저가 존재하지 않습니다.</Typography>
            </div>
          )
        }
      </AccordionDetails>
    </Accordion>
  );
}

export default UserEditForm;
