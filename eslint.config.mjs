import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
), {
    plugins: {
        "@typescript-eslint": typescriptEslint
    },
    ignores: [
        "**/test/*.js"
    ],
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json"
        }
    },

    rules: {
        "@/comma-dangle": "error",

        "@/comma-spacing": ["warn", {
            before: false,
            after: true
        }],
        "@/no-empty-function": "off",
        "@/indent": "warn",
        "@/no-unsafe-assignment": "off",
        "@/restrict-template-expressions": "off",
        "@/no-unused-vars": "error",
        "@/unbound-method": "off",
        "@/semi": "error",
        "@/no-unsafe-assigment": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "no-empty-function": "off",
        "comma-style": "error",
        quotes: ["warn", "double"],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-module-boundary-types": "error"
    }
}];
