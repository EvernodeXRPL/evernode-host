declare global {
    namespace NodeJS {
      interface ProcessEnv {
        AWS_REGION: string;
        AWS_ACCESS_KEY: string;
        AWS_SECRET_KEY: string;
        AWS_IAM_ROLE: string;
      }
    }
  }
  export {}

  