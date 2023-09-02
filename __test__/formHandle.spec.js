import { handleSubmit } from "../src/client/js/formHandler.js";

describe('Testing handleSubmit() function existence', () => {
    test('handleSubmit() function should be defined', () => {
        expect(handleSubmit).toBeDefined();
    });
});