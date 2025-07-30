import React from "react";

export const createPaginatedResponse = <T>(
  data: T[],
  page = 1,
  limit = 10
) => ({
  count: data.length,
  next: page * limit < data.length ? `?page=${page + 1}` : null,
  previous: page > 1 ? `?page=${page - 1}` : null,
  results: data.slice((page - 1) * limit, page * limit),
}) as {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export const createTestWrapper =
  (AllTheProviders: React.ComponentType<{ children: React.ReactNode }>) =>
  ({ children }: { children: React.ReactNode }) =>
    React.createElement(AllTheProviders, { children });
