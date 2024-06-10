/**
 * Creates an "awaitable" navigation function that will do its best effort to wait for Next.js to finish its route transition.
 * This is accomplished by wrapping the call to `router.replace` in `startTransition()`, which should rely on React to coordinate the pending state. We key off of
 * `isPending` to flush the stored promises and ensure the navigates "resolve".
 */
export declare const useAwaitableReplace: () => (to: string) => unknown;
//# sourceMappingURL=useAwaitableReplace.d.ts.map