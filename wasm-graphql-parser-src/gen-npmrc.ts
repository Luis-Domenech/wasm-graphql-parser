import fs from 'node:fs'

const gen_npmrc = async () => {
  if (!process.env.NPM_TOKEN) {
    console.error("NPM_TOKEN is not set in environment")
    process.exit(1)
  }
  if (!process.env.NPM_USER) {
    console.error("NPM_USER is not set in environment")
    process.exit(1)
  }
  if (!process.env.NPM_EMAIL) {
    console.error("NPM_EMAIL is not set in environment")
    process.exit(1)
  }
  // Create fodler if it doesn't exist
  fs.mkdirSync("./pkg", { recursive: true })

  let file_content = [
    `@${process.env.NPM_USER}:registry=https://registry.npmjs.org/`,
    `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`,
    `email=${process.env.NPM_EMAIL}`,
    `always-auth=true`,
    // `registry = https://registry.npmjs.org/`,
  ].join("\n")

  try {
    fs.writeFileSync("./pkg/.npmrc", file_content)
  }
  catch(e) {
    console.error(e)
    process.exit(1)
  }
}

gen_npmrc()
.then()
.catch(e => console.log(e))
