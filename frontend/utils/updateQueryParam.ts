function updateQueryParam(
  key: string,
  value: string,
  searchParams: URLSearchParams,
  router: any,
) {
  const params = new URLSearchParams(searchParams.toString());

  params.set(key, value);

  router.replace(`?${params.toString()}`, { scroll: false });
}

export default updateQueryParam;
