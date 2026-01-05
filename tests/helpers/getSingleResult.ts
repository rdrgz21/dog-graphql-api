export const getSingleResult = <T>(result: any): { data: T; errors?: any } => {
  if ("singleResult" in result.body) {
    return result.body.singleResult;
  }
  throw new Error("Expected singleResult but did not receive it");
};
