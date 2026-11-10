import assert from "node:assert/strict";
import test from "node:test";
import { prepareFunctionMovement } from "@red-cup-engineering/function-movement-material";

const request = {
  sourceSemioverse: "urn:semioverse:source",
  sourcePackage: "source-package",
  sourceFile: "src/source.mjs",
  targetSemioverse: "urn:semioverse:target",
  targetPackage: "target-package",
  targetFile: "src/target.mjs",
  functionName: "moveMe",
  functionSource: "export function moveMe() { return 1; }",
  targetMarker: "export const target = true;",
};

test("FUNCTION-MOVEMENT-QUICKSTART", () => {
  const result = prepareFunctionMovement(request);
  assert.equal(result.artifacts.length, 2);
  assert.match(result.artifacts[0].content, /<<<<<<< SEARCH/);
  assert.match(result.artifacts[1].content, /moveMe/);
  assert.equal(result.nextActuator, "accepted-software-delivery-receiver");
  assert.equal(result.writeAuthority, "receiver-only");
  assert.match(result.artifactSetDigest, /^sha256:[0-9a-f]{64}$/);
});
