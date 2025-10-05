/* ---------- Error class ---------- */

import { safeStringify } from "./cosmos-utils";

export class CosmosError extends Error {
  status?: number;
  payload?: unknown;
  constructor(message: string, status?: number, payload?: unknown) {
    super(message);
    this.name = "CosmosError";
    this.status = status;
    this.payload = payload;
    Object.setPrototypeOf(this, new.target.prototype);
  }
  toString() {
    const payloadPart =
      this.payload === undefined
        ? ""
        : typeof this.payload === "string"
        ? ` payload=${this.payload}`
        : ` payload=${safeStringify(this.payload)}`;
    return `${this.name}: ${this.message}${
      this.status ? ` (status=${this.status})` : ""
    }${payloadPart}`;
  }
}
