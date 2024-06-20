export function isMigrationFinished() {
  return process.env.NEXT_PUBLIC_IS_FINISHED_MIGRATION === "true";
}

export function isMigrationTrickle() {
  return process.env.NEXT_PUBLIC_IS_TRICKLE === "true";
}
