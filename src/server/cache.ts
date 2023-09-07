import express from "express";
import mcache from "memory-cache";
import { CacheHitHeaderKey } from "../constans";

const twoMinsInSeconds = 120;

export const cache = (duration: number = twoMinsInSeconds) => {
  return (req: express.Request, res: any, next: express.NextFunction) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cacheHitCountKey = `${key}-cache-hit-count`;
    let cachedBody = mcache.get(key);
    let cacheHitCount = mcache.get(cacheHitCountKey) ?? 0;

    if (cachedBody) {
      res.set(CacheHitHeaderKey, cacheHitCount);
      mcache.put(cacheHitCountKey, cacheHitCount + 1, duration * 1000);
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body: any) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};
