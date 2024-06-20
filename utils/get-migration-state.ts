export default function getMigrationState() {
  const isTrickle = process.env.NEXT_PUBLIC_IS_TRICKLE === "true";
  const isFinishedMigration =
    process.env.NEXT_PUBLIC_IS_FINISHED_MIGRATION === "true";

  if (isTrickle) {
    return "trickle";
  }
  if (isFinishedMigration) {
    return "finished";
  }
  return "not-started";
}
