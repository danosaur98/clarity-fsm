import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";
describe("turnstile contract test suite", () => {
  let turnstileClient: Client;
  let provider: Provider;
  before(async () => {
    provider = await ProviderRegistry.createProvider();
    turnstileClient = new Client("SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.turnstile", "turnstile", provider);
  });
  it("should have a valid syntax", async () => {
    await turnstileClient.checkContract();
  });
  describe("deploying an instance of the contract", () => {
    const getState = async () => {
      const query = turnstileClient.createQuery({
        method: { name: "get-state", args: [] }
      });
      const receipt = await turnstileClient.submitQuery(query);
      const result = Result.unwrapInt(receipt);
      return result;
    }
    const execMethod = async (method: string) => {
      const tx = turnstileClient.createTransaction({
        method: {
          name: method,
          args: [],
        },
      });
      await tx.sign("SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7");
      const receipt = await turnstileClient.submitTransaction(tx);
      return receipt;
    }
    before(async () => {
      await turnstileClient.deployContract();
    });
    it("should start at locked", async () => {
      const counter = await getState();
      assert.equal(counter, 0);
    })
    it("push while locked should have no effect", async () => {
      await execMethod("push");
      assert.equal(await getState(), 0);
      await execMethod("push");
      assert.equal(await getState(), 0);
    })
    it("coin while locked should change state to unlocked", async () => {
      assert.equal(await getState(), 0);
      await execMethod("coin");
      assert.equal(await getState(), 1);
    })
    it("coin while unlocked should have no effect", async () => {
      await execMethod("coin");
      assert.equal(await getState(), 1);
      await execMethod("coin");
      assert.equal(await getState(), 1);
    })
    it("push while unlocked should change state to locked", async () => {
      assert.equal(await getState(), 1);
      await execMethod("push");
      assert.equal(await getState(), 0);
    })
  });
  after(async () => {
    await provider.close();
  });
});
