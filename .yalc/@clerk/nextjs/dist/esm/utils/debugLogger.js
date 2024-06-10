import nextPkg from "next/package.json";
import { logFormatter } from "./logFormatter";
const createDebugLogger = (name, formatter) => () => {
  const entries = [];
  let isEnabled = false;
  return {
    enable: () => {
      isEnabled = true;
    },
    debug: (...args) => {
      if (isEnabled) {
        entries.push(args.map((arg) => typeof arg === "function" ? arg() : arg));
      }
    },
    commit: () => {
      if (isEnabled) {
        console.log(debugLogHeader(name));
        for (const log of entries) {
          let output = formatter(log);
          output = output.split("\n").map((l) => `  ${l}`).join("\n");
          if (process.env.VERCEL) {
            output = truncate(output, 4096);
          }
          console.log(output);
        }
        console.log(debugLogFooter(name));
      }
    }
  };
};
const withLogger = (loggerFactoryOrName, handlerCtor) => {
  return (...args) => {
    const factory = typeof loggerFactoryOrName === "string" ? createDebugLogger(loggerFactoryOrName, logFormatter) : loggerFactoryOrName;
    const logger = factory();
    const handler = handlerCtor(logger);
    try {
      const res = handler(...args);
      if (typeof res === "object" && "then" in res && typeof res.then === "function") {
        return res.then((val) => {
          logger.commit();
          return val;
        }).catch((err) => {
          logger.commit();
          throw err;
        });
      }
      logger.commit();
      return res;
    } catch (err) {
      logger.commit();
      throw err;
    }
  };
};
function debugLogHeader(name) {
  return `[clerk debug start: ${name}]`;
}
function debugLogFooter(name) {
  return `[clerk debug end: ${name}] (@clerk/nextjs=${"5.1.4"},next=${nextPkg.version})`;
}
function truncate(str, maxLength) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");
  const encodedString = encoder.encode(str);
  const truncatedString = encodedString.slice(0, maxLength);
  return decoder.decode(truncatedString).replace(/\uFFFD/g, "");
}
export {
  createDebugLogger,
  withLogger
};
//# sourceMappingURL=debugLogger.js.map