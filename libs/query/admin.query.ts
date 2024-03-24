"use client";

import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ADMIN_KEY = 'admin';

export type AdminModel = {
  isAdmin: boolean;
}

const DEFAULT_ADMIN: AdminModel = {
  isAdmin: false,
}

const validateAdminModel = (data: unknown) => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('데이터 형식이 object가 아닙니다.');
  }

  const keys = [
    'userId',
    'isAdmin'
  ];

  keys.forEach((key) => {
    if (!(key in data)) {
      throw new Error(`데이터에 해당하는 키가 존재하지 않습니다: ${key}`);
    }
  });
}

export const useGetAdminQuery = (authCode: string | null) => useQuery({
  queryKey: [ADMIN_KEY, authCode],
  queryFn: async () => {
    if (!authCode) return null;

    const docRef = doc(db, ADMIN_KEY, authCode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      validateAdminModel(data);
      return data as AdminModel;
    }

    return null;
  },
  staleTime: Infinity,
});

export const useAddAuthMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const docRef = await addDoc(collection(db, ADMIN_KEY), DEFAULT_ADMIN);
      return docRef.id;
    },
    onSuccess: (id) => {
      console.log(id);
      queryClient.invalidateQueries({
        queryKey: [ADMIN_KEY, id],
      });
    }
  });
}
