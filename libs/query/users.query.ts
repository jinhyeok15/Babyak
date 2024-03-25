"use client";

import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/libs/firebase";
import type { UserRegister, UserDetail } from "@/libs/query/users.type";

export const USERS_KEY = "user";

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
      let data: UserDetail[] = [];
      querySnapshot.forEach((doc) => {
        const payload = {
          ...doc.data(),
          id: doc.id,
        };
        validateUserModel(payload);
        data.push(payload as UserDetail);
      });

      return data;
    },
    staleTime: Infinity,
  });

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UserRegister) => {
      const docRef = await addDoc(collection(db, USERS_KEY), payload);
      return { id: docRef.id, ...payload };
    },
    onSuccess: (payload) => {
      const oldData = queryClient.getQueryData<UserDetail[]>([USERS_KEY])!;
      queryClient.setQueryData([USERS_KEY], [payload, ...oldData]);
    },
  });
};

export const useSetUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UserDetail) => {
      const docRef = doc(db, USERS_KEY, payload.id);
      await setDoc(docRef, payload);

      return payload;
    },
    onSuccess: (payload) => {
      const oldData = queryClient.getQueryData<UserDetail[]>([USERS_KEY])!;
      queryClient.setQueryData([USERS_KEY], oldData.map((v) => v.id !== payload.id ? v : {...payload}));
    }
  });
}
