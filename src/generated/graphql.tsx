export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Award = {
  __typename?: 'Award';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  grantedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AwardInput = {
  description?: InputMaybe<Scalars['String']>;
  grantedAt: Scalars['DateTime'];
  id?: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteAwardById: Award;
  login: User;
  logout: Scalars['Boolean'];
  refreshToken: User;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  /** Create or update a single award record. */
  upsertAward: Award;
  /** Create or update a single user record. */
  upsertUser: User;
};


export type MutationDeleteAwardByIdArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpsertAwardArgs = {
  data: AwardInput;
};


export type MutationUpsertUserArgs = {
  data: UserInput;
};

export type Query = {
  __typename?: 'Query';
  awardById: Award;
  awards: Array<Award>;
  healthLocal?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
  users: Array<User>;
};


export type QueryAwardByIdArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  mobile?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  role: UserRole;
  tokenVersion?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  lastname: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

/** User role */
export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}
