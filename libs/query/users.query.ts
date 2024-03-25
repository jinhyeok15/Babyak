"use client";

import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USERS_KEY = "user";

export type PreferCategory = {
  sameUniv?: boolean;
  diffUniv?: boolean;
  sameMajor?: boolean;
  diffMajor?: boolean;
}

export type UserModel = {
  id?: string;
  type: string;
  phone: string;
  partnerPhone?: string;
  studentNum: string;
  major: string;
  univ: string;
  isOk?: Readonly<boolean>;
  isMatched?: boolean;
} & PreferCategory;

const validateUserModel = (data: unknown) => {
  if (typeof data !== "object" || data === null) {
    throw new Error("데이터 형식이 object가 아닙니다.");
  }

  const keys = ["type", "phone"];

  keys.forEach((key) => {
    if (!(key in data)) {
      throw new Error(`데이터에 해당하는 키가 존재하지 않습니다: ${key}`);
    }
  });
};

export const useGetUsersQuery = () =>
  useQuery({
    queryKey: [USERS_KEY],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, USERS_KEY));
      let data: UserModel[] = [];
      querySnapshot.forEach((doc) => {
        const payload = doc.data();
        validateUserModel(payload);
        data.push(payload as UserModel);
      });

      return data;
    },
    staleTime: Infinity,
  });

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UserModel) => {
      const docRef = await addDoc(collection(db, USERS_KEY), payload);
      return { id: docRef.id, ...payload };
    },
    onSuccess: (payload) => {
      const oldData = queryClient.getQueryData<UserModel[]>([USERS_KEY])!;
      queryClient.setQueryData([USERS_KEY], [payload, ...oldData]);
    },
  });
};
