module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  "overrides": [
    {
      "files": ["src/**/*.slice.ts", "src/**/*.axios.ts"],
      "rules": { "no-param-reassign": ["error", { "props": false }] }
    },

    {
      "files": ["*.ts",],
      "rules": {
        "simple-import-sort/imports": [
          "error",
          {
            "groups": [
              ["@grpc/proto-loader"],
              ["@nestjs/common"],
              ["@nestjs/jwt"],
              ["@nestjs/jwt"],
              ["passport-jwt"],
              ["@nestjs/microservices", "@nestjs/passport", "@nestjs/platform-express"],
              ["bcryptjs"],
              ["^path"],
              ["^\\.\\.(?!/?$)"],
              ["^\\."],
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
            ]
          }
        ]
      }
    }
  ]
};
