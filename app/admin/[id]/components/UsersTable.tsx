'use client';

import type { UserModel } from "@/libs/query/users.query";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMemo } from "react";

const UsersTable = ({ list }: { list: UserModel[] | undefined }) => {
  const rows = useMemo(
    () =>
      list?.map((item) => {
        let isMatched = false;
        const { isOk, partnerPhone } = item;
        if (isOk && partnerPhone && typeof item.isMatched === "undefined") {
          const partner = list.find((v) => v.partnerPhone === item.phone);
          isMatched = !!partner;
        }

        return {
          ...item,
          isMatched,
        };
      }) ?? [],
    [list]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableCell>구분</TableCell>
          <TableCell align="right">전화번호</TableCell>
          <TableCell align="right">매칭상대</TableCell>
          <TableCell align="right">승낙여부</TableCell>
          <TableCell align="right">매칭성사여부</TableCell>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.phone}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.partnerPhone}</TableCell>
              <TableCell align="right">{row.isOk ? "O" : "X"}</TableCell>
              <TableCell align="right">{row.isMatched ? "O" : "X"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
