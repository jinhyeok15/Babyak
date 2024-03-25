'use client';

import { useMemo } from "react";
import type { UserModel } from "@/libs/query/users.query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: 'id', headerName: '순번' },
  { field: 'type', headerName: '구분' },
  { field: 'phone', headerName: '전화번호', width: 150 },
  { field: 'univ', headerName: '대학' },
  { field: 'major', headerName: '학과' },
  { field: 'sameUniv', headerName: '같은학교' },
  { field: 'sameMajor', headerName: '같은학과' },
  { field: 'diffUniv', headerName: '다른학교' },
  { field: 'diffMajor', headerName: '다른학과' },
  { field: 'partnerPhone', headerName: '매칭상대' },
  { field: 'isOk', headerName: '수락여부' },
]

const UsersTable = ({ list }: { list: UserModel[] | undefined }) => {
  const rows = useMemo(
    () =>
      list?.map((item, idx) => ({
        id: idx + 1,
        type: item.type,
        phone: item.phone,
        univ: item.univ,
        major: item.major,
        partnerPhone: item.partnerPhone ?? '없음',
        sameUniv: item.sameUniv ? 'Y' : 'N',
        sameMajor: item.sameMajor ? 'Y' : 'N',
        diffUniv: item.diffUniv ? 'Y' : 'N',
        diffMajor: item.diffMajor ? 'Y' : 'N',
        isOk: item.isOk ? 'O' : 'X',
      })) ?? [],
    [list]
  );

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 30 },
        },
      }}
      pageSizeOptions={[30, 50, 100]}
    />
  );
};

export default UsersTable;
