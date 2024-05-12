# For local testing, as I need to set AWS secrets as environment variables for the test to work, yet in production that should be
# handled by the IAM roles associated with the ECS service tasks.
FROM --platform=linux/amd64 oven/bun

COPY app/package.json .
COPY app/bun.lockb .

RUN bun install --production

COPY app/src src
# COPY app/db db
COPY app/tsconfig.json .
COPY app/assets/style.css assets/style.css
# COPY /../../.aws/credentials ~/.aws/credentials

# ENV NODE_ENV production
CMD ["bun", "src/index.tsx"]

EXPOSE 3000