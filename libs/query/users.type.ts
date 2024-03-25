export type PreferCategory = {
  sameUniv?: boolean;
  diffUniv?: boolean;
  sameMajor?: boolean;
  diffMajor?: boolean;
}

export type UserRegister = {
  type: string;
  phone: string;
  studentNum: string;
  major: string;
  univ: string;
} & PreferCategory;

export type UserMore = {
  instagram?: string;
  partnerPhone?: string;
  isOk?: boolean;
  gender?: string;
  address?: string;
}

export type UserDetail = UserRegister & UserMore & {
  id: string;
};
