
export default async function list (repositories, query) {
  return await repositories
    .patient
    .findAll(query);
}
