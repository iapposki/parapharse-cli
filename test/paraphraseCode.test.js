import { assert } from 'chai';
import {paraphraseCode} from '../bin/index.js'

describe('paraphraseCode', () => {
    it('should return with an error, prompt not provided', async () => {
        const res = await paraphraseCode("", "creative");
        assert.equal(res, "Error-001: Valid prompt not provided.")
    })
    it("should reutrn with an error, type not valid", async () => {
        const res = await paraphraseCode("sample sentence", "")
        assert.equal(res, "Error-002: Valid type not provided. Valid types are : (1) urgent (2) professional (3) creative")
    })
    it("should return success.", async () => {
        const res = await paraphraseCode("This is a sample sentence.", "creative")
        assert.equal(res.slice(0, 18), "Paraphrased text :")
    })
})