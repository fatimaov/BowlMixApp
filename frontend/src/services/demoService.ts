/**
 * Backend-facing public demo functions.
 *
 * Public demo generation is anonymous, does not accept request options, and
 * returns three bowls generated from the backend's default ingredient pool.
 */

type Bowl = Record<string, unknown>;

export async function generateDemoBowls(): Promise<Bowl[]> {
  throw new Error("Demo service generateDemoBowls is not implemented yet.");
}
